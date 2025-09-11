// pages/gate/AppGate.tsx
import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { useBidStore } from "@app/store/bidStore";
import { useLiffStore } from "@app/store/liffStore";
import {
  useHomeViewStore,
  parseHomeView,
  type HomeView,
} from "@app/store/homeStore";
import LoadingScreen from "./Loading";

type Phase = "idle" | "loading" | "ok" | "error";
export type EnsureError =
  | { kind: "NOT_LIFF"; detail?: string }
  | { kind: "MISSING_BID"; detail?: string }
  | { kind: "NO_USER"; detail?: string }
  | { kind: "BATTERY_FETCH_FAILED"; detail?: string }
  | { kind: "UNKNOWN"; detail?: string };

// TODO: 서버 연동 시 실제 호출로 교체
async function fetchHomeStatus(): Promise<HomeView | null> {
  //  const res = await fetch("/api/home/status");
  // if (!res.ok) throw new Error("status fetch failed");
  // const data = await res.json();
  // return data.view as HomeView; // "rent" | "borrowed" | "return" | "home"
  return null; // 서버 미구현 상태에선 null 반환
}

function useEnsureSession() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [err, setErr] = useState<EnsureError | null>(null);

  const { search } = useLocation();
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();

  const ensureBidOnce = useBidStore((s) => s.ensureBidOnce);

  const { ready, isLoggedIn, init } = useLiffStore();

  const { lastView, setView } = useHomeViewStore();

  useEffect(() => {
    const href = `${location.pathname}${location.search}${location.hash}`;
    console.log("[ROUTE]", href, location);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setPhase("loading");

      // 1) 처음 한 번만 URL에서 bid 파싱 → 세션 저장
      ensureBidOnce(search);

      // 2) 이후엔 스토어 값만 신뢰
      if (!useBidStore.getState().bid) {
        setErr({ kind: "MISSING_BID", detail: "필수 파라미터 'bid' 누락" });
        setPhase("error");
        return;
      }

      // 3) liff.init (전역 1회)
      try {
        if (!ready) {
          await init();
        }
      } catch {
        setErr({ kind: "UNKNOWN", detail: "LIFF 초기화 실패" }); //TODO detail수정
        setPhase("error");
        return;
      }

      // 4) 로그인 확인
      if (ready && !isLoggedIn) {
        setErr({ kind: "NO_USER", detail: "로그인이 필요합니다" });
        setPhase("error");
        return;
      }

      // 5) 홈 상태 결정 (서버 → 쿼리 → 스토어 fallback) + 동기화
      try {
        let next: HomeView | null = null;

        // 5-1) 서버 조회 (미구현이면 null)
        try {
          const serverView = await fetchHomeStatus();
          if (serverView) next = serverView;
        } catch {
          // 서버 오류는 다음 단계로 넘겨서 fallback 처리
        }

        // 5-2) 쿼리 fallback
        if (!next) {
          const fromQuery = parseHomeView(sp.get("view"));
          if (fromQuery) {
            next = fromQuery;
          } else {
            setErr({
              kind: "BATTERY_FETCH_FAILED",
              detail: "view 누락",
            });
            setPhase("error");
            return;
          }
        }

        // 5-3) 스토어 fallback
        if (!next) {
          next = lastView;
        }

        // 스토어 반영
        setView(next);
      } catch (e) {
        setErr({
          kind: "BATTERY_FETCH_FAILED",
          detail: e instanceof Error ? e.message : "unknown",
        });
        setPhase("error");
        return;
      }

      if (!cancelled) setPhase("ok");
    })();

    return () => {
      cancelled = true;
    };
  }, [
    ensureBidOnce,
    search,
    ready,
    init,
    isLoggedIn,
    lastView,
    setView,
    sp,
    setSp,
  ]);

  const redirectToError = (e: EnsureError) => {
    const q = new URLSearchParams({
      kind: e.kind,
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
