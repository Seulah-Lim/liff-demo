// https://vite.dev/config/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const buildTime = new Date().toISOString();

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  base: "/liff-demo/",
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  server: {
    allowedHosts: ["lived-nose-sur-jason.trycloudflare.com"],
  },
});
