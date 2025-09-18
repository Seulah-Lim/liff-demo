import ErrorScreen, { type ErrorKind } from "@pages/error/ErrorScreen";
import { useSearchParams } from "react-router";

export function ErrorRoute() {
  const [sp] = useSearchParams();
  const kind = (sp.get("kind") as ErrorKind) || "UNKNOWN";
  const detail = sp.get("detail") ?? undefined;
  const supportId = sp.get("supportId") ?? undefined;
  return <ErrorScreen kind={kind} detail={detail} supportId={supportId} />;
}
