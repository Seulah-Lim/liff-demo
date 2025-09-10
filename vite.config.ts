// https://vite.dev/config/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const buildTime = new Date().toISOString();

export default defineConfig({
  base: "/liff-demo/",
  plugins: [react(), vanillaExtractPlugin()],
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  server: {
    allowedHosts: ["johnston-prospect-croatia-loaded.trycloudflare.com"],
  },
  resolve: {
    alias: {
      "lottie-web": "lottie-web/build/player/lottie_light", // or lottie_light.min
    },
  },
});
