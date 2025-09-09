import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router";

import AppRoutes from "./routes.tsx";

if (import.meta.env.MODE === "development") {
  document.title = "M Demo (Dev)";
} else {
  document.title = "M Demo";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/liff-demo/">
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
