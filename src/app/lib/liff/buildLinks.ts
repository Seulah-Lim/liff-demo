import liff from "@line/liff";
import { useBidStore } from "../../store/bidStore";
import { useHomeViewStore } from "../../store/homeStore";

const ENDPOINT = import.meta.env.VITE_LIFF_ENDPOINT_URL;
const LIFF_ID = import.meta.env.VITE_LIFF_ID;

const DEFAULT_KEEP_KEYS = ["bid", "view"] as const;
type KeepKey = (typeof DEFAULT_KEEP_KEYS)[number];

export async function buildRedirectLink(
  keepKeys: KeepKey[] = [...DEFAULT_KEEP_KEYS]
) {
  const base = new URL(ENDPOINT);
  const qs = keptParams(keepKeys);

  base.search = qs;
  console.log("[buildRedirectLink] result:", base.toString());

  return base.toString();
}

/**
 * 메인(Endpoint) 기준으로 bid/view 쿼리를 붙여
 * LIFF 영구링크를 생성
 * - 기본 경로: VITE_LIFF_ENDPOINT_URL
 * - 우선 시도: liff.permanentLink.createUrlBy()
 * - 폴백:  직접 조립
 */
export async function buildMainPermanentLink(
  keepKeys: KeepKey[] = [...DEFAULT_KEEP_KEYS]
) {
  const base = new URL(ENDPOINT);
  const qs = keptParams(keepKeys);

  base.search = qs;

  try {
    const res = await liff.permanentLink.createUrlBy(base.toString());
    if (typeof res === "string" && res.length > 0) return res;
  } catch {
    // ignore
  }

  return fallbackLink();
}

function fallbackLink(keepKeys: KeepKey[] = [...DEFAULT_KEEP_KEYS]) {
  const qs = keptParams(keepKeys);

  return `https://liff.line.me/${LIFF_ID}${qs ? `?${qs}` : ""}`;
}

function keptParams(keepKeys: KeepKey[] = ["bid", "view"]) {
  const p = new URLSearchParams();
  const { bid } = useBidStore.getState();
  const { lastView } = useHomeViewStore.getState();

  if (keepKeys.includes("bid") && bid) p.set("bid", bid);
  if (keepKeys.includes("view") && lastView) p.set("view", lastView);
  return p.toString();
}
