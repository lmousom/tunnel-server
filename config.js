// Only load .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ quiet: true });
}

module.exports = {
  // Server configuration
  port: process.env.PORT || 8080,
  host: process.env.HOST || '0.0.0.0',
  
  // Security
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
  
  // Rate limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  
  // Connection limits
  maxConnections: parseInt(process.env.MAX_CONNECTIONS) || 100,
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000, // 30 seconds
  connectionTimeout: parseInt(process.env.CONNECTION_TIMEOUT) || 60000, // 60 seconds
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Environment
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // SSL (for local development)
  ssl: {
    enabled: process.env.SSL_ENABLED === 'true',
    keyPath: process.env.SSL_KEY_PATH || './localhost-key.pem',
    certPath: process.env.SSL_CERT_PATH || './localhost-cert.pem',
  },
}; 
