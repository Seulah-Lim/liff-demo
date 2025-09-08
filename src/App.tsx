// App.tsx
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { useBidStore } from "./app/store/bidStore";

export default function App() {
  const loc = useLocation();
  const initFromUrlOnce = useBidStore((s) => s.initFromUrlOnce);

  //url에 bid가 포함 아니면 에러페이지로
  //로딩 화면 시작
  //Init
  //로딩 화면 끝
  //init 실패시?(실패할일 거으 없는데 실패하면 로그아웃하고 )
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
