import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

import ScanResult from "./pages/scan/ScanResult.tsx";
import RentScreen from "./pages/temp/RentScreen.tsx";
import SupportScreen from "./pages/temp/SupportScreen.tsx";
import InUseNoticeScreen from "./pages/temp/InUseNoticeScreen.tsx";
import Login from "./pages/login/Login.tsx";
import CurrentLocation from "./pages/location/CurrentLocation.tsx";
import ReturnExtendSwitch from "./pages/temp/ReturnExtendSwitch.tsx";
import HomeHub from "./pages/main/Homehub.tsx";
import UserInfo from "./pages/userInfo/UserInfo.tsx";

if (import.meta.env.MODE === "development") {
  document.title = "M Demo (Dev)";
} else {
  document.title = "M Demo";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* index = 홈 */}
          <Route index element={<HomeHub />} />

          {/* 일반 페이지 */}
          <Route path="login" element={<Login />} />
          <Route path="userInfo" element={<UserInfo />} />
          <Route path="scan" element={<ScanResult />} />
          <Route path="support" element={<SupportScreen />} />
          <Route path="currentLocation" element={<CurrentLocation />} />

          {/* 데모 플로우(중첩) */}
          <Route path="flows">
            <Route path="rent" element={<RentScreen />} />
            <Route path="borrowed" element={<InUseNoticeScreen />} />
            <Route path="return" element={<ReturnExtendSwitch />} />
            <Route path="support" element={<SupportScreen />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
