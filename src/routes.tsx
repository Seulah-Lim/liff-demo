import { Routes, Route, useSearchParams } from "react-router";
import ErrorScreen, { type ErrorKind } from "./pages/error/ErrorScreen";
import HomeHub from "./pages/homehub/Homehub";
import SupportScreen from "./pages/temp/SupportScreen";
import AppGate from "./pages/gate/AppGate";
import RentScreen from "./pages/temp/RentScreen";
import InUseNoticeScreen from "./pages/temp/InUseNoticeScreen";
import ReturnExtendSwitch from "./pages/temp/ReturnExtendSwitch";

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
      <Route element={<AppGate />}>
        {/* <Route element={<TabsLayout />}> */}
        <Route index element={<HomeHub />} />
        <Route path="/home" element={<HomeHub />}>
          <Route path="rent" element={<RentScreen />} />
          <Route path="borrowed" element={<InUseNoticeScreen />} />
          <Route path="return" element={<ReturnExtendSwitch />} />
          <Route path="support" element={<SupportScreen />} />
        </Route>
        <Route path="/support" element={<SupportScreen />} />
        <Route path="/support/*" element={<SupportScreen />} />
        {/* 서포트 하위 라우트 */}
        {/* </Route> */}
      </Route>

      {/* 에러는 가드 밖(가드에서 리다이렉트로 진입) */}
      <Route path="/error" element={<ErrorRoute />} />

      {/* 정의 안 된 경로 → AppGate 통해 다시 검사 */}
      <Route path="*" element={<AppGate />} />

      {/* 일반 페이지
      <Route path="login" element={<Login />} />
      <Route path="userInfo" element={<UserInfo />} />
      <Route path="scan" element={<ScanResult />} />
      <Route path="support" element={<SupportScreen />} />
      <Route path="currentLocation" element={<CurrentLocation />} /> */}
    </Routes>
  );
}
