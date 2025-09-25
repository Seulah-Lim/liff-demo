// InUseNoticeScreen.tsx
import { useBidStore } from "@app/store/bidStore.ts";
import * as s from "./inUseNoticieScreen.css.ts";
import { useMemo } from "react";
import type { Station } from "@pages/home/ReturnExtendScreen.tsx";
import { Card } from "@shared/components/index.ts";
import { BatteryInfoCard, type BatteryInfo } from "@entities";

export default function InUseNoticeScreen() {
  const IMAGE_URL = "https://i.postimg.cc/rpkz8RHV/OC-Image-1-1536x1025.webp";
  const bid = useBidStore((s) => s.bid);
  // 더미 데이터
  const info: BatteryInfo = {
    model: "OC Portable Battery",
    bid,
    status: "RENTED_BY_OTHER",
    socPercent: 30,
    health: "poor",
    stationName: "City Hall #12",
    imageUrl: IMAGE_URL,
  };
  const nearbyStations: Station[] = useMemo(
    () => [
      {
        id: "mtx-01",
        name: "Motrex #1",
        distance: "도보 6분",
        freeSlots: 1,
        totalSlots: 4,
      },
      {
        id: "ch-12",
        name: "City Hall #12",
        distance: "도보 2분",
        freeSlots: 2,
        totalSlots: 4,
      },
      {
        id: "lib-03",
        name: "Central Library #3",
        distance: "450m",
        freeSlots: 3,
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
          <div className={s.banner}>
            <div className={s.iconCircle}>!</div>
            <div>
              <div style={{ fontWeight: 700 }}>지금은 대여할 수 없어요</div>
              <div className={s.meta}>
                다른 사용자가 이 배터리를 사용 중입니다.
              </div>
            </div>
          </div>

          <BatteryInfoCard data={info} />

          <Card title="스테이션 정보">
            <ul className={s.stationListMinimal} role="list">
              {nearbyStations.map((st) => {
                const freeSlots = st.freeSlots;
                const status =
                  freeSlots === 4
                    ? "없음"
                    : freeSlots === 3
                    ? "혼잡"
                    : freeSlots === 2
                    ? "보통"
                    : "여유";
                return (
                  <li key={st.id} className={s.stationRow}>
                    <div className={s.stationMain}>
                      <div className={s.stationName}>{st.name}</div>
                      <div className={s.stationSub}>
                        남은 자리 {st.freeSlots} / 전체 {st.totalSlots}
                      </div>
                    </div>
                    <div className={s.stationAside}>
                      <span
                        className={`${s.slotPill} ${s[`status_${status}`]}`}
                        aria-label={`남은 자리 ${st.freeSlots}개 / 전체 ${st.totalSlots}개 (${status})`}
                      >
                        {status}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </main>
      </div>
    </div>
  );
}
