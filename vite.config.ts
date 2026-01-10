import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/custom': {
        target: 'https://kandil-glass-stage-26832699.dev.odoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/custom/, ''),
        secure: false,
      }
    }
  }
});
