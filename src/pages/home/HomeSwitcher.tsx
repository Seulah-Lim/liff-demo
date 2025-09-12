import { parseHomeView, useHomeViewStore } from "@app/store/homeStore";
import InUseNoticeScreen from "@pages/home/InUseNoticeScreen";
import RentScreen from "@pages/home/RentScreen";
import ReturnExtendScreen from "@pages/home/ReturnExtendScreen";
import HomeHub from "@pages/homehub/Homehub";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export default function HomeSwitcher() {
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
