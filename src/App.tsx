import { Routes, Route, useSearchParams, Navigate } from "react-router";
import MainLayout from "./app/ui/MainLayout";
import {
  parseHomeView,
  useHomeViewStore,
  type HomeView,
} from "./app/store/homeStore";
import { useEffect } from "react";
import { ErrorScreen, type ErrorKind } from "./pages/error/ErrorScreen";
import HomeHub from "./pages/homehub/Homehub";
import RentScreen from "./pages/temp/RentScreen";
import ReturnExtendSwitch from "./pages/temp/ReturnExtendSwitch";
import InUseNoticeScreen from "./pages/temp/InUseNoticeScreen";
import AppGate from "./pages/gate/AppGate";
import SupportScreen from "./pages/temp/SupportScreen";
import UserInfo from "./pages/userInfo/UserInfo";

function ErrorRoute() {
  const [sp] = useSearchParams();
  const kind = (sp.get("kind")?.toUpperCase() as ErrorKind) || "UNKNOWN";
  const detail = sp.get("detail") ?? undefined;
  const supportId = sp.get("supportId") ?? undefined;
  return <ErrorScreen kind={kind} detail={detail} supportId={supportId} />;
}

function getHomeView(sp: URLSearchParams, fallback: HomeView): HomeView {
  // const next: HomeView = apiStateToHomeView(serverState);
  // useHomeViewStore.getState().setView(next);
  return parseHomeView(sp.get("view")) ?? fallback;
}

function HomeSwitcher() {
  const [sp] = useSearchParams();
  const { lastView, setView } = useHomeViewStore();

  // 1) URL에 view가 있으면 스토어 갱신
  const fromQuery = parseHomeView(sp.get("view"));
  useEffect(() => {
    if (fromQuery) setView(fromQuery);
  }, [fromQuery, setView]);

  // 2) URL 없으면 마지막 뷰 사용
  const view = getHomeView(sp, lastView);

  if (view === "rent") return <RentScreen />;
  if (view === "borrowed") return <InUseNoticeScreen />;
  if (view === "return") return <ReturnExtendSwitch />;
  return <HomeHub />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppGate />}>
        <Route element={<MainLayout />}>
          {/* 홈: 상황별 화면 스위치 (기본 HomeHub) */}
          <Route index element={<HomeSwitcher />} />

          {/* 서포트 */}
          <Route path="support" element={<SupportScreen />} />

          {/* (임시) 마이페이지 */}
          <Route path="me" element={<UserInfo />} />

          {/* 레거시 경로 호환 리다이렉트 */}
          <Route
            path="home/rent"
            element={<Navigate to="/home?view=rent" replace />}
          />
          <Route
            path="home/borrowed"
            element={<Navigate to="/home?view=borrowed" replace />}
          />
          <Route
            path="home/return"
            element={<Navigate to="/home?view=return" replace />}
          />
          <Route
            path="home/support"
            element={<Navigate to="/support" replace />}
          />
          <Route path="home/userInfo" element={<Navigate to="/me" replace />} />
        </Route>
      </Route>
      <Route path="/error" element={<ErrorRoute />} />
    </Routes>
  );
}
