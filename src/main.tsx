import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastHost } from "@app/providers/toast/ToastHost";

declare const __BUILD_TIME__: string;
function preInitCaptureLiffId() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("liffId");
  if (!q) return;
  sessionStorage.setItem("__liff_id", q);

  params.delete("liffId");
  const newQs = params.toString();
  const newUrl =
    window.location.pathname +
    (newQs ? `?${newQs}` : "") +
    window.location.hash;
  window.history.replaceState(null, "", newUrl);
}
if (import.meta.env.MODE === "development") {
  document.title = `Dev ${new Date(__BUILD_TIME__).toLocaleString()}`;
} else {
  document.title = `${new Date(__BUILD_TIME__).toLocaleString()}`;
}
const queryClient = new QueryClient();
preInitCaptureLiffId();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/liff-demo/">
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastHost />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
