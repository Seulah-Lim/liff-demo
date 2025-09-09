import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useBidStore } from "../../app/store/bidStore";
import type { ErrorKind } from "../error/ErrorScreen";
import LoadingScreen from "./Loading";
import { useLiffStore } from "../../app/store/liffStore";

// 앱 내부 경로 상수
const PATHS = {
  HOME: "/home",
  ERROR: "/error",
} as const;

type InitPhase = "idle" | "loading" | "success" | "error";

export default function StartupGate() {
  const loc = useLocation();
  const navigate = useNavigate();
  const initFromUrlOnce = useBidStore((s) => s.ensureBidOnce);

  const [phase, setPhase] = useState<InitPhase>("idle");
  const [error, setError] = useState<{
    kind: ErrorKind;
    detail?: string;
    supportId?: string;
  }>();

  const { init, isLoggedIn } = useLiffStore();

  // URL에서 bid 파라미터 추출(스토어에 넣는 건 기존 로직 유지)
  const search = loc.search;
  const urlParams = useMemo(() => new URLSearchParams(search), [search]);
  const bidFromUrl = urlParams.get("bid");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setPhase("loading");

      try {
        // 1) URL에 bid 없으면 에러
        if (!bidFromUrl) {
          setPhase("error");
          setError({
            kind: "UNKNOWN",
            detail: "필수 파라미터 'bid'가 없습니다.",
            supportId: makeSupportId("NO_BID"),
          });
          return;
        }

        // 2) 앱 진입 시 한 번만 URL 파싱 → 전역 저장
        initFromUrlOnce(search);

        // 3) LIFF Init

        try {
          await init();
        } catch {
          setPhase("error");
          setError({
            kind: "UNKNOWN",
            detail: "LIFF 초기화에 실패했습니다.",
            supportId: makeSupportId("LIFF_INIT_FAIL"),
          });
          return;
        }

        // 4) 로그인 검사
        if (!isLoggedIn) {
          setPhase("error");
          setError({
            kind: "NO_USER",
            detail: "로그인이 필요합니다. LINE에서 다시 열어주세요.",
            supportId: makeSupportId("NO_LOGIN"),
          });
          return;
        }

        // 5) 여기까지 문제 없으면 홈으로
        if (!cancelled) {
          setPhase("success");
          navigate(PATHS.HOME, { replace: true });
        }
      } catch {
        setPhase("error");
        setError({
          kind: "UNKNOWN",
          detail: "예기치 못한 오류가 발생했습니다.",
          supportId: makeSupportId("UNEXPECTED"),
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [bidFromUrl, initFromUrlOnce, navigate, search, init, isLoggedIn]);

  // 상태별 렌더링
  if (phase === "loading" || phase === "idle") {
    return <LoadingScreen />;
  }

  if (phase === "error" && error) {
    // 에러 화면으로 리디렉션(쿼리로 넘겨도 되고 state로 넘겨도 됨)
    const q = new URLSearchParams({
      kind: error.kind,
      ...(error.detail ? { detail: error.detail } : {}),
      ...(error.supportId ? { supportId: error.supportId } : {}),
    });
    // replace: true 로 히스토리 정리
    navigate(`${PATHS.ERROR}?${q.toString()}`, { replace: true });
    return null;
  }

  // success면 위에서 홈으로 navigate 했으니 여기선 null
  return null;
}

function makeSupportId(code: string) {
  const ts = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);
  return `ERR-${code}-${ts}`;
}
