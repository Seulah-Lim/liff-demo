import { create } from "zustand";
import { liff } from "../../utils/liffClient";
import type { Profile } from "@liff/get-profile";
import LIFFInspectorPlugin from "@line/liff-inspector";

type LiffState = {
  ready: boolean;
  isLoggedIn: boolean;
  profile: Profile | null;
  idToken: string | null;
  error?: string;
  debugLogs: string[];
};

type LiffActions = {
  init: () => Promise<void>;
  login: () => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  appendLog: (msg: string) => void;
};

function now() {
  return new Date().toLocaleTimeString();
}

export const useLiffStore = create<LiffState & LiffActions>((set, get) => ({
  ready: false,
  isLoggedIn: false,
  profile: null,
  idToken: null,
  debugLogs: [],

  appendLog: (msg: string) =>
    set((s) => ({ debugLogs: [...s.debugLogs, `[${now()}] ${msg}`] })),
  init: async () => {
    const log = get().appendLog;

    // 전역 오류 로그 수집
    // window.addEventListener("error", (e) => log(`window.error: ${e.message}`));
    // window.addEventListener("unhandledrejection", (e) =>
    //   log(`unhandledrejection: ${String((e as PromiseRejectionEvent).reason)}`)
    // );

    try {
      log("init:start");
      const liffId: string = import.meta.env.VITE_LIFF_ID;
      if (!liffId) throw new Error("VITE_LIFF_ID is empty");
      liff.use(new LIFFInspectorPlugin());
      const initOnce = () =>
        new Promise<void>((resolve, reject) => {
          try {
            liff.init(
              { liffId, withLoginOnExternalBrowser: false },
              () => {
                log("init:success callback");
                resolve();
              },
              (err) => {
                log(`init:error callback ${String(err)}`);
                reject(err);
              }
            );
          } catch (e) {
            reject(e);
          }
        });

      await initOnce();

      log("ensureLiffInit done");

      const logged = liff.isLoggedIn();
      log(`isLoggedIn: ${logged}`);

      let profile: Profile | null = null;
      let idToken: string | null = null;
      if (logged) {
        log("getProfile begin");
        const p = await liff.getProfile();
        profile = {
          displayName: p.displayName,
          userId: p.userId,
          pictureUrl: p.pictureUrl,
        };

        idToken = liff.getIDToken();

        log("getProfile done");
      }

      set({
        ready: true,
        isLoggedIn: logged,
        profile,
        idToken,
      });
      log("state set: ready=true");
    } catch (e) {
      log(`init:error:${String(e)}`);
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
