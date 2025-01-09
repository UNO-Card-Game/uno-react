import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Match backend port
    proxy: {
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true, // Enable WebSocket proxying
        changeOrigin: true,
      },
    },
    hmr:{
      host:'localhost',
      port:3001
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
