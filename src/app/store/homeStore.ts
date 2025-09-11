import { create } from "zustand";

export type HomeView = "homehub" | "rent" | "borrowed" | "return";

type HomeStore = {
  lastView: HomeView | null;
  setView: (v: HomeView) => void;

  ensureViewOnce: (search: string) => void;
  _initialized: boolean;
};

export const useHomeViewStore = create<HomeStore>()((set, get) => ({
  lastView: null,
  _initialized: false,
  setView: (v) => set({ lastView: v }),
  ensureViewOnce: (search) => {
    //TODO api로 바꿀것
    if (get()._initialized) return;

    const curSearch = search ?? window.location.search;
    const sp = new URLSearchParams(curSearch);

    const found = sp.get("view");

    const cand = parseHomeView(found);
    if (cand) set({ lastView: cand });

    set({ _initialized: true });
  },
}));

export function parseHomeView(v: string | null): HomeView | null {
  if (v === "rent" || v === "borrowed" || v === "return") return v;
  if (v === "homehub") return "homehub";
  return null;
}
