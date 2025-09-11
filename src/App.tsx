import { Routes, Route, useSearchParams } from "react-router";
import MainLayout from "@app/layout/MainLayout";
import { parseHomeView, useHomeViewStore } from "@app/store/homeStore";
import { useEffect } from "react";
import { ErrorScreen, type ErrorKind } from "@pages/error/ErrorScreen";
import HomeHub from "@pages/homehub/Homehub";
import RentScreen from "@pages/temp/RentScreen";
import InUseNoticeScreen from "@pages/temp/InUseNoticeScreen";
import SupportScreen from "@pages/temp/SupportScreen";
import UserInfo from "@pages/userInfo/UserInfo";
import ReturnExtendScreen from "@pages/temp/ReturnExtendScreen";
import ReturnGuideScreen from "@pages/temp/ReturnGuideScreen";
import ProtectedRoute from "@app/routes/ProtectedRoute";
import ViewGuard from "@app/routes/ViewGuard";

function ErrorRoute() {
  const [sp] = useSearchParams();
  const kind = (sp.get("kind")?.toUpperCase() as ErrorKind) || "UNKNOWN";
  const detail = sp.get("detail") ?? undefined;
  const supportId = sp.get("supportId") ?? undefined;
  return <ErrorScreen kind={kind} detail={detail} supportId={supportId} />;
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
  if (lastView === "rent") return <RentScreen />;
  if (lastView === "borrowed") return <InUseNoticeScreen />;
  if (lastView === "return") return <ReturnExtendScreen />;
  return <HomeHub />;
}
export default function App() {
  return (
    <Routes>
      {/* 전역 보호: 로그인/ bid */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* 홈 전용 보호: view */}
          <Route path="/" element={<ViewGuard />}>
            {/* 실제 비즈니스 레이아웃 */}
            <Route index element={<HomeSwitcher />} />
            <Route path="me" element={<UserInfo />} />
          </Route>

          {/* 전역 보호만 필요(뷰 불필요)한 페이지들 */}
          <Route path="support" element={<SupportScreen />} />
          <Route path="return-guide" element={<ReturnGuideScreen />} />
        </Route>
      </Route>
      {/* 에러는 예외 */}
      <Route path="error" element={<ErrorRoute />} />
    </Routes>
  );
}
