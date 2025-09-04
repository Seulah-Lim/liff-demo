import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type BidStore = {
  bid: string | null; // bid를 없을 수도 있게 관리하는 게 안전함
  setBid: (b: string | null) => void;

  // 첫 진입 1회만 URL에서 bid 파싱
  initFromUrlOnce: (search?: string) => void;
  _initialized: boolean; // 중복 초기화 방지 플래그
};

//  스토어 생성 + persist로 감싸기
export const useBidStore = create<BidStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      bid: null,
      _initialized: false,

      setBid: (b) => set({ bid: b }),

      // URL에서 bid를 한 번만 파싱해 저장
      initFromUrlOnce: (search) => {
        if (get()._initialized) return; // 이미 했다면 스킵

        // search가 넘겨지면 그걸 쓰고, 아니면 window.location.search 사용
        const sp = new URLSearchParams(search ?? window.location.search);
        const incoming = sp.get("bid");

        if (incoming && incoming !== get().bid) {
          set({ bid: incoming });
        }
        set({ _initialized: true });
      },
    }),
    {
      // 저장소 키 이름(개발자 도구 Application 탭 > Storage에서 확인 가능)
      name: "bid-store",

      // sessionStorage(탭 닫으면 소멸), localStorage(영구 보관)
      storage: createJSONStorage(() => sessionStorage),

      // 저장할 필드만 선택적으로 저장(여기서는 bid만 보존)
      partialize: (state) => ({ bid: state.bid }),

      // ( 버전/마이그레이션도 가능:
      // version: 1,
      // migrate: (persistedState, version) => persistedState as BidStore,
    }
  )
);
