import path from "path"
import { defineConfig ,loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // L
  return {plugins: [react()],
  server: {
    port: 3000, 
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
  build: {
    outDir: "dist", // Ensure the output directory for production
  },
  define: {
    // Make environment variables available globally
    "process.env": env,
  },
};
});
