// InUseNoticeScreen.tsx
import { useBidStore } from "../../app/store/bidStore.ts";
import * as s from "./inUseNoticieScreen.css.ts";

export default function InUseNoticeScreen() {
  const IMAGE_URL = "https://i.postimg.cc/rpkz8RHV/OC-Image-1-1536x1025.webp";
  const bid = useBidStore((s) => s.bid);

  return (
    <div className={s.container}>
      <div className={s.app}>
        <main className={s.content}>
          {/* 1) 대여 불가 안내 + 배터리 정보 */}
          <section className={s.card}>
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

          {/* 2) 근처 스테이션 */}
          <section className={s.card}>
            <h3 className={s.cardTitle}>근처 스테이션</h3>
            <div className={s.stations}>
              <div className={s.station}>
                <div className={s.statLeft}>
                  <div className={s.statName}>Library West</div>
                  <div className={s.statMeta}>
                    <span>240m</span>
                    <span>·</span>
                    <span>B1 스테이션</span>
                  </div>
                </div>
                <span className={s.availGood}>여유</span>
              </div>

              <div className={s.station}>
                <div className={s.statLeft}>
                  <div className={s.statName}>Food Court</div>
                  <div className={s.statMeta}>
                    <span>350m</span>
                    <span>·</span>
                    <span>2층 중앙</span>
                  </div>
                </div>
                <span className={s.availMid}>보통</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
