import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Buffer } from "buffer";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inject({ Buffer: ["buffer", "Buffer"] })],
  server: {
    port: 3030,
    proxy: {
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  define: {
    // "process.env": process.env,
    // // By default, Vite doesn't include shims for NodeJS/
    // // necessary for segment analytics lib to work
    "process.env": process.env,
    global: {
      Buffer: Buffer,
    },
  },
  resolve: {
    alias: {
      process: "process/browser",
      buffer: "buffer",
    },
  },
});
