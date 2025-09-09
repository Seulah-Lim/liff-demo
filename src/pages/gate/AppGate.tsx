import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useBidStore } from "../../app/store/bidStore";
import { useLiffStore } from "../../app/store/liffStore";
import LoadingScreen from "./Loading";

type Phase = "idle" | "loading" | "ok" | "error";
export type EnsureError =
  | { kind: "NOT_LIFF"; detail?: string }
  | { kind: "NO_USER"; detail?: string }
  | { kind: "UNKNOWN"; detail?: string }
  | { kind: "MISSING_BID"; detail?: string };

function useEnsureSession() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [err, setErr] = useState<EnsureError | null>(null);

  const { search } = useLocation();
  const navigate = useNavigate();

  const ensureBidOnce = useBidStore((s) => s.ensureBidOnce);

  const { ready, isLoggedIn, init } = useLiffStore();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setPhase("loading");

      // A) 초회 한 번만 URL에서 bid 파싱 → 세션 저장
      ensureBidOnce(search);

      // B) 이후엔 스토어 값만 신뢰
      if (!useBidStore.getState().bid) {
        setErr({ kind: "MISSING_BID", detail: "필수 파라미터 'bid' 누락" });
        setPhase("error");
        return;
      }

      // C) liff.init (전역 1회)
      try {
        if (!ready) {
          await init();
        }
      } catch {
        setErr({ kind: "UNKNOWN", detail: "LIFF 초기화 실패" });
        setPhase("error");
        return;
      }

      // D) 로그인 확인
      if (ready && !isLoggedIn) {
        setErr({ kind: "NO_USER", detail: "로그인이 필요합니다" });
        setPhase("error");
        return;
      }

      if (!cancelled) setPhase("ok");
    })();

    return () => {
      cancelled = true;
    };
  }, [ensureBidOnce, search, ready, init, isLoggedIn]);

  const redirectToError = (e: EnsureError) => {
    const q = new URLSearchParams({
      kind:
        e.kind === "NO_USER"
          ? "NO_USER"
          : e.kind === "NOT_LIFF"
          ? "NOT_LIFF"
          : "UNKNOWN",
      ...(e.detail ? { detail: e.detail } : {}),
      supportId: makeSupportId(e.kind),
    });
    navigate(`/error?${q.toString()}`, { replace: true });
  };

  return { phase, err, redirectToError };
}

function makeSupportId(code: string) {
  const ts = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);
  return `ERR-${code}-${ts}`;
}

export default function AppGate() {
  const { phase, err, redirectToError } = useEnsureSession();

  useEffect(() => {
    if (phase === "error" && err) {
      redirectToError(err);
    }
  }, [phase, err, redirectToError]);

  if (phase === "idle" || phase === "loading") {
    return <LoadingScreen />;
  }

  // phase === "ok"
  return (
    <div style={{ display: "flex" }}>
      <Outlet />
    </div>
  );
}
