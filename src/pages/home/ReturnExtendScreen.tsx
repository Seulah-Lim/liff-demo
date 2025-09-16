import { useMemo } from "react";
import { useBidStore } from "@app/store/bidStore";
import * as s from "./returnExtendScreen.css";

export type Station = {
  id: string;
  name: string;
  distance: string; // 예: "도보 2분" / "350m"
  freeSlots: number; // 빈 슬롯 수
  totalSlots: number; // 전체 슬롯
};

export default function ReturnExtendScreen() {
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

  const expiresAtISO = "2025-09-02T18:30:00+09:00";
  const expiresAt = useMemo(() => new Date(expiresAtISO), []);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;

  return (
    <div className={s.container}>
      <div className={s.app}>
        <main className={s.content}>
          {/* 배터리 정보 */}
          <section className={s.card}>
            <img
              src={IMAGE_URL}
              alt="Battery preview"
              className={s.imageCover}
            />

            <div className={s.sep} />
            <div className={s.kv}>
              <div className={s.k}>모델</div>
              <div>OC Portable Battery</div>

              <div className={s.k}>배터리 ID</div>
              <div className={s.rowInline}>
                <span>{bid ?? "-"}</span>
                <span className={s.pill}>
                  <span className={s.dot} /> In use
                </span>
              </div>

              <div className={s.k}>대여 지점</div>
              <div>City Hall #12</div>
            </div>
          </section>

          <section className={s.card}>
            <h3 className={s.cardTitle}>반납 시간</h3>
            <div className={s.rowBetween}>
              <span className={s.meta}>만료 예정</span>
              <strong className={s.datetime}>{fmt(expiresAt)}</strong>
            </div>
          </section>

          <section className={s.card}>
            <h3 className={s.cardTitle}>가까운 반납 지점</h3>
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

          <div className={s.fabSticky}>
            <div className={s.buttons}>
              <a className={s.btn} href="#">
                반납하기
              </a>
              <a className={s.btnSecondary} href="#">
                연장하기
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
