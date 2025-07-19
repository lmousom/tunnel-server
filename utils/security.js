const jwt = require('jsonwebtoken');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const config = require('../config');
const logger = require('./logger');

// Rate limiter for WebSocket connections
const wsRateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => req.socket.remoteAddress,
  points: 20, // Number of connections
  duration: 60, // Per 60 seconds
});

// Rate limiter for HTTP requests
const httpRateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => req.socket.remoteAddress,
  points: config.rateLimitMaxRequests,
  duration: config.rateLimitWindowMs / 1000,
});

// Validate client ID format
const validateClientId = (clientId) => {
  if (!clientId || typeof clientId !== 'string') {
    return false;
  }
  // Allow alphanumeric and hyphens, 3-50 characters
  return /^[a-zA-Z0-9-]{3,50}$/.test(clientId);
};

// Generate JWT token for client authentication
const generateToken = (clientId) => {
  return jwt.sign({ clientId }, config.jwtSecret, { expiresIn: '24h' });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    logger.warn('Invalid token provided', { error: error.message });
    return null;
  }
};

// Rate limiting middleware for WebSocket
const wsRateLimit = async (req) => {
  try {
    await wsRateLimiter.consume(req.socket.remoteAddress);
    return true;
  } catch (error) {
    logger.warn('WebSocket rate limit exceeded', { 
      ip: req.socket.remoteAddress, 
    });
    return false;
  }
};

// Rate limiting middleware for HTTP
const httpRateLimit = async (req) => {
  try {
    await httpRateLimiter.consume(req.socket.remoteAddress);
    return true;
  } catch (error) {
    logger.warn('HTTP rate limit exceeded', { 
      ip: req.socket.remoteAddress, 
    });
    return false;
  }
};

// Sanitize headers to prevent header injection
const sanitizeHeaders = (headers) => {
  const sanitized = {};
  const allowedHeaders = [
    'content-type', 'content-length', 'accept', 'user-agent',
    'authorization', 'cache-control', 'pragma', 'expires',
  ];
  
  for (const [key, value] of Object.entries(headers)) {
    const lowerKey = key.toLowerCase();
    if (allowedHeaders.includes(lowerKey)) {
      sanitized[lowerKey] = value;
    }
  }
  
  return sanitized;
};

module.exports = {
  validateClientId,
  generateToken,
  verifyToken,
  wsRateLimit,
  httpRateLimit,
  sanitizeHeaders,
}; 
