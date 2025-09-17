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

  return null;
}
