// InUseNoticeScreen.tsx
import { useBidStore } from "@app/store/bidStore.ts";
import * as s from "./inUseNoticieScreen.css.ts";
import { useMemo } from "react";
import type { Station } from "@pages/home/ReturnExtendScreen.tsx";

export default function InUseNoticeScreen() {
  const IMAGE_URL = "https://i.postimg.cc/rpkz8RHV/OC-Image-1-1536x1025.webp";
  const bid = useBidStore((s) => s.bid);
  // 더미 데이터
  const nearbyStations: Station[] = useMemo(
    () => [
      {
        id: "ch-12",
        name: "City Hall #12",
        distance: "도보 2분",
        freeSlots: 3,
        totalSlots: 4,
      },
      {
        id: "lib-03",
        name: "Central Library #3",
        distance: "450m",
        freeSlots: 1,
        totalSlots: 4,
      },
      {
        id: "plz-07",
        name: "Main Plaza #7",
        distance: "도보 6분",
        freeSlots: 4,
        totalSlots: 4,
      },
    ],
    []
  );

  return (
    <div className={s.container}>
      <div className={s.app}>
        <main className={s.content}>
          {/* 1) 대여 불가 안내 + 배터리 정보 */}
          <section className={s.cardBusy}>
            <div className={s.banner}>
              <div className={s.iconCircle}>!</div>
              <div>
                <div style={{ fontWeight: 700 }}>지금은 대여할 수 없어요</div>
                <div className={s.meta}>
                  다른 사용자가 이 배터리를 사용 중입니다.
                </div>
              </div>
            </div>

            <img
              src={IMAGE_URL}
              alt="Battery preview"
              className={s.imageCover}
            />

            <div className={s.sep} />
            <div className={s.kv}>
              <div className={s.keyText}>모델</div>
              <div>OC Portable Battery</div>

              <div className={s.keyText}>배터리ID</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{bid ?? "-"}</span>
                <span className={s.pillBlue}>
                  <span className={s.dot} /> In use
                </span>
              </div>

              <div className={s.keyText}>스테이션</div>
              <div>City Hall #12</div>
            </div>
          </section>
          <section className={s.card}>
            <h3 className={s.cardTitle}>근처 스테이션</h3>
            <ul className={s.stationListMinimal} role="list">
              {nearbyStations.map((st) => (
                <li key={st.id} className={s.stationRow}>
                  <div className={s.stationMain}>
                    <div className={s.stationName}>{st.name}</div>
                    <div className={s.stationSub}>{st.distance}</div>
                  </div>
                  <div className={s.stationAside}>
                    <span
                      className={s.slotPill}
                      aria-label={`빈 슬롯 ${st.freeSlots}개 / 총 ${st.totalSlots}개`}
                    >
                      {st.freeSlots}/{st.totalSlots}
                    </span>

                    <button
                      className={s.disclosureBtn}
                      aria-hidden
                      tabIndex={-1}
                    >
                      <span aria-hidden>&gt;</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
