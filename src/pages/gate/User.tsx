// src/app/useEnsureSession.ts
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useBidStore } from "../../app/store/bidStore";
import { useLiffStore } from "../../app/store/liffStore";

type Phase = "idle" | "loading" | "ok" | "error";
export type EnsureError =
  | { kind: "NOT_LIFF"; detail?: string }
  | { kind: "NO_USER"; detail?: string }
  | { kind: "UNKNOWN"; detail?: string }
  | { kind: "MISSING_BID"; detail?: string };

export function useEnsureSession() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [err, setErr] = useState<EnsureError | null>(null);
  const { search } = useLocation();
  const navigate = useNavigate();

  const initFromUrlOnce = useBidStore((s) => s.initFromUrlOnce);

  const { ready, isLoggedIn, init } = useLiffStore();
  const sp = useMemo(() => new URLSearchParams(search), [search]);
  const bid = sp.get("bid");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setPhase("loading");
      // 1) bid 체크
      if (!bid) {
        setErr({ kind: "MISSING_BID", detail: "필수 파라미터 'bid' 누락" });
        setPhase("error");
        return;
      }

      // 2) URL → 전역 저장(한 번만)
      initFromUrlOnce(search);

      // 3) liff.init (전역에 1회만)
      try {
        if (!ready) {
          await init();
          // if (!cancelled) setLiffReady(true);
        }
      } catch {
        setErr({ kind: "UNKNOWN", detail: "LIFF 초기화 실패" });
        setPhase("error");
        return;
      }

      // 4) 로그인 확인

      if (!isLoggedIn) {
        setErr({ kind: "NO_USER", detail: "로그인이 필요합니다" });
        setPhase("error");
        return;
      }

      if (!cancelled) setPhase("ok");
    })();

    return () => {
      cancelled = true;
    };
  }, [bid, initFromUrlOnce, search, ready, init, isLoggedIn]);

  // 실패 시 에러 라우트로 이동하는 헬퍼
  const redirectToError = (e: EnsureError) => {
    const map: Record<EnsureError["kind"], string> = {
      NOT_LIFF: "NOT_LIFF",
      NO_USER: "NO_USER",
      UNKNOWN: "UNKNOWN",
      MISSING_BID: "UNKNOWN",
    };
    const kind = map[e.kind] || "UNKNOWN";

    const q = new URLSearchParams({
      kind,
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
