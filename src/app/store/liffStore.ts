import { create } from "zustand";
import { ensureLiffInit, liff } from "../../utils/liffClient";
import type { Profile } from "@liff/get-profile";
type LiffState = {
  ready: boolean;
  isLoggedIn: boolean;
  profile: Profile | null;
  idToken: string | null;
  error?: string;
};
type LiffActions = {
  init: () => Promise<void>;
  login: () => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

export const useLiffStore = create<LiffState & LiffActions>((set) => ({
  ready: false,
  isLoggedIn: false,
  profile: null,
  idToken: null,

  init: async () => {
    try {
      await ensureLiffInit();
      const logged = liff.isLoggedIn();
      let profile: Profile | null = null;
      if (logged) {
        const p: Profile = await liff.getProfile();
        profile = {
          displayName: p.displayName,
          userId: p.userId,
          pictureUrl: p.pictureUrl,
        };
      }

      const idToken = logged ? liff.getIDToken() ?? null : null; // 로그인시로 바꿀예정
      set({
        ready: true,
        isLoggedIn: logged,
        profile,
        idToken,
        error: undefined,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      set({
        ready: true,
        isLoggedIn: false,
        profile: null,
        idToken: null,
        error: message ?? "LIFF 초기화 실패",
      });
    }
  },

  login: async () => {
    await ensureLiffInit();
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
