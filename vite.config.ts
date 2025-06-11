import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  // Adicione a configuração de servidor com proxy
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Ajuste para a URL do seu backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
