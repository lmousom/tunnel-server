const http = require('http');
const TunnelServer = require('./tunnel-server');
const logger = require('../utils/logger');
const config = require('../config');

// Create HTTP server
const server = http.createServer();

// Initialize tunnel server
new TunnelServer(server);

// Start the server
server.listen(config.port, config.host, () => {
  logger.info('Tunnel server started', {
    port: config.port,
    host: config.host,
    environment: process.env.NODE_ENV || 'development',
  });
});

// Handle server errors
server.on('error', (err) => {
  logger.error('Server error', { error: err.message });
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', { error: err.message, stack: err.stack });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled promise rejection', { 
    reason: reason?.message || reason,
    promise: promise.toString(), 
  });
  process.exit(1);
});
