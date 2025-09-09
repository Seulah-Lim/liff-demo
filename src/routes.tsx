import { Routes, Route, useSearchParams } from "react-router";
import ErrorScreen, { type ErrorKind } from "./pages/error/ErrorScreen";
import HomeHub from "./pages/homehub/Homehub";
import SupportScreen from "./pages/temp/SupportScreen";
import RentScreen from "./pages/temp/RentScreen";
import InUseNoticeScreen from "./pages/temp/InUseNoticeScreen";
import ReturnExtendSwitch from "./pages/temp/ReturnExtendSwitch";
import UserInfo from "./pages/userInfo/UserInfo";
import AppGate from "./pages/gate/AppGate";

function ErrorRoute() {
  const [sp] = useSearchParams();
  const kind = (sp.get("kind")?.toUpperCase() as ErrorKind) || "UNKNOWN";
  const detail = sp.get("detail") ?? undefined;
  const supportId = sp.get("supportId") ?? undefined;
  return <ErrorScreen kind={kind} detail={detail} supportId={supportId} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* 앱의 모든 정상 페이지는 AppGate 통과 */}
      <Route path="/" element={<AppGate />}>
        <Route index element={<HomeHub />} />
        <Route path="/home" element={<HomeHub />} />
        <Route path="/home/rent" element={<RentScreen />} />
        <Route path="/home/borrowed" element={<InUseNoticeScreen />} />
        <Route path="/home/return" element={<ReturnExtendSwitch />} />
        <Route path="/home/support" element={<SupportScreen />} />
        <Route path="/home/userInfo" element={<UserInfo />} />
        <Route path="/support" element={<SupportScreen />} />
      </Route>

      {/* 에러는 가드 밖(가드에서 리다이렉트로 진입) */}
      <Route path="/error" element={<ErrorRoute />} />
    </Routes>
  );
}
