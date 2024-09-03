# Project Overview

This project consists of a frontend application built with Vite and a backend server. The frontend and backend are configured to work together seamlessly. This guide explains the configuration required for running the project with Vite and deploying it with Nginx.

## Project Idea

The project is a full-stack web application where the frontend and backend communicate via API endpoints. The frontend is built using Vite, a fast build tool that optimizes modern web development workflows. The backend server handles API requests and serves data to the frontend.

## Running the Project with Vite

### Vite Configuration

The `vite.config.ts` file contains the configuration for Vite. This configuration handles both development and production builds, including proxy setup for API requests.

```typescript
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig(({ mode }) => {
  // Load environment variables from .env file located one directory up
  const __filename = fileURLToPath(import.meta.url);
  const ___rootDir = path.dirname(__filename); // server

  const env = loadEnv(mode, path.resolve(___rootDir, "../"), "");

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
    },
    preview: {
      port: !isNaN(Number(env.VITE_PREVIEW)) ? Number(env.VITE_PREVIEW) : 5411,
      proxy: {
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    server: {
      port: !isNaN(Number(env.VITE_FRONTEND_PORT))
        ? Number(env.VITE_FRONTEND_PORT)
        : 5414,
      proxy: {
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
```
## Vite Configuration Details

- **`server`**: Configures the development server to run on a specified port and proxies API requests to the backend.
- **`preview`**: Configures the preview server for production builds with similar proxy settings.

## Nginx Configuration

Nginx is used to serve the frontend and proxy requests to the backend server. The configuration file (`nginx.conf`) is set up to handle HTTPS redirection and proxy API requests.

### Nginx Configuration File

```nginx
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;

        # Redirect HTTP to HTTPS
        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl;
        server_name localhost;

        ssl_certificate /path/to/your/cert.pem;
        ssl_certificate_key /path/to/your/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Serve static files
        location / {
            root /path/to/your/frontend/dist;
            index index.html;
            try_files $uri $uri/ /index.html;
        }

        # Proxy API requests
        location /api/ {
            proxy_pass http://localhost:4000;  # Backend server address
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Error pages
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
```
- **HTTP to HTTPS Redirect**: Redirects all HTTP requests to HTTPS.
- **HTTPS Configuration**: Listens on port 443 for secure connections, with SSL certificate and key.
- **Static File Serving**: Serves the frontend static files from the `dist` directory.
- **API Proxy**: Proxies API requests to the backend server running on port 4000.
- **Error Pages**: Configures custom error pages.

## Running the Project

1. **Build the Frontend**: Use Vite to build the production assets.

    ```bash
    npm run build
    ```

2. **Start the Backend Server**: Ensure your backend server is running on the specified port.

3. **Start Nginx**: Reload or restart Nginx to apply the configuration changes.

    ```bash
    nginx -s reload
    ```

4. **Visit the Site**: Open `http://localhost` in your browser. If SSL is configured, visit `https://localhost`.

