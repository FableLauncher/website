import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("/node_modules/")) return;
          if (/\/(react|react-dom|scheduler)\//.test(id)) return "vendor-react";
          if (/\/(react-router|react-router-dom|@remix-run)\//.test(id)) return "vendor-router";
          if (/\/(i18next|react-i18next|i18next-browser-languagedetector)\//.test(id)) {
            return "vendor-i18n";
          }
          if (/\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return "vendor-motion";
          if (id.includes("/lucide-react/")) return "vendor-icons";
        },
      },
    },
  },
});
