import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables from .env file based on mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: "client", // Set the root to the client folder
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
      //dev mode and proxy
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
