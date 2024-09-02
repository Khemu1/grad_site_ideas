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
          target: `http://localhost:${
            !isNaN(Number(env.VITE_BACKEND_PORT))
              ? Number(env.VITE_BACKEND_PORT)
              : 4001
          }`,
          changeOrigin: true,
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
          target: `http://localhost:${
            !isNaN(Number(env.VITE_BACKEND_PORT))
              ? Number(env.VITE_BACKEND_PORT)
              : 4001
          }`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
