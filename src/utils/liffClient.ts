import liff from "@line/liff";

let initPromise: Promise<void> | null = null;

export function ensureLiffInit() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const liffId: string = import.meta.env.VITE_LIFF_ID;

    if (!liffId) throw new Error("VITE_LIFF_ID가 .env에 없습니다.");
    await liff.init({
      liffId,
      withLoginOnExternalBrowser: false,
    });
    await liff.ready;
    //liff.isInClient(); liff 브라우저에서 실행되는지 여부
  })();
  return initPromise;
}

export { liff };
