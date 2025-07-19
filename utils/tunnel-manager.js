const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');
const { validateClientId, sanitizeHeaders } = require('./security');
const config = require('../config');

class TunnelManager {
  constructor () {
    this.clients = new Map();
    this.pendingRequests = new Map();
    this.connectionCount = 0;
  }

  // Register a new client
  registerClient (clientId, ws, req) {
    if (!validateClientId(clientId)) {
      logger.warn('Invalid client ID format', { clientId, ip: req.socket.remoteAddress });
      return false;
    }

    if (this.clients.has(clientId)) {
      logger.warn('Client ID already registered', { clientId });
      return false;
    }

    if (this.connectionCount >= config.maxConnections) {
      logger.warn('Maximum connections reached', { 
        current: this.connectionCount, 
        max: config.maxConnections, 
      });
      return false;
    }

    this.clients.set(clientId, {
      ws,
      clientId,
      connectedAt: new Date(),
      lastActivity: new Date(),
      requestCount: 0,
    });

    this.connectionCount++;
    
    // Set up message listener for this client
    ws.on('message', (msg) => {
      try {
        const data = JSON.parse(msg);
        if (data.type === 'response') {
          this.handleResponse(data.reqId, data);
        }
      } catch (err) {
        logger.error('Error parsing client message', { clientId, error: err.message });
      }
    });
    
    logger.info('Client registered successfully', { 
      clientId, 
      ip: req.socket.remoteAddress,
      totalConnections: this.connectionCount, 
    });

    return true;
  }

  // Unregister a client
  unregisterClient (clientId) {
    const client = this.clients.get(clientId);
    if (client) {
      this.clients.delete(clientId);
      this.connectionCount--;
      
      // Clean up any pending requests for this client
      for (const [reqId, request] of this.pendingRequests.entries()) {
        if (request.clientId === clientId) {
          this.pendingRequests.delete(reqId);
        }
      }

      logger.info('Client unregistered', { 
        clientId, 
        totalConnections: this.connectionCount, 
      });
    }
  }

  // Get client by ID
  getClient (clientId) {
    return this.clients.get(clientId);
  }

  /**
   * Robust client ID extraction from tunnel path
   * @param {string} pathname - URL pathname
   * @returns {string|null} Client ID or null if invalid
   */
  extractClientId(pathname) {
    if (!pathname || typeof pathname !== 'string') {
      return null;
    }

    // Normalize the path (remove multiple slashes, handle trailing slashes)
    const normalizedPath = pathname.replace(/\/+/g, '/').replace(/\/$/, '');
    
    // Split by slashes and filter out empty parts
    const pathParts = normalizedPath.split('/').filter(part => part.length > 0);
    
    // Return first part as client ID, or null if no parts
    return pathParts.length > 0 ? pathParts[0] : null;
  }

  // Handle incoming HTTP request
  async handleRequest (req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const clientId = this.extractClientId(url.pathname);
    
    if (!clientId) {
      res.writeHead(400);
      res.end('Client ID required');
      return;
    }

    const client = this.getClient(clientId);
    if (!client) {
      res.writeHead(404);
      res.end('Tunnel client not connected');
      return;
    }

    // Update client activity
    client.lastActivity = new Date();
    client.requestCount++;

    const reqId = uuidv4();
    const timeout = setTimeout(() => {
      this.handleRequestTimeout(reqId, res);
    }, config.requestTimeout);

    // Store pending request
    this.pendingRequests.set(reqId, {
      clientId,
      res,
      timeout,
      startedAt: new Date(),
    });



    // Send request to client
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const requestData = {
        type: 'request',
        reqId,
        method: req.method,
        path: url.pathname + url.search,
        headers: sanitizeHeaders(req.headers),
        body,
      };

      client.ws.send(JSON.stringify(requestData));
      logger.debug('Request sent to client', { 
        reqId, 
        clientId, 
        method: req.method, 
        path: url.pathname, 
      });
    });

    req.on('error', (err) => {
      logger.error('Request error', { reqId, error: err.message });
      this.handleRequestError(reqId, err);
    });
  }

  // Handle response from client
  handleResponse (reqId, response) {
    const request = this.pendingRequests.get(reqId);
    if (!request) {
      logger.warn('Response for unknown request', { reqId });
      return;
    }

    // Clean up
    clearTimeout(request.timeout);
    this.pendingRequests.delete(reqId);

    const { res } = request;
    
    try {
      res.writeHead(response.status || 200, response.headers || {});
      res.end(response.body || '');
      
      logger.debug('Response sent', { 
        reqId, 
        status: response.status,
        clientId: request.clientId, 
      });
    } catch (err) {
      logger.error('Error sending response', { reqId, error: err.message });
    }
  }

  // Handle request timeout
  handleRequestTimeout (reqId, res) {
    const request = this.pendingRequests.get(reqId);
    if (request) {
      this.pendingRequests.delete(reqId);
      res.writeHead(504);
      res.end('Gateway Timeout');
      
      logger.warn('Request timeout', { 
        reqId, 
        clientId: request.clientId,
        duration: Date.now() - request.startedAt.getTime(), 
      });
    }
  }

  // Handle request error
  handleRequestError (reqId, error) {
    const request = this.pendingRequests.get(reqId);
    if (request) {
      clearTimeout(request.timeout);
      this.pendingRequests.delete(reqId);
      
      request.res.writeHead(502);
      request.res.end(`Tunnel error: ${error.message}`);
      
      logger.error('Request error', { 
        reqId, 
        clientId: request.clientId,
        error: error.message, 
      });
    }
  }

  // Get server statistics
  getStats () {
    return {
      totalConnections: this.connectionCount,
      activeClients: this.clients.size,
      pendingRequests: this.pendingRequests.size,
      clients: Array.from(this.clients.keys()),
    };
  }

  // Clean up inactive connections
  cleanupInactiveConnections () {
    const now = new Date();
    const inactiveThreshold = config.connectionTimeout;

    for (const [clientId, client] of this.clients.entries()) {
      const timeSinceActivity = now - client.lastActivity;
      if (timeSinceActivity > inactiveThreshold) {
        logger.info('Cleaning up inactive connection', { 
          clientId, 
          inactiveTime: timeSinceActivity, 
        });
        client.ws.close();
        this.unregisterClient(clientId);
      }
    }
  }
}

module.exports = TunnelManager; 
