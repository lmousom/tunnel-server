const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');

// Import generated protobuf classes
let protobuf, root;

// Try to load generated protobuf classes
try {
  protobuf = require('protobufjs');
  root = require('../proto/tunnel_pb');
  logger.info('Protobuf classes loaded successfully');
} catch (error) {
  logger.warn('Protobuf classes not found, falling back to JSON mode', { error: error.message });
  protobuf = null;
  root = null;
}

class ProtobufHandler {
  constructor() {
    this.useProtobuf = protobuf !== null && root !== null;
    this.messageIdCounter = 0;
    
    if (this.useProtobuf) {
      logger.info('Protobuf mode enabled - using Protocol Buffers for message serialization');
    } else {
      logger.info('JSON mode enabled - using JSON for message serialization (fallback)');
    }
  }

  /**
   * Generate a unique message ID
   * @returns {string} Unique message ID
   */
  generateMessageId() {
    this.messageIdCounter = (this.messageIdCounter + 1) % Number.MAX_SAFE_INTEGER;
    return `${Date.now()}-${this.messageIdCounter}`;
  }

  /**
   * Convert HTTP headers object to protobuf Header array
   * @param {Object} headers - HTTP headers object
   * @returns {Array} Array of Header objects
   */
  headersToProtobuf(headers) {
    if (!this.useProtobuf) {
      return headers;
    }

    const headerArray = [];
    for (const [key, value] of Object.entries(headers)) {
      headerArray.push({
        key: key.toLowerCase(),
        value: value
      });
    }
    return headerArray;
  }

  /**
   * Convert protobuf Header array to HTTP headers object
   * @param {Array} headerArray - Array of Header objects
   * @returns {Object} HTTP headers object
   */
  headersFromProtobuf(headerArray) {
    if (!this.useProtobuf) {
      return headerArray;
    }

    const headers = {};
    headerArray.forEach(header => {
      headers[header.key] = header.value;
    });
    return headers;
  }

  /**
   * Create a register message
   * @param {string} clientId - Client identifier
   * @param {Object} metadata - Additional metadata
   * @returns {Buffer|Object} Serialized message
   */
  createRegisterMessage(clientId, metadata = {}) {
    const messageId = this.generateMessageId();
    const timestamp = Date.now();

    if (this.useProtobuf) {
      const message = {
        type: root.tunnel.MessageType.REGISTER,
        messageId: messageId,
        timestamp: timestamp,
        register: {
          clientId: clientId,
          version: '1.0.0',
          metadata: metadata
        }
      };
      
      const TunnelMessage = root.tunnel.TunnelMessage;
      const buffer = TunnelMessage.encode(message).finish();
      return buffer;
    } else {
      // JSON fallback
      return {
        type: 'register',
        messageId,
        timestamp,
        clientId,
        version: '1.0.0',
        metadata
      };
    }
  }

  /**
   * Create a registered confirmation message
   * @param {string} clientId - Client identifier
   * @param {string} message - Confirmation message
   * @param {boolean} success - Success status
   * @param {Object} serverInfo - Server information
   * @returns {Buffer|Object} Serialized message
   */
  createRegisteredMessage(clientId, message, success = true, serverInfo = {}) {
    const messageId = this.generateMessageId();
    const timestamp = Date.now();

    if (this.useProtobuf) {
      const tunnelMsg = {
        type: root.tunnel.MessageType.REGISTERED,
        messageId: messageId,
        timestamp: timestamp,
        registered: {
          clientId: clientId,
          message: message,
          success: success,
          serverInfo: serverInfo
        }
      };
      
      const TunnelMessage = root.tunnel.TunnelMessage;
      const buffer = TunnelMessage.encode(tunnelMsg).finish();
      return buffer;
    } else {
      // JSON fallback
      return {
        type: 'registered',
        messageId,
        timestamp,
        clientId,
        message,
        success,
        serverInfo
      };
    }
  }

  /**
   * Create a request message
   * @param {string} reqId - Request identifier
   * @param {string} method - HTTP method
   * @param {string} path - Request path
   * @param {Object} headers - HTTP headers
   * @param {Buffer} body - Request body
   * @returns {Buffer|Object} Serialized message
   */
  createRequestMessage(reqId, method, path, headers, body) {
    const messageId = this.generateMessageId();
    const timestamp = Date.now();
    const bodyLength = body ? body.length : 0;

    if (this.useProtobuf) {
      const tunnelMsg = {
        type: root.tunnel.MessageType.REQUEST,
        messageId: messageId,
        timestamp: timestamp,
        request: {
          reqId: reqId,
          method: method,
          path: path,
          headers: this.headersToProtobuf(headers),
          body: body || Buffer.alloc(0),
          bodyLength: bodyLength,
          timestamp: timestamp
        }
      };
      
      const TunnelMessage = root.tunnel.TunnelMessage;
      const buffer = TunnelMessage.encode(tunnelMsg).finish();
      return buffer;
    } else {
      // JSON fallback with base64 encoding for body
      return {
        type: 'request',
        messageId,
        timestamp,
        reqId,
        method,
        path,
        headers,
        body: body ? body.toString('base64') : '',
        bodyLength
      };
    }
  }

  /**
   * Create a response message
   * @param {string} reqId - Request identifier
   * @param {number} status - HTTP status code
   * @param {Object} headers - HTTP headers
   * @param {Buffer} body - Response body
   * @returns {Buffer|Object} Serialized message
   */
  createResponseMessage(reqId, status, headers, body) {
    const messageId = this.generateMessageId();
    const timestamp = Date.now();
    const bodyLength = body ? body.length : 0;

    if (this.useProtobuf) {
      const tunnelMsg = {
        type: root.tunnel.MessageType.RESPONSE,
        messageId: messageId,
        timestamp: timestamp,
        response: {
          reqId: reqId,
          status: status,
          headers: this.headersToProtobuf(headers),
          body: body || Buffer.alloc(0),
          bodyLength: bodyLength,
          timestamp: timestamp
        }
      };
      
      const TunnelMessage = root.tunnel.TunnelMessage;
      const buffer = TunnelMessage.encode(tunnelMsg).finish();
      return buffer;
    } else {
      // JSON fallback with base64 encoding for body
      return {
        type: 'response',
        messageId,
        timestamp,
        reqId,
        status,
        headers,
        body: body ? body.toString('base64') : '',
        bodyLength
      };
    }
  }

  /**
   * Create an error message
   * @param {string} reqId - Request identifier (optional)
   * @param {string} errorCode - Error code
   * @param {string} message - Error message
   * @returns {Buffer|Object} Serialized message
   */
  createErrorMessage(reqId, errorCode, message) {
    const messageId = this.generateMessageId();
    const timestamp = Date.now();

    if (this.useProtobuf) {
      const tunnelMsg = {
        type: root.tunnel.MessageType.ERROR,
        messageId: messageId,
        timestamp: timestamp,
        error: {
          reqId: reqId || '',
          errorCode: errorCode,
          message: message,
          timestamp: timestamp
        }
      };
      
      const TunnelMessage = root.tunnel.TunnelMessage;
      const buffer = TunnelMessage.encode(tunnelMsg).finish();
      return buffer;
    } else {
      // JSON fallback
      return {
        type: 'error',
        messageId,
        timestamp,
        reqId: reqId || '',
        errorCode,
        message
      };
    }
  }

  /**
   * Create a ping message
   * @returns {Buffer|Object} Serialized message
   */
  createPingMessage() {
    const messageId = this.generateMessageId();
    const timestamp = Date.now();

    if (this.useProtobuf) {
      const tunnelMsg = {
        type: root.tunnel.MessageType.PING,
        messageId: messageId,
        timestamp: timestamp,
        ping: {
          timestamp: timestamp
        }
      };
      
      const TunnelMessage = root.tunnel.TunnelMessage;
      const buffer = TunnelMessage.encode(tunnelMsg).finish();
      return buffer;
    } else {
      // JSON fallback
      return {
        type: 'ping',
        messageId,
        timestamp
      };
    }
  }

  /**
   * Create a pong message
   * @param {number} latency - Response latency in milliseconds
   * @returns {Buffer|Object} Serialized message
   */
  createPongMessage(latency = 0) {
    const messageId = this.generateMessageId();
    const timestamp = Date.now();

    if (this.useProtobuf) {
      const tunnelMsg = {
        type: root.tunnel.MessageType.PONG,
        messageId: messageId,
        timestamp: timestamp,
        pong: {
          timestamp: timestamp,
          latency: latency
        }
      };
      
      const TunnelMessage = root.tunnel.TunnelMessage;
      const buffer = TunnelMessage.encode(tunnelMsg).finish();
      return buffer;
    } else {
      // JSON fallback
      return {
        type: 'pong',
        messageId,
        timestamp,
        latency
      };
    }
  }

  /**
   * Parse a received message
   * @param {Buffer|string} data - Raw message data
   * @returns {Object} Parsed message object
   */
  parseMessage(data) {
    try {
      if (this.useProtobuf) {
        // Handle binary protobuf data
        const TunnelMessage = root.tunnel.TunnelMessage;
        const tunnelMsg = TunnelMessage.decode(data);
        const type = tunnelMsg.type;
        const messageId = tunnelMsg.messageId;
        const timestamp = tunnelMsg.timestamp;

        switch (type) {
          case root.tunnel.MessageType.REGISTER: {
            const register = tunnelMsg.register;
            return {
              type: 'register',
              messageId,
              timestamp,
              clientId: register.clientId,
              version: register.version,
              metadata: register.metadata || {}
            };
          }

          case root.tunnel.MessageType.REGISTERED: {
            const registered = tunnelMsg.registered;
            return {
              type: 'registered',
              messageId,
              timestamp,
              clientId: registered.clientId,
              message: registered.message,
              success: registered.success,
              serverInfo: registered.serverInfo || {}
            };
          }

          case root.tunnel.MessageType.REQUEST: {
            const request = tunnelMsg.request;
            return {
              type: 'request',
              messageId,
              timestamp,
              reqId: request.reqId,
              method: request.method,
              path: request.path,
              headers: this.headersFromProtobuf(request.headers || []),
              body: request.body || Buffer.alloc(0),
              bodyLength: request.bodyLength
            };
          }

          case root.tunnel.MessageType.RESPONSE: {
            const response = tunnelMsg.response;
            return {
              type: 'response',
              messageId,
              timestamp,
              reqId: response.reqId,
              status: response.status,
              headers: this.headersFromProtobuf(response.headers || []),
              body: response.body || Buffer.alloc(0),
              bodyLength: response.bodyLength
            };
          }

          case root.tunnel.MessageType.ERROR: {
            const error = tunnelMsg.error;
            return {
              type: 'error',
              messageId,
              timestamp,
              reqId: error.reqId,
              errorCode: error.errorCode,
              message: error.message
            };
          }

          case root.tunnel.MessageType.PING: {
            const ping = tunnelMsg.ping;
            return {
              type: 'ping',
              messageId,
              timestamp,
              pingTimestamp: ping.timestamp
            };
          }

          case root.tunnel.MessageType.PONG: {
            const pong = tunnelMsg.pong;
            return {
              type: 'pong',
              messageId,
              timestamp,
              pongTimestamp: pong.timestamp,
              latency: pong.latency
            };
          }

          default:
            throw new Error(`Unknown message type: ${type}`);
        }
      } else {
        // JSON fallback
        const messageData = data instanceof Buffer ? data.toString() : data;
        const parsed = JSON.parse(messageData);
        
        // Convert base64 body back to buffer for JSON messages
        if (parsed.body && typeof parsed.body === 'string') {
          parsed.body = Buffer.from(parsed.body, 'base64');
        }
        
        return parsed;
      }
    } catch (error) {
      logger.error('Failed to parse message', { 
        error: error.message, 
        dataLength: data ? data.length : 0,
        useProtobuf: this.useProtobuf 
      });
      throw error;
    }
  }

  /**
   * Check if protobuf is available
   * @returns {boolean} True if protobuf is available
   */
  isProtobufAvailable() {
    return this.useProtobuf;
  }

  /**
   * Get message size for logging/debugging
   * @param {Buffer|Object} message - Message to measure
   * @returns {number} Message size in bytes
   */
  getMessageSize(message) {
    if (this.useProtobuf) {
      return message.length;
    } else {
      return Buffer.byteLength(JSON.stringify(message));
    }
  }
}

module.exports = ProtobufHandler; 