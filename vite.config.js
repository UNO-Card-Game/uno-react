import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist", // Ensure the production build outputs to `dist/`
      emptyOutDir: true, // Clean old files before building
    },
    define: {
      "process.env": {}, // Ensure safe environment variable handling
    },
  };
});
