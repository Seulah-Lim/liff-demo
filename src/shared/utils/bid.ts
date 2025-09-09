export function getBidFromLocation(): string | null {
  // 1) 일반 쿼리에서 먼저 시도
  const url = new URL(window.location.href);
  const directBid = url.searchParams.get("bid");
  if (directBid) return directBid;

  // 2) LIFF 진입 시에는 bid가 liff.state로 들어가 있을 수 있음
  const state = url.searchParams.get("liff.state");
  if (state) {
    try {
      // state 예: "/?bid=123456" 또는 "/batteryInfo?bid=123456"
      const stateUrl = new URL(state, window.location.origin);
      return stateUrl.searchParams.get("bid");
    } catch {
      // 혹시 상대경로 파싱 실패 대비
    }
  }
  return null;
}

/** 경로 이동 시 현재 bid를 보존해서 URL 생성 */
export function buildUrlWithBid(pathname: string, bid: string | null) {
  const u = new URL(pathname, window.location.origin);
  if (bid) u.searchParams.set("bid", bid);
  // BrowserRouter basename("/liff-demo/") 사용 중이면 상대 경로 이동을 권장
  return `${u.pathname}${u.search}${u.hash}`;
}
