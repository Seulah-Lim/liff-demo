type DeviceBrowserType =
  | "liff-webview" // 라인 인앱 웹뷰
  | "mobile-webview" // 일반 앱 내장 웹뷰
  | "mobile-browser" // Safari/Chrome 같은 모바일 브라우저
  | "desktop-browser"; // 데스크톱 브라우저

export function deviceBrowserInfo(): DeviceBrowserType {
  const userAgent = navigator.userAgent;

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

  // const ua = navigator.userAgent;

  // const isLine = /Line\/\d+/i.test(ua);
  // const isLIFF = /LIFF/i.test(ua);
  // const isAndroid = /Android/i.test(ua);
  // const isAndroidWV = /\bwv\b/i.test(ua); // 안드로이드 WebView 특징

  // let kind:
  //   | "liff-webview"
  //   | "line-iab-webview"
  //   | "mobile-webview"
  //   | "mobile-browser"
  //   | "desktop-browser";

  // if (isLine && isLIFF) {
  //   kind = "liff-webview";
  // } else if (isLine) {
  //   // 라인 인앱 브라우저(IAB)
  //   kind = "line-iab-webview"; // 필요 없으면 "mobile-webview"로 통합
  // } else if (isAndroid && isAndroidWV) {
  //   kind = "mobile-webview";
  // } else if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
  //   kind = "mobile-browser";
  // } else {
  //   kind = "desktop-browser";
  // }
}
