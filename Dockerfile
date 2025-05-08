FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Final stage with minimal image
FROM node:20-alpine

# Set non-root user for security
USER node
WORKDIR /app

# Copy from builder stage
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/src ./src

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port the app runs on
EXPOSE 8080

# Run the app
CMD ["node", "src/index.js"]