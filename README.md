# Tunnel Server

A secure, production-ready tunnel server built with Node.js that allows you to expose local services through a remote server.

## Features

-  **Security**: Rate limiting, input validation, header sanitization
-  **Monitoring**: Health checks, statistics, comprehensive logging
-  **Reliability**: Automatic reconnection, graceful shutdown, error handling
-  **Performance**: Connection pooling, request timeouts, memory management
-  **Developer Friendly**: Environment configuration, development mode with SSL
-  **Modern CLI**: Interactive setup wizard, configuration management

## Architecture

```
┌─────────────────┐    WebSocket     ┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   Tunnel Client │ ◄──────────────► │  Tunnel Server  │ ◄──────────────► │  Local Service  │
│                 │                  │                 │                  │                 │
│ - Reconnection  │                  │ - Rate Limiting │                  │ - Your App      │
│ - Error Handling│                  │ - Authentication│                  │ - API Server    │
│ - Heartbeat     │                  │ - Monitoring    │                  │ - Web Server    │
└─────────────────┘                  └─────────────────┘                  └─────────────────┘
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and customize it:

```bash
cp env.example .env
```

### 3. Start the Server

```bash
# Production mode
npm start

# Development mode (with SSL)
npm run dev
```

### 4. Start the Client

#### Option A: Using the Modern CLI (Recommended)

```bash
# Interactive setup (recommended for first time)
node cli.js setup

# Quick connect to port 3000
node cli.js quick -p 3000

# Full control connection
node cli.js connect -s ws://localhost:8080 -p 3000 -c my-client
```

#### Option B: Direct Client Usage

```bash
# In another terminal
node client/index.js
```


## Configuration

### Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | Server port |
| `HOST` | `0.0.0.0` | Server host |
| `NODE_ENV` | `development` | Environment mode |

### Security Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | `your-secret-key` | JWT signing secret |
| `ALLOWED_ORIGINS` | `*` | CORS allowed origins |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |

### Connection Limits

| Variable | Default | Description |
|----------|---------|-------------|
| `MAX_CONNECTIONS` | `100` | Maximum concurrent connections |
| `REQUEST_TIMEOUT` | `30000` | Request timeout (30s) |
| `CONNECTION_TIMEOUT` | `60000` | Connection timeout (60s) |

### Client Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `CLIENT_ID` | `mousom` | Unique client identifier |
| `SERVER_URL` | `ws://localhost:8080` | Tunnel server URL |
| `LOCAL_PORT` | `3000` | Local service port |
| `LOCAL_HOST` | `localhost` | Local service host |

## API Endpoints

### Health Check
```
GET /health
```
Returns server health status and statistics.

### Statistics
```
GET /stats
```
Returns detailed server statistics including active connections.

### Tunnel Requests
```
ALL /{clientId}/*
```
Forwards requests to the specified client's local service.

## Security Features

### Rate Limiting
- **WebSocket Connections**: 10 connections per minute per IP
- **HTTP Requests**: Configurable per IP (default: 100 per 15 minutes)

### Input Validation
- Client ID validation (alphanumeric + hyphens, 3-50 characters)
- Header sanitization to prevent injection attacks
- Request timeout protection

### Authentication (Planned)
- JWT-based client authentication
- Token generation and verification utilities included

## Monitoring & Logging

### Log Levels
- `error`: Errors and exceptions
- `warn`: Warnings and important events
- `info`: General information
- `debug`: Detailed debugging information

### Metrics
- Active connections count
- Pending requests count
- Client registration statistics
- Request/response timing

## Development

### SSL Setup for Local Development

1. Generate SSL certificates:
```bash
# Using mkcert (recommended)
mkcert localhost

# Or using OpenSSL
openssl req -x509 -newkey rsa:4096 -keyout localhost-key.pem -out localhost-cert.pem -days 365 -nodes
```

2. Update environment variables:
```bash
SSL_ENABLED=true
SSL_KEY_PATH=./localhost-key.pem
SSL_CERT_PATH=./localhost-cert.pem
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Production Deployment

### Environment Variables
Set these in your production environment:

```bash
NODE_ENV=production
JWT_SECRET=your-super-secure-secret-key
ALLOWED_ORIGINS=https://yourdomain.com
LOG_LEVEL=info
```


### Health Checks
The server provides health check endpoints for load balancers and monitoring systems.

## Troubleshooting

### Common Issues

1. **SSL Certificate Errors**
   - Ensure certificates exist and paths are correct
   - Check file permissions

2. **Connection Refused**
   - Verify server is running on correct port
   - Check firewall settings

3. **Rate Limit Exceeded**
   - Increase rate limit settings
   - Check for client misconfiguration

### Debug Mode
Set `LOG_LEVEL=debug` for detailed logging information.

## CLI Tool

The tunnel server includes a modern, feature-rich CLI tool for easy client management.

### CLI Features


### Quick CLI Examples

```bash
# First-time setup
node cli.js setup

# Quick connect
node cli.js quick -p 3000

# Show configuration
node cli.js config --show

# Get help
node cli.js help
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License