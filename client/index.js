const WebSocket = require('ws');
const http = require('http');
const logger = require('../utils/logger');
const config = require('../config');
const ProtobufHandler = require('../utils/protobuf-handler');

// Create HTTP agent with connection pooling for better performance
const httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000, // Keep connections alive for 30 seconds
  maxSockets: 50, // Maximum number of sockets per host
  maxFreeSockets: 10, // Maximum number of idle sockets
  timeout: 60000, // Socket timeout
});

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
    this.protobufHandler = new ProtobufHandler();
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
      const message = this.protobufHandler.createRegisterMessage(this.clientId, {
        version: '1.0.0',
        platform: process.platform,
        nodeVersion: process.version
      });
      
      // Send message (protobuf returns buffer, JSON returns object)
      if (Buffer.isBuffer(message)) {
        this.ws.send(message, { binary: true });
      } else {
        const messageBuffer = Buffer.from(JSON.stringify(message));
        this.ws.send(messageBuffer, { binary: true });
      }
      
      logger.debug('Registration message sent', { 
        clientId: this.clientId,
        useProtobuf: this.protobufHandler.isProtobufAvailable(),
        messageSize: this.protobufHandler.getMessageSize(message)
      });
    }
  }

  handleMessage (msg) {
    try {
      // Parse message using protobuf handler
      const data = this.protobufHandler.parseMessage(msg);
      
      if (data.type === 'registered') {
        logger.info('Successfully registered with tunnel server', {
          clientId: this.clientId,
          message: data.message,
          success: data.success,
          serverInfo: data.serverInfo,
          useProtobuf: this.protobufHandler.isProtobufAvailable()
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
        useProtobuf: this.protobufHandler.isProtobufAvailable()
      });
    }
  }

  /**
   * Robust path handling that extracts the local path from tunnel requests
   * @param {string} tunnelPath - Full path from tunnel (e.g., "/mousom/api/users")
   * @param {string} clientId - The client ID to strip
   * @returns {string} Local path for the target server
   */
  extractLocalPath(tunnelPath, clientId) {
    // Handle edge cases
    if (!tunnelPath || typeof tunnelPath !== 'string') {
      return '/';
    }

    // Normalize the path (remove multiple slashes, handle trailing slashes)
    const normalizedPath = tunnelPath.replace(/\/+/g, '/').replace(/\/$/, '');
    
    // Split by slashes and filter out empty parts
    const pathParts = normalizedPath.split('/').filter(part => part.length > 0);
    
    // If no parts or first part doesn't match client ID, return root
    if (pathParts.length === 0 || pathParts[0] !== clientId) {
      return '/';
    }
    
    // Remove the client ID and reconstruct the path
    const localParts = pathParts.slice(1);
    
    // If no remaining parts, return root
    if (localParts.length === 0) {
      return '/';
    }
    
    // Reconstruct the local path with leading slash
    return '/' + localParts.join('/');
  }

  async handleRequest (data) {
    const { reqId, method, path, headers, body, bodyLength } = data;
    
    // Use robust path extraction
    const localPath = this.extractLocalPath(path, this.clientId);
    
    logger.debug('Handling request', {
      clientId: this.clientId,
      reqId,
      method,
      originalPath: path,
      localPath,
      bodySize: bodyLength || 0,
    });

    const options = {
      hostname: this.localHost,
      port: this.localPort,
      path: localPath,
      method,
      headers: this.sanitizeHeaders(headers),
      timeout: config.requestTimeout,
      agent: httpAgent, // Use connection pooling
    };

    const req = http.request(options, (res) => {
      const responseChunks = [];
      
      res.on('data', chunk => {
        responseChunks.push(chunk);
      });
      
      res.on('end', () => {
        const responseBody = responseChunks.length > 0 ? Buffer.concat(responseChunks) : Buffer.alloc(0);
        
        // Create response using protobuf handler
        const response = this.protobufHandler.createResponseMessage(
          reqId,
          res.statusCode,
          res.headers,
          responseBody
        );

        this.sendResponse(response);
        
        logger.debug('Request completed', {
          clientId: this.clientId,
          reqId,
          status: res.statusCode,
          responseSize: responseBody.length,
          useProtobuf: this.protobufHandler.isProtobufAvailable(),
          messageSize: this.protobufHandler.getMessageSize(response)
        });
      });
    });

    req.on('error', (err) => {
      logger.error('Local request error', {
        clientId: this.clientId,
        reqId,
        error: err.message,
      });

      const errorBody = Buffer.from(`Tunnel error: ${err.message}`);
      const errorResponse = this.protobufHandler.createResponseMessage(
        reqId,
        502,
        { 'content-type': 'text/plain' },
        errorBody
      );

      this.sendResponse(errorResponse);
    });

    req.on('timeout', () => {
      logger.warn('Local request timeout', {
        clientId: this.clientId,
        reqId,
      });

      req.destroy();
      
      const timeoutBody = Buffer.from('Gateway Timeout');
      const timeoutResponse = this.protobufHandler.createResponseMessage(
        reqId,
        504,
        { 'content-type': 'text/plain' },
        timeoutBody
      );

      this.sendResponse(timeoutResponse);
    });

    if (body) {
      // Handle body (protobuf returns buffer, JSON returns base64 string)
      const bodyBuffer = Buffer.isBuffer(body) ? body : Buffer.from(body, 'base64');
      req.write(bodyBuffer);
    }
    
    req.end();
  }

  sendResponse (response) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        // Send message (protobuf returns buffer, JSON returns object)
        if (Buffer.isBuffer(response)) {
          this.ws.send(response, { binary: true });
        } else {
          const messageBuffer = Buffer.from(JSON.stringify(response));
          this.ws.send(messageBuffer, { binary: true });
        }
        
        logger.debug('Response sent to server', { 
          reqId: response.reqId, 
          status: response.status,
          bodySize: response.bodyLength || 0,
          useProtobuf: this.protobufHandler.isProtobufAvailable(),
          messageSize: this.protobufHandler.getMessageSize(response)
        });
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
    
    // Clean up HTTP agent connections
    httpAgent.destroy();
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
