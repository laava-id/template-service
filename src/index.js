import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import pino from 'pino';

// Create structured logger
const log = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino/file',
    options: { destination: 1 } // stdout
  }
});

// Create Hono app
const app = new Hono();

// Middleware for logging requests in JSON format
app.use('*', async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  
  log.info({
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    responseTime: `${ms}ms`
  });
});

// Root endpoint
app.get('/', (c) => {
  return c.json({ status: 'OK' });
});

// Health check endpoint
app.get('/healthz', (c) => {
  return c.json({ status: 'OK' });
});

const port = process.env.PORT || 8080;

// Start the server
serve({
  fetch: app.fetch,
  port
}, (info) => {
  log.info(`Server started on port ${info.port}`);
});