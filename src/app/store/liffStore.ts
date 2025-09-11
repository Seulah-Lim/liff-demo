import { create } from "zustand";
import liff from "@line/liff";
import type { Profile } from "@liff/get-profile";
import type { Context } from "@liff/store";

import { isTokenExpiredLike, now, toErrInfo } from "@shared/api/liff/errors";

import { seedMockLogin } from "@shared/api/liff/seedMockLogin";
import { initOnce } from "@shared/api/liff/initOnce";
import { installPlugins } from "@shared/api/liff/installPlugins";
import { buildRedirectLink } from "@shared/api/liff/buildLinks";
import type { LiffJWTPayload, LiffState } from "@shared/types/liff_types";

export type LiffActions = {
  init: () => Promise<void>;
  login: () => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  appendLog: (msg: string) => void;
};

const enableMock = import.meta.env.DEV;

export const useLiffStore = create<LiffState & LiffActions>((set, get) => ({
  ready: false,
  isLoggedIn: false,
  profile: null,
  idToken: null,
  decodedIdToken: null,
  grantedScopes: [],
  scopes: [],
  debugLogs: [],

  appendLog: (msg: string) =>
    set((s) => ({ debugLogs: [...s.debugLogs, `[${now()}] ${msg}`] })),

  init: async () => {
    const log = get().appendLog;

    try {
      const liffId: string = import.meta.env.VITE_LIFF_ID!;
      if (!liffId) throw new Error("VITE_LIFF_ID is empty");

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
      set({
        ready: true,
        isLoggedIn: true,
        profile,
        idToken,
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

  login: async () => {
    try {
      const redirect = await buildRedirectLink();
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
