import ReturnExtend1Screen from "./ReturnExtend1Screen";
import ReturnExtend2Screen from "./ReturnExtend2Screen";
import { useSearchParams } from "react-router";

export default function ReturnExtendSwitch() {
  const [sp] = useSearchParams();
  // ?a=1 -> A, ?b=1 -> B (우선순위: A > B)
  if (sp.get("a") === "1") return <ReturnExtend1Screen />;
  if (sp.get("b") === "1") return <ReturnExtend2Screen />;
  // 기본값(없을 때)은 A로
  return <ReturnExtend1Screen />;
}
