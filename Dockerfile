FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app (Vite builds to dist/ directory)
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy built app to nginx (Vite outputs to dist/, not build/)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a simple health check script
RUN echo '#!/bin/sh' > /healthcheck.sh && \
    echo 'curl -f http://localhost:80/ || exit 1' >> /healthcheck.sh && \
    chmod +x /healthcheck.sh

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD /healthcheck.sh

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]