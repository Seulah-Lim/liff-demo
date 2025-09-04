// liff-geo-check.ts
import liff from "@line/liff";

export type GeoEnvIssue =
  | "NOT_SUPPORTED"
  | "INSECURE_CONTEXT"
  | "IOS_LIFF_HINT"
  | "ANDROID_LIFF_HINT"
  | null;

export async function preflightCheck(): Promise<{
  issue: GeoEnvIssue;
  message?: string;
}> {
  if (!("geolocation" in navigator)) {
    return {
      issue: "NOT_SUPPORTED",
      message: "이 브라우저는 위치 조회를 지원하지 않습니다.",
    };
  }
  if (!window.isSecureContext) {
    return {
      issue: "INSECURE_CONTEXT",
      message: "https 환경에서만 위치 권한을 요청할 수 있습니다.",
    };
  }

  try {
    // LIFF 환경 힌트 (선택)
    await liff.ready; // 이미 init을 했다면 ready만 기다리면 됨
    if (liff.isInClient()) {
      const os = liff.getOS();
      if (os === "ios")
        return {
          issue: "IOS_LIFF_HINT",
          message:
            "iOS 설정 > LINE > 위치 > '앱 사용 중에 허용'으로 변경 후 다시 시도해 주세요.",
        };
      if (os === "android")
        return {
          issue: "ANDROID_LIFF_HINT",
          message:
            "Android 설정 > 앱 > LINE > 권한 > 위치 '허용'으로 변경 후 다시 시도해 주세요.",
        };
    }
  } catch {
    // liff 미초기화거나 외부 브라우저인 경우는 무시
  }
  return { issue: null };
}
