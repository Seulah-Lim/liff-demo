type DeviceBrowserType =
  | "liff-webview" // 라인 인앱 웹뷰
  | "mobile-webview" // 일반 앱 내장 웹뷰
  | "mobile-browser" // Safari/Chrome 같은 모바일 브라우저
  | "desktop-browser"; // 데스크톱 브라우저

export function deviceBrowserInfo(): DeviceBrowserType {
  const userAgent = navigator.userAgent;
  console.log("UserAgent:", userAgent); // 접속 시 UA 확인

  const ua = userAgent.toLowerCase();

  const isMobile =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);

  // iOS
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isWebKit = /applewebkit/.test(ua);
  const isSafari = /safari/.test(ua) || /version\/[\d.]+.*safari/.test(ua);
  const isNotCriOS = !/crios/.test(ua);
  const isNotFxiOS = !/fxios/.test(ua);

  const isIOSWebView =
    isIOS && isWebKit && isNotCriOS && isNotFxiOS && !isSafari;

  // Android
  const isAndroid = /android/.test(ua);
  const isAndroidWebView = isAndroid && /wv/.test(ua);

  // LIFF (LINE 인앱 웹뷰)
  const isLiff = /line\//.test(ua);

  if (isLiff) {
    return "liff-webview";
  } else if (isIOSWebView || isAndroidWebView) {
    return "mobile-webview";
  } else if (isMobile) {
    return "mobile-browser";
  } else {
    return "desktop-browser";
  }
}
