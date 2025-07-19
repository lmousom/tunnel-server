const WebSocket = require('ws');
const http = require('http');
const logger = require('../utils/logger');
const config = require('../config');

class TunnelClient {
  constructor (options = {}) {
    this.clientId = options.clientId || 'default-client';
    this.serverUrl = options.serverUrl || process.env.SERVER_URL || 'ws://localhost:8080';
    this.localPort = options.localPort || parseInt(process.env.LOCAL_PORT) || 3000;
    this.localHost = options.localHost || process.env.LOCAL_HOST || 'localhost';
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 10;
    
    this.ws = null;
    this.reconnectAttempts = 0;
    this.isConnected = false;
    this.pendingRequests = new Map();
  }

  connect () {
    try {
      logger.info('Connecting to tunnel server', {
        serverUrl: this.serverUrl,
        clientId: this.clientId,
      });

      this.ws = new WebSocket(this.serverUrl);

      this.ws.on('open', () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        logger.info('Connected to tunnel server', { clientId: this.clientId });
        
        // Register with the server
        this.register();
      });

      this.ws.on('message', (msg) => {
        this.handleMessage(msg);
      });

      this.ws.on('close', (code, reason) => {
        this.isConnected = false;
        logger.warn('Disconnected from tunnel server', {
          clientId: this.clientId,
          code,
          reason: reason.toString(),
        });
        
        this.handleReconnect();
      });

      this.ws.on('error', (err) => {
        logger.error('WebSocket error', {
          clientId: this.clientId,
          error: err.message,
        });
      });

      // Heartbeat to keep connection alive
      this.ws.on('pong', () => {
        this.ws.isAlive = true;
      });

    } catch (err) {
      logger.error('Failed to create WebSocket connection', {
        clientId: this.clientId,
        error: err.message,
      });
      this.handleReconnect();
    }
  }

  register () {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const registerMessage = {
        type: 'register',
        clientId: this.clientId,
      };
      
      this.ws.send(JSON.stringify(registerMessage));
      logger.debug('Registration message sent', { clientId: this.clientId });
    }
  }

  handleMessage (msg) {
    try {
      const data = JSON.parse(msg);
      
      if (data.type === 'registered') {
        logger.info('Successfully registered with tunnel server', {
          clientId: this.clientId,
          message: data.message,
        });
      } else if (data.type === 'request') {
        this.handleRequest(data);
      } else {
        logger.warn('Unknown message type', { type: data.type });
      }
    } catch (err) {
      logger.error('Failed to parse message', {
        clientId: this.clientId,
        error: err.message,
        message: msg.toString(),
      });
    }
  }

  async handleRequest (data) {
    const { reqId, method, path, headers, body } = data;
    
    logger.debug('Handling request', {
      clientId: this.clientId,
      reqId,
      method,
      path,
    });

    const options = {
      hostname: this.localHost,
      port: this.localPort,
      path,
      method,
      headers: this.sanitizeHeaders(headers),
      timeout: config.requestTimeout,
    };

    const req = http.request(options, (res) => {
      let responseBody = '';
      
      res.on('data', chunk => {
        responseBody += chunk;
      });
      
      res.on('end', () => {
        const response = {
          type: 'response',
          reqId,
          status: res.statusCode,
          headers: res.headers,
          body: responseBody,
        };

        this.sendResponse(response);
        
        logger.debug('Request completed', {
          clientId: this.clientId,
          reqId,
          status: res.statusCode,
        });
      });
    });

    req.on('error', (err) => {
      logger.error('Local request error', {
        clientId: this.clientId,
        reqId,
        error: err.message,
      });

      const errorResponse = {
        type: 'response',
        reqId,
        status: 502,
        headers: { 'content-type': 'text/plain' },
        body: `Tunnel error: ${err.message}`,
      };

      this.sendResponse(errorResponse);
    });

    req.on('timeout', () => {
      logger.warn('Local request timeout', {
        clientId: this.clientId,
        reqId,
      });

      req.destroy();
      
      const timeoutResponse = {
        type: 'response',
        reqId,
        status: 504,
        headers: { 'content-type': 'text/plain' },
        body: 'Gateway Timeout',
      };

      this.sendResponse(timeoutResponse);
    });

    if (body) {
      req.write(body);
    }
    
    req.end();
  }

  sendResponse (response) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(response));
      } catch (err) {
        logger.error('Failed to send response', {
          clientId: this.clientId,
          reqId: response.reqId,
          error: err.message,
        });
      }
    } else {
      logger.warn('Cannot send response - WebSocket not connected', {
        clientId: this.clientId,
        reqId: response.reqId,
      });
    }
  }

  sanitizeHeaders (headers) {
    const sanitized = {};
    const allowedHeaders = [
      'content-type', 'content-length', 'accept', 'user-agent',
      'authorization', 'cache-control', 'pragma', 'expires',
      'host', 'connection', 'upgrade', 'sec-websocket-key',
    ];
    
    for (const [key, value] of Object.entries(headers)) {
      const lowerKey = key.toLowerCase();
      if (allowedHeaders.includes(lowerKey)) {
        sanitized[lowerKey] = value;
      }
    }
    
    return sanitized;
  }

  handleReconnect () {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      logger.error('Max reconnection attempts reached', {
        clientId: this.clientId,
        attempts: this.reconnectAttempts,
      });
      process.exit(1);
    }

    this.reconnectAttempts++;
    logger.info('Attempting to reconnect', {
      clientId: this.clientId,
      attempt: this.reconnectAttempts,
      delay: this.reconnectInterval,
    });

    setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  }

  disconnect () {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Start the client if this file is run directly
if (require.main === module) {
  const client = new TunnelClient({
    clientId: process.env.CLIENT_ID || 'mousom',
    serverUrl: process.env.SERVER_URL || 'ws://localhost:8080',
    localPort: parseInt(process.env.LOCAL_PORT) || 3000,
    localHost: process.env.LOCAL_HOST || 'localhost',
  });

  client.connect();

  // Graceful shutdown
  process.on('SIGINT', () => {
    logger.info('Shutting down tunnel client');
    client.disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    logger.info('Shutting down tunnel client');
    client.disconnect();
    process.exit(0);
  });
}

module.exports = TunnelClient;
