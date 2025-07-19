/* eslint-disable prefer-destructuring */
const WebSocket = require('ws');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('../utils/logger');
const { wsRateLimit, httpRateLimit } = require('../utils/security');
const TunnelManager = require('../utils/tunnel-manager');
const config = require('../config');

class TunnelServer {
  constructor (server) {
    this.server = server;
    this.tunnelManager = new TunnelManager();
    this.wss = null;
    this.app = null;
    this.setupExpress();
    this.setupWebSocket();
    this.setupCleanup();
  }

  setupExpress () {
    this.app = express();
    
    // Security middleware
    this.app.use(helmet());
    this.app.use(cors({
      origin: config.allowedOrigins,
      credentials: true,
    }));

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      const stats = this.tunnelManager.getStats();
      const response = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        stats,
      };
      res.json(response); 
    });

    // Stats endpoint
    this.app.get('/stats', (req, res) => {
      const stats = this.tunnelManager.getStats();
      res.json(stats); 
    });



    // Main tunnel endpoint
    this.app.all('*', async (req, res) => {
      // Rate limiting
      const rateLimitPassed = await httpRateLimit(req);
      if (!rateLimitPassed) {
        res.status(429).json({ error: 'Too many requests' });
        return;
      }

      await this.tunnelManager.handleRequest(req, res);
    });

    // Error handling middleware
    this.app.use((err, req, res, _next) => {
      logger.error('Express error', { 
        error: err.message, 
        stack: err.stack,
        url: req.url,
        method: req.method, 
      });
      
      res.status(500).json({ error: 'Internal server error' });
    });

    // Mount express app on the server
    this.server.on('request', this.app);
  }

  setupWebSocket () {
    this.wss = new WebSocket.Server({ server: this.server });

    this.wss.on('connection', async (ws, req) => {
      // Rate limiting for WebSocket connections
      const rateLimitPassed = await wsRateLimit(req);
      if (!rateLimitPassed) {
        ws.close(1008, 'Rate limit exceeded');
        return;
      }

      let clientId = null;

      ws.on('message', (msg) => {
        try {
          // Handle both binary and text messages for backward compatibility
          const messageData = msg instanceof Buffer ? msg.toString() : msg;
          const data = JSON.parse(messageData);
          
          if (data.type === 'register') {
            clientId = data.clientId;
            
            if (this.tunnelManager.registerClient(clientId, ws, req)) {
              const responseBuffer = Buffer.from(JSON.stringify({ 
                type: 'registered', 
                clientId,
                message: 'Successfully registered', 
              }));
              ws.send(responseBuffer, { binary: true });
            } else {
              ws.close(1008, 'Registration failed');
            }
          } else if (data.type === 'response') {
            const { reqId } = data;
            this.tunnelManager.handleResponse(reqId, data);
          }
        } catch (err) {
          logger.error('WebSocket message error', { 
            error: err.message, 
            clientId, 
          });
        }
      });

      ws.on('close', () => {
        if (clientId) {
          this.tunnelManager.unregisterClient(clientId);
        }
      });

      ws.on('error', (err) => {
        logger.error('WebSocket error', { 
          error: err.message, 
          clientId, 
        });
        if (clientId) {
          this.tunnelManager.unregisterClient(clientId);
        }
      });

      // Send ping to keep connection alive
      ws.on('pong', () => {
        ws.isAlive = true;
      });
    });

    // Heartbeat to detect dead connections
    setInterval(() => {
      this.wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
          logger.warn('Terminating dead WebSocket connection');
          return ws.terminate();
        }
        
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
  }

  setupCleanup () {
    // Clean up inactive connections every 5 minutes
    setInterval(() => {
      this.tunnelManager.cleanupInactiveConnections();
    }, 5 * 60 * 1000);

    // Graceful shutdown
    process.on('SIGTERM', () => this.gracefulShutdown());
    process.on('SIGINT', () => this.gracefulShutdown());
  }

  async gracefulShutdown () {
    logger.info('Starting graceful shutdown...');
    
    // Close all WebSocket connections
    this.wss.clients.forEach((client) => {
      client.close();
    });
    
    // Close the server
    this.server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });

    // Force exit after 10 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  }

  getStats () {
    return this.tunnelManager.getStats();
  }
}

module.exports = TunnelServer; 
