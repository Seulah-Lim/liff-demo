import { create } from "zustand";

export type HomeView = "homehub" | "rent" | "borrowed" | "return" | null;

type State = {
  lastView: HomeView;
};
type Actions = {
  setView: (v: HomeView) => void;
};

export const useHomeViewStore = create<State & Actions>((set) => ({
  lastView: null,
  setView: (v) => set({ lastView: v }),
}));

export function parseHomeView(v: string | null): HomeView | null {
  if (v === "rent" || v === "borrowed" || v === "return") return v;
  if (v === "homehub") return "homehub";
  return null;
}
