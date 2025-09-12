import ErrorScreen, { type ErrorKind } from "@pages/error/ErrorScreen";
import { useSearchParams } from "react-router";

export default function ErrorRoute() {
  const [sp] = useSearchParams();
  const kind = (sp.get("kind")?.toUpperCase() as ErrorKind) || "UNKNOWN";
  const detail = sp.get("detail") ?? undefined;
  const supportId = sp.get("supportId") ?? undefined;
  return <ErrorScreen kind={kind} detail={detail} supportId={supportId} />;
}
