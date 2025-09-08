import { create } from "zustand";
import { liff } from "../../utils/liffClient";
import type { Profile } from "@liff/get-profile";
import type { Context } from "@liff/store";
import LIFFInspectorPlugin from "@line/liff-inspector";
import type {
  LiffActions,
  LiffJWTPayload,
  LiffState,
  LiffErrorLike,
} from "../../shared/types/liff_types";
//import LiffMockPlugin from "@line/liff-mock";
export type LiffContext = NonNullable<ReturnType<typeof liff.getContext>>;

function now() {
  return new Date().toLocaleTimeString();
}

const isLiffError = (
  e: LiffErrorLike
): e is { code?: string; message?: string; cause?: unknown } => {
  return typeof e === "object" && e !== null && ("code" in e || "message" in e);
};

const toErrInfo = (e: LiffErrorLike) => {
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

const isTokenExpiredLike = (code?: string, message?: string) => {
  if (code === "UNAUTHORIZED" || code === "INVALID_ID_TOKEN" || code === "401")
    return true;
  if (!message) return false;
  const m = message.toLowerCase();
  return (
    m.includes("access token expired") ||
    m.includes("token expired") ||
    m.includes("jwt expired")
  );
};

export const useLiffStore = create<LiffState & LiffActions>((set, get) => ({
  ready: false,
  isLoggedIn: false,
  profile: null,
  idToken: null,
  debugLogs: [],
  decodedIdToken: null,
  grantedScopes: [],
  scopes: [],

  appendLog: (msg: string) =>
    set((s) => ({ debugLogs: [...s.debugLogs, `[${now()}] ${msg}`] })),

  init: async () => {
    const log = get().appendLog;
    try {
      log("init:start");

      const liffId: string = import.meta.env.VITE_LIFF_ID!;
      if (!liffId) throw new Error("VITE_LIFF_ID is empty");

      //liff.use(new LiffMockPlugin());
      if (window.location.search.includes("li.origin")) {
        liff.use(new LIFFInspectorPlugin());
        log("init:use LIFFInspectorPlugin");
      }
      const initOnce = () =>
        new Promise<void>((resolve, reject) => {
          try {
            liff.init(
              {
                liffId,
                withLoginOnExternalBrowser: true,
                //mock: true
              },
              () => resolve(),
              (err) => reject(err)
            );
          } catch (e) {
            reject(e);
          }
        });

      await initOnce();
      log("init:success");
    } catch (e) {
      const info = toErrInfo(e);
      console.warn(info.text, info.cause);
      log(`init:error ${info.text}`);
      set({ ready: true, isLoggedIn: false, profile: null, idToken: null });
      return;
    }

    try {
      const logged = liff.isLoggedIn();
      log(`isLoggedIn:${logged}`);

      if (!logged) {
        set({ ready: true, isLoggedIn: false, profile: null, idToken: null });
        log("state set (not logged in)");
        return;
      }

      // 로그인이라면 프로필 시도
      log("getProfile:begin");
      const p = await liff.getProfile();

      const profile: Profile = {
        displayName: p.displayName,
        userId: p.userId,
        pictureUrl: p.pictureUrl,
      };
      const idToken = liff.getIDToken();
      const decodedIdToken = liff.getDecodedIDToken() as LiffJWTPayload | null;

      const grantedScopes = await liff.permission.getGrantedAll();

      const c: Context | null = liff.getContext();
      const scopes = c?.scope;
      set({
        ready: true,
        isLoggedIn: true,
        profile,
        idToken,
        decodedIdToken,
        grantedScopes,
        scopes,
      });
      log("getProfile:done; state set (logged in)");
    } catch (e) {
      const info = toErrInfo(e);
      console.warn(info.text, info.cause);
      log(`profile:error ${info.text}`);

      if (isTokenExpiredLike(info.code, info.message)) {
        log("token expired → logout & reset state");
        liff.logout();
        set({ ready: true, isLoggedIn: false, profile: null, idToken: null });
        log("state set (logged out due to token)");
        return;
      }
      set({ ready: true, isLoggedIn: false, profile: null, idToken: null });
      log("state set (error but handled)");
      return;
    }
  },

  login: async () => {
    liff.login();
  },

  logout: async () => {
    liff.logout();
    set({ isLoggedIn: false, profile: null, idToken: null, error: undefined });
  },
  refreshIdToken: () => set({ idToken: liff.getIDToken() ?? null }),

  refreshProfile: async () => {
    if (!liff.isLoggedIn()) return;
    const p: Profile = await liff.getProfile();
    set({
      profile: {
        displayName: p.displayName,
        userId: p.userId,
        pictureUrl: p.pictureUrl,
      },
    });
  },
}));
