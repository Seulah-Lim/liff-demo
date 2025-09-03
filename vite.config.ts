import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/liff-demo/",
  server: {
    allowedHosts: [
      "converter-luxury-uk-judgment.trycloudflare.com",
      "copies-dealers-trivia-cheapest.trycloudflare.com",
      "xi-definition-mia-premier.trycloudflare.com", // 새로 추가
    ],
  },
});
