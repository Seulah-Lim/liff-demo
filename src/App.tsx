import { Routes, Route, useLocation } from "react-router";
import SessionGuard from "@app/routes/guards/SessionGuard";
import { useHomeViewStore } from "@app/store/homeStore";
import { useEffect } from "react";
import SupportScreen from "@pages/support/SupportScreen";
import UserInfo from "@pages/archive/userInfo/UserInfo";
import ReturnGuideScreen from "@pages/guide/ReturnGuideScreen";
import BidGuard from "@app/routes/guards/BidGuard";
import HomeViewGuard from "@app/routes/guards/HomeViewGuard";
import LoginRequiredScreen from "@pages/error/LoginRequiredScreen";
import { useBidStore } from "@app/store/bidStore";

import HomeSwitcher from "@pages/home/HomeSwitcher";
import { ErrorRoute } from "@app/routes/ErrorRoutes";

export default function App() {
  const loc = useLocation();
  const ensureBidOnce = useBidStore((s) => s.ensureBidOnce);
  const ensureViewOnce = useHomeViewStore((s) => s.ensureViewOnce);

  useEffect(() => {
    ensureBidOnce(loc.search);
    ensureViewOnce(loc.search);
  }, [loc.search, ensureBidOnce, ensureViewOnce]);

  return (
    <>
      <Routes>
        <Route element={<SessionGuard />}>
          <Route element={<BidGuard />}>
            <Route path="/" element={<HomeViewGuard />}>
              <Route index element={<HomeSwitcher />} />
              <Route path="me" element={<UserInfo />} />
            </Route>
            <Route path="support" element={<SupportScreen />} />
            <Route path="return-guide" element={<ReturnGuideScreen />} />
          </Route>
        </Route>
        <Route path="error" element={<ErrorRoute />} />
        <Route path="login" element={<LoginRequiredScreen />} />
      </Routes>
    </>
  );
}
