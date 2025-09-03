type deviceBrowserType =
  | "mobile-webview"
  | "mobile-browser"
  | "desktop-browser";

export function deviceBrowserInfo(): deviceBrowserType {
  const userAgent = navigator.userAgent;

  const isMobile =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );

  // iOS 웹뷰 감지
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);
  const isWebKit = /AppleWebKit/.test(userAgent);
  const isSafari =
    /Safari/.test(userAgent) || /Version\/[\d.]+.*Safari/.test(userAgent); // Safari 또는 Version/{version}.Safari 패턴을 포함하지 않는 경우
  const isNotCriOS = !/CriOS/.test(userAgent);
  const isNotFxiOS = !/FxiOS/.test(userAgent);

  const isIOSWebView =
    isIOS && isWebKit && isNotCriOS && isNotFxiOS && !isSafari;

  // Android 웹뷰 감지
  const isAndroid = /Android/.test(userAgent);
  const isAndroidWebView = isAndroid && /wv/.test(userAgent);

  if (isIOSWebView || isAndroidWebView) {
    return "mobile-webview";
  } else if (isMobile) {
    return "mobile-browser";
  } else {
    return "desktop-browser";
  }
}
