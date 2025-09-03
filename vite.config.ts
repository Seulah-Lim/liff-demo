import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/liff-demo/",
  server: {
    allowedHosts: ["lived-nose-sur-jason.trycloudflare.com"],
  },
});
