import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type BidStore = {
  bid: string | null;
  setBid: (b: string | null) => void;

  ensureBidOnce: (search?: string) => void;
  _initialized: boolean;
};

export const useBidStore = create<BidStore>()(
  persist(
    (set, get) => ({
      bid: null,
      _initialized: false,

      setBid: (b) => set({ bid: b }),

      ensureBidOnce: (search) => {
        if (get()._initialized) return;

        const curSearch = search ?? window.location.search;
        const sp = new URLSearchParams(curSearch);

        // 1) ?bid=1234 우선
        let found = sp.get("bid");

        // 2) liff.state=?bid=1234 또는 liff.state=/?bid=1234
        if (!found) {
          const state = sp.get("liff.state");
          if (state) {
            try {
              const url = new URL(state, "https://dummy.local");
              found = url.searchParams.get("bid") || null;
            } catch {
              /* noop */
            }
          }
        }

        // 3) 찾았으면 세션에 저장
        if (found && found !== get().bid) {
          set({ bid: found });
        }

        // 4) 초기화 완료 플래그 켜고 종료
        set({ _initialized: true });
      },
    }),
    {
      name: "bid-store",
      storage: createJSONStorage(() => sessionStorage), // 탭 생명주기 동안 유지
      partialize: (s) => ({ bid: s.bid }),
    }
  )
);
