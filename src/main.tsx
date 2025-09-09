import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router";
import App from "./App";

declare const __BUILD_TIME__: string;

if (import.meta.env.MODE === "development") {
  document.title = `Dev ${new Date(__BUILD_TIME__).toLocaleString()}`;
} else {
  document.title = `${new Date(__BUILD_TIME__).toLocaleString()}`;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/liff-demo/">
      <App />
    </BrowserRouter>
  </StrictMode>
);
