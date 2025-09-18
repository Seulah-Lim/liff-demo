import { create } from "zustand";
import liff from "@line/liff";
import type { Profile } from "@liff/get-profile";
import type { Context } from "@liff/store";

import { isTokenExpiredLike, now, toErrInfo } from "@shared/lib/liff/errors";

import { seedMockLogin } from "@shared/lib/liff/seedMockLogin";
import { initOnce } from "@shared/lib/liff/initOnce";
import { installPlugins } from "@shared/lib/liff/installPlugins";
import { buildLoginRedirectLink } from "@shared/lib/liff/buildLinks";
import type { LiffJWTPayload } from "@shared/types/liff_types";

type LiffActions = {
  init: (liffId: string) => Promise<void>;
  login: () => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  appendLog: (msg: string) => void;
  setReady: (isReady: boolean) => void;
};
type LiffState = {
  ready: boolean;
  isLoggedIn: boolean;
  profile: Profile | null;
  idToken: string | null;
  friendFlag: boolean;
  decodedIdToken: LiffJWTPayload | null;
  grantedScopes: string[];
  scopes: ("profile" | "chat_message.write" | "openid" | "email")[];
  error?: string;
  debugLogs: string[];
};
const enableMock = import.meta.env.DEV;

export const useLiffStore = create<LiffState & LiffActions>((set, get) => ({
  ready: false,
  isLoggedIn: false,
  profile: null,
  idToken: null,
  friendFlag: false,
  decodedIdToken: null,
  grantedScopes: [],
  scopes: [],
  debugLogs: [],

  setReady: (isReady: boolean) => set({ ready: isReady }),

  appendLog: (msg: string) =>
    set((s) => ({ debugLogs: [...s.debugLogs, `[${now()}] ${msg}`] })),

  init: async (liffId: string) => {
    const log = get().appendLog;

    try {
      installPlugins(enableMock, log);
      await initOnce({ liffId, enableMock });

      if (enableMock) {
        liff.login();
        seedMockLogin();
      }

      log("init:success");
    } catch (e) {
      const info = toErrInfo(e);
      console.warn(info.text, info.cause);
      get().appendLog(`init:error ${info.text}`);
      set({ ready: true, isLoggedIn: false, profile: null, idToken: null });
      return;
    }

    try {
      const logged = liff.isLoggedIn();

      if (!logged) {
        set({ ready: true, isLoggedIn: false, profile: null, idToken: null });

        return;
      }

      log("getProfile:begin");
      liff.getAccessToken();
      const p = await liff.getProfile();

      const profile: Profile = {
        displayName: p.displayName,
        userId: p.userId,
        pictureUrl: p.pictureUrl,
      };
      const idToken = liff.getIDToken();
      const decodedIdToken = liff.getDecodedIDToken() as LiffJWTPayload | null;

      const c: Context | null = liff.getContext();
      const scopes = c?.scope ?? [];

      const { friendFlag } = await liff.getFriendship(); //try-catch 분리
      set({
        ready: true,
        isLoggedIn: true,
        profile,
        idToken,
        friendFlag,
        decodedIdToken,
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
      }

      set({ ready: true, isLoggedIn: false, profile: null, idToken: null });
      log("state set (error but handled)");
    }
  },

  login: () => {
    try {
      const redirect = buildLoginRedirectLink();
      liff.login({ redirectUri: redirect });
    } catch (e) {
      console.log(`login failed : ${e?.toString()}`);
    }
  },

  logout: async () => {
    liff.logout();
    set({
      isLoggedIn: liff.isLoggedIn(),
      profile: null,
      idToken: null,
      error: undefined,
    });
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
