import { Routes, Route, useLocation } from "react-router";
import SessionLayout from "@app/routes/layout/SessionLayout";
import { useHomeViewStore } from "@app/store/homeStore";
import { useEffect } from "react";
import SupportScreen from "@pages/support/SupportScreen";
import UserInfo from "@pages/userInfo/UserInfo";
import ReturnGuideScreen from "@pages/guide/ReturnGuideScreen";
import BidGuard from "@app/routes/guards/BidGuard";
import HomeViewGuard from "@app/routes/guards/HomeViewGuard";
import LoginRequiredScreen from "@pages/error/LoginRequiredScreen";
import { useBidStore } from "@app/store/bidStore";
import ErrorRoute from "@pages/error/ErrorRoutes";
import HomeSwitcher from "@pages/home/HomeSwitcher";

// const LIFF_ID_KEY = "__liff_id";

// const ALLOW_LIFF_IDS = new Set<string>([
//   "2008073307-WzV16bo0", // prod
//   // "xxxx-xxxxx",       // staging 등 필요 시 추가
// ]);
export default function App() {
  const loc = useLocation();
  const ensureBidOnce = useBidStore((s) => s.ensureBidOnce);
  const ensureViewOnce = useHomeViewStore((s) => s.ensureViewOnce);
  // const didCaptureRef = useRef(false);
  // useEffect(() => {
  //   if (didCaptureRef.current) return;
  //   didCaptureRef.current = true;

  //   const params = new URLSearchParams(window.location.search);
  //   const q = params.get("liffId");

  //   if (q && (!ALLOW_LIFF_IDS.size || ALLOW_LIFF_IDS.has(q))) {
  //     sessionStorage.setItem(LIFF_ID_KEY, q);

  //     // 다른 쿼리는 보존
  //     params.delete("liffId");
  //     const newQs = params.toString();
  //     const newUrl =
  //       window.location.pathname +
  //       (newQs ? `?${newQs}` : "") +
  //       window.location.hash;

  //     // 주소창만 교체(리렌더/네비게이션 없음)
  //     window.history.replaceState(null, "", newUrl);
  //   }
  // }, []);
  useEffect(() => {
    ensureBidOnce(loc.search);
    ensureViewOnce(loc.search);
  }, [loc.search, ensureBidOnce, ensureViewOnce]);

  return (
    <>
      <Routes>
        <Route element={<SessionLayout />}>
          <Route element={<BidGuard />}>
            <Route path="/" element={<HomeViewGuard />}>
              <Route index element={<HomeSwitcher />} />
              <Route path="me" element={<UserInfo />} />
            </Route>
            <Route path="support" element={<SupportScreen />} />
            <Route path="return-guide" element={<ReturnGuideScreen />} />
          </Route>
          <Route path="error" element={<ErrorRoute />} />
        </Route>
        <Route path="login" element={<LoginRequiredScreen />} />
      </Routes>
    </>
  );
}
