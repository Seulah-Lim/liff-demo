import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import BatteryInfo from "./pages/batteryInfo/BatteryInfo.tsx";

import ScanResult from "./pages/scan/ScanResult.tsx";

import RentScreen from "./pages/temp/RentScreen.tsx";
import Login_mobile from "./pages/login/Login.tsx";
import ReturnExtend1Screen from "./pages/temp/ReturnExtend1Screen.tsx";
import ReturnExtend2Screen from "./pages/temp/ReturnExtend2Screen.tsx";
import SupportScreen from "./pages/temp/SupportScreen.tsx";

import InUseNoticeScreen from "./pages/temp/InUseNoticeScreen.tsx";
import Temp from "./pages/temp/Temp.tsx";

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
          <Route path="/login" element={<Login_mobile />} />
        </Route>
        <Route path="/batteryInfo" element={<BatteryInfo />} />
        <Route path="/scan" element={<ScanResult />} />

        <Route path="/temp" element={<Temp />} />
        <Route path="/rentScreen" element={<RentScreen />} />
        <Route path="/returnExtend1" element={<ReturnExtend1Screen />} />
        <Route path="/returnExtend2" element={<ReturnExtend2Screen />} />
        <Route path="/inuseNotice" element={<InUseNoticeScreen />} />
        <Route path="/support" element={<SupportScreen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
