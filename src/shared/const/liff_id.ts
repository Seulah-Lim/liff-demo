declare global {
  interface Window {
    __PUBLIC_CONFIG?: { liffId?: string };
  }
}

export function getLiffId(): string | null {
  const fromSession = sessionStorage.getItem("__liff_id");
  if (fromSession) return fromSession;

  const fromConfig = window.__PUBLIC_CONFIG?.liffId;
  if (fromConfig) return fromConfig;

  if (import.meta.env.DEV) {
    const devId = import.meta.env.VITE_DEV_LIFF_ID;
    if (devId) {
      sessionStorage.setItem("__liff_id", devId);
      return devId;
    }
  }

  return null;
}

const ALLOWED_LIFF_IDS = new Set([
  "2008073307-WzV16bo0", //liff-demo
  "2008073307-1aZEzYn5", //liff-demo2
  "2008002745-KgmzwRd4", //m
]);

export function isAllowedLiffId(id: string) {
  return ALLOWED_LIFF_IDS.has(id);
}
