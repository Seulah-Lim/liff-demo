import liff from "@line/liff";
import { useBidStore } from "@app/store/bidStore";
import { useHomeViewStore } from "@app/store/homeStore";
import { getLiffId } from "@shared/const/liff_id";

const ENDPOINT = import.meta.env.VITE_LIFF_ENDPOINT_URL;

const DEFAULT_KEEP_KEYS = ["bid", "view"] as const;
type KeepKey = (typeof DEFAULT_KEEP_KEYS)[number];

export function buildLoginRedirectLink(
  keepKeys: KeepKey[] = [...DEFAULT_KEEP_KEYS]
) {
  const base = new URL(ENDPOINT, location.origin);

  // 쿼리 전부 초기화하고 우리가 원하는 순서로 채움
  const sp = new URLSearchParams();
  const liffId = getLiffId();
  if (liffId) sp.set("liffId", liffId);

  const kept = keptParams(keepKeys); // "bid=1234&view=rent" 같은 문자열
  if (kept) {
    for (const [k, v] of new URLSearchParams(kept).entries()) {
      sp.set(k, v);
    }
  }

  base.search = sp.toString();

  const result = base.toString();
  console.log("liffId", liffId); //null찓림
  console.log("[buildRedirectLink] result:", result);
  return result;
}

export async function buildMainPermanentLink(
  keepKeys: KeepKey[] = [...DEFAULT_KEEP_KEYS]
) {
  const qs = keptParams(keepKeys);
  const liffId = getLiffId();

  const res = `https://liff.line.me/${liffId}?liffId=${liffId}${
    qs ? `&${qs}` : ""
  }`;
  console.log("buildMainPermanentLink : ", res);
  return res;
}

export async function buildPermanentLink() {
  const base = new URL(ENDPOINT);

  const res = await liff.permanentLink.createUrlBy(base.toString());
  if (typeof res === "string" && res.length > 0) {
    console.log("buildPermanentLink : ", res);
    return res;
  }
}

function keptParams(keepKeys: KeepKey[] = ["bid", "view"]) {
  const p = new URLSearchParams();
  const { bid } = useBidStore.getState();
  const { lastView } = useHomeViewStore.getState();

  if (keepKeys.includes("bid") && bid) p.set("bid", bid);
  if (keepKeys.includes("view") && lastView) p.set("view", lastView);
  return p.toString();
}
