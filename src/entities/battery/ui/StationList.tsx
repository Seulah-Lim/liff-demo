import type { Station } from "@pages/home/ReturnExtendScreen";
import * as s from "./stationList.css";
import { useMemo } from "react";

export function StationList() {
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
  );
}
