# Template Service

A minimal microservice template built with [Hono](https://hono.dev/) that provides basic REST endpoints for Docker container deployments.

## Features

- `GET /` - Simple OK endpoint that returns `{"status": "OK"}`
- `GET /healthz` - Health check endpoint for container orchestration
- Structured JSON logging using Pino
- Minimal Docker image based on Alpine
- Automatic Docker Hub publishing via GitHub Actions

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm run start
```

### Environment Variables

- `PORT` - Port to listen on (default: 8080)
- `LOG_LEVEL` - Logging level (default: info)

### Docker

```bash
# Build the Docker image
docker build -t template-service .

# Run the container
docker run -p 8080:8080 template-service
```

## Deployment

This service is configured to automatically build and push to Docker Hub when:

1. Code is pushed to the `main` branch
2. A new version tag (e.g., `v1.0.0`) is created

### Required GitHub Secrets

To enable automatic publishing, add these secrets to your GitHub repository:

- `DOCKERHUB_USERNAME` - Your Docker Hub username
- `DOCKERHUB_TOKEN` - A Docker Hub access token

## License

See [LICENSE](LICENSE) file for details.