import ReturnExtendScreen from "./ReturnExtendScreen";
import { useSearchParams } from "react-router";
import ReturnGuideScreen from "./ReturnGuideScreen";

export default function ReturnExtendSwitch() {
  const [sp] = useSearchParams();
  // ?a=1 -> A, ?b=1 -> B (우선순위: A > B)
  if (sp.get("a") === "1") return <ReturnGuideScreen />;
  if (sp.get("b") === "1") return <ReturnExtendScreen />;
  // 기본값(없을 때)은 A로
  return <ReturnGuideScreen />;
}
