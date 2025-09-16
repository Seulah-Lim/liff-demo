import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastHost } from "@app/providers/toast/ToastHost";

declare const __BUILD_TIME__: string;

if (import.meta.env.MODE === "development") {
  document.title = `Dev ${new Date(__BUILD_TIME__).toLocaleString()}`;
} else {
  document.title = `${new Date(__BUILD_TIME__).toLocaleString()}`;
}
const queryClient = new QueryClient();
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
