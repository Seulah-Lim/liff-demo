// https://vite.dev/config/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const buildTime = new Date().toISOString();

export default defineConfig({
  plugins: [react()],
  base: "/liff-demo/",
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  server: {
    allowedHosts: ["lived-nose-sur-jason.trycloudflare.com"],
  },
});
