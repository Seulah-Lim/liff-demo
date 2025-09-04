// App.tsx
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { useBidStore } from "./app/store/bidStore";

export default function App() {
  const loc = useLocation();
  const initFromUrlOnce = useBidStore((s) => s.initFromUrlOnce);

  useEffect(() => {
    // 앱 진입 시 현재 URL의 ?bid=를 읽어 전역 저장(한 번만 동작)
    initFromUrlOnce(loc.search);
  }, [initFromUrlOnce, loc.search]);

  return (
    <div style={{ display: "flex" }}>
      <Outlet />
    </div>
  );
}
