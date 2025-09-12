// routes/ViewGuard.tsx
import {
  Navigate,
  Outlet,
  useSearchParams,
  useLocation,
  matchPath,
} from "react-router";
import {
  parseHomeView,
  useHomeViewStore,
  type HomeView,
} from "@app/store/homeStore";
import { useEffect, useMemo } from "react";

// 서버 미구현
// async function fetchHomeStatus(): Promise<HomeView | null> {
//   return null;
// }

export default function HomeViewGuard() {
  const [sp] = useSearchParams();
  const loc = useLocation();
  const { lastView, setView } = useHomeViewStore();

  const isHome = useMemo(
    () => !!matchPath({ path: "/", end: true }, loc.pathname),
    [loc.pathname]
  );
  const viewParam = sp.get("view");

  const next: HomeView | null = useMemo(() => {
    if (!isHome) return null;
    const fromQuery = parseHomeView(viewParam);
    return fromQuery ?? lastView ?? null;
  }, [isHome, viewParam, lastView]);

  // 스토어 동기화 훅 안에서 조건 처리
  useEffect(() => {
    if (isHome && next) setView(next);
  }, [isHome, next, setView]);

  if (!isHome) return <Outlet />;

  if (!next) {
    return (
      <Navigate
        to="/error?kind=BATTERY_FETCH_FAILED&detail=view%20누락"
        replace
      />
    );
  }

  return <Outlet />;
}
