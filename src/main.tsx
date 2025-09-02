import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import BatteryInfo from "./pages/batteryInfo/BatteryInfo.tsx";
import Login from "./pages/login/Login.tsx";
import ScanResult from "./pages/scan/ScanResult.tsx";

if (import.meta.env.MODE === "development") {
  document.title = "Liff Demo (Dev)";
} else {
  document.title = "Liff Demo";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/liff-demo/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/batteryInfo" element={<BatteryInfo />} />
        <Route path="/scan" element={<ScanResult />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
