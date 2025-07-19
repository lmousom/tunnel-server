const https = require('https');
const fs = require('fs');
const TunnelServer = require('./tunnel-server');
const logger = require('../utils/logger');
const config = require('../config');

// Check if SSL certificates exist
const sslKeyPath = config.ssl.keyPath;
const sslCertPath = config.ssl.certPath;

if (!fs.existsSync(sslKeyPath) || !fs.existsSync(sslCertPath)) {
  logger.error('SSL certificates not found', {
    keyPath: sslKeyPath,
    certPath: sslCertPath,
  });
  logger.info('Please generate SSL certificates for local development');
  process.exit(1);
}

// SSL options
const sslOptions = {
  key: fs.readFileSync(sslKeyPath),
  cert: fs.readFileSync(sslCertPath),
};

// Create HTTPS server
const server = https.createServer(sslOptions);

// Initialize tunnel server
new TunnelServer(server);

// Start the server
const devPort = config.port + 1; // Use next port for dev
server.listen(devPort, config.host, () => {
  logger.info('Local HTTPS tunnel server started', {
    port: devPort,
    host: config.host,
    environment: 'development',
    ssl: true,
  });
});

// Handle server errors
server.on('error', (err) => {
  logger.error('Local dev server error', { error: err.message });
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
