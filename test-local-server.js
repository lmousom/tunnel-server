const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    server: 'test-local-server',
    port: PORT
  });
});

// Basic GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from local server!',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path
  });
});

// GET endpoint with query parameters
app.get('/api/users', (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  
  res.json({
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ],
    pagination: {
      limit: parseInt(limit),
      page: parseInt(page),
      total: 3
    },
    timestamp: new Date().toISOString()
  });
});

// GET endpoint with path parameters
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    user: {
      id: parseInt(id),
      name: `User ${id}`,
      email: `user${id}@example.com`,
      createdAt: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  });
});

// POST endpoint
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required',
      received: { name, email }
    });
  }
  
  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      createdAt: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  });
});

// PUT endpoint
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  res.json({
    message: 'User updated successfully',
    user: {
      id: parseInt(id),
      name: name || `User ${id}`,
      email: email || `user${id}@example.com`,
      updatedAt: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  });
});

// DELETE endpoint
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    message: 'User deleted successfully',
    deletedId: parseInt(id),
    timestamp: new Date().toISOString()
  });
});

// Test endpoint with different content types
app.get('/api/text', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('This is plain text response from local server');
});

app.get('/api/html', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <html>
      <head><title>Test HTML</title></head>
      <body>
        <h1>Hello from Local Server!</h1>
        <p>This is an HTML response from the test server running on port ${PORT}</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      </body>
    </html>
  `);
});

// Error test endpoint
app.get('/api/error', (req, res) => {
  res.status(500).json({
    error: 'This is a test error response',
    code: 'TEST_ERROR',
    timestamp: new Date().toISOString()
  });
});

// Slow endpoint for testing timeouts
app.get('/api/slow', async (req, res) => {
  const delay = parseInt(req.query.delay) || 2000;
  
  console.log(`Slow endpoint called with ${delay}ms delay`);
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  res.json({
    message: 'Slow response completed',
    delay: delay,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Test Local Server is running!',
    server: 'test-local-server',
    port: PORT,
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /health',
      'GET /api/hello',
      'GET /api/users',
      'GET /api/users/:id',
      'POST /api/users',
      'PUT /api/users/:id',
      'DELETE /api/users/:id',
      'GET /api/text',
      'GET /api/html',
      'GET /api/error',
      'GET /api/slow?delay=2000'
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    requestedPath: req.originalUrl,
    availableEndpoints: [
      '/health',
      '/api/hello',
      '/api/users',
      '/api/users/:id',
      '/api/text',
      '/api/html',
      '/api/error',
      '/api/slow'
    ],
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, 'localhost', () => {
  console.log(`🚀 Test Local Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   GET  /api/hello`);
  console.log(`   GET  /api/users`);
  console.log(`   GET  /api/users/:id`);
  console.log(`   POST /api/users`);
  console.log(`   PUT  /api/users/:id`);
  console.log(`   DELETE /api/users/:id`);
  console.log(`   GET  /api/text`);
  console.log(`   GET  /api/html`);
  console.log(`   GET  /api/error`);
  console.log(`   GET  /api/slow?delay=2000`);
  console.log(`\n🔗 Test via tunnel: https://tunnel-server-l1tj.onrender.com/mousom/api/hello`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down test server...');
  process.exit(0);
}); 