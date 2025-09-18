// https://vite.dev/config/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

const buildTime = new Date().toISOString();

export default defineConfig({
  base: "/liff-demo/",
  plugins: [react(), vanillaExtractPlugin(), tsconfigPaths()],
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  server: {
    allowedHosts: ["priced-tasks-joy-death.trycloudflare.com"],
  },
  resolve: {
    alias: {
      "lottie-web": "lottie-web/build/player/lottie_light",
    },
  },
});
