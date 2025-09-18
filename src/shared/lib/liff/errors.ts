export const now = () => new Date().toLocaleTimeString();
export type LiffErrorLike =
  | { code?: string; message?: string; cause?: unknown }
  | unknown;

export const isLiffError = (
  e: LiffErrorLike
): e is { code?: string; message?: string; cause?: unknown } =>
  typeof e === "object" && e !== null && ("code" in e || "message" in e);

export const toErrInfo = (e: LiffErrorLike) => {
  if (isLiffError(e)) {
    const code = typeof e.code === "string" ? e.code : undefined;
    const message = typeof e.message === "string" ? e.message : undefined;
    const cause = e.cause;
    return {
      code,
      message,
      cause,
      text: `[LIFF] code=${code ?? "?"} message=${message ?? "?"} cause : ${
        cause ?? "?"
      }`,
    };
  }
  return {
    code: undefined,
    message: undefined,
    cause: undefined,
    text: String(e),
  };
};

// export const isTokenExpiredLike = (code?: string, message?: string) => {
//   if (code === "UNAUTHORIZED" || code === "INVALID_ID_TOKEN" || code === "401")
//     return true;
//   if (!message) return false;
//   const m = message.toLowerCase();
//   return (
//     m.includes("access token expired") ||
//     m.includes("token expired") ||
//     m.includes("jwt expired")
//   );
// };

export function isTokenExpiredLike(code?: string, message?: string) {
  const c = (code ?? "").toLowerCase();
  const m = (message ?? "").toLowerCase();

  // LINE에서 흔한 코드/문구들
  if (
    c === "invalid_request" &&
    (m.includes("revoked") || m.includes("access token"))
  )
    return true;
  if (c === "invalid_grant" || c === "unauthorized" || c === "e_auth")
    return true;

  // 메시지 기반 보강
  if (
    m.includes("token") &&
    (m.includes("expired") || m.includes("invalid") || m.includes("revoked"))
  )
    return true;

  return false;
}
