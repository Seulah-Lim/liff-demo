import { useBidStore } from "../../app/store/bidStore";
import * as s from "./returnExtendScreen.css";

export default function ReturnExtendScreen() {
  const IMAGE_URL = "https://i.postimg.cc/rpkz8RHV/OC-Image-1-1536x1025.webp";
  const bid = useBidStore((s) => s.bid);

  return (
    <div className={s.container}>
      <div className={s.app}>
        <main className={s.content}>
          {/* 1) 배터리 정보 */}
          <section className={s.card}>
            <h3 className={s.cardTitle}>배터리 정보</h3>

            <img
              src={IMAGE_URL}
              alt="Battery preview"
              className={s.imageCover}
            />

            <div className={s.sep} />
            <div className={s.kv}>
              <div className={s.k}>모델</div>
              <div>OC Portable Battery</div>

              <div className={s.k}>배터리ID</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{bid ?? "-"}</span>
                <span className={s.pill}>
                  <span className={s.dot} /> In use
                </span>
              </div>

              <div className={s.k}>충전량</div>
              <div>85%</div>

              <div className={s.k}>스테이션</div>
              <div>City Hall #12</div>
            </div>
          </section>

          {/* 2) 반납 시간 */}
          <section className={s.card}>
            <h3 className={s.cardTitle}>반납 시간</h3>
            <div className={s.row}>
              <span className={s.meta}>만료 예정</span>
              <strong>2025-09-02 18:30</strong>
            </div>
          </section>

          {/* 3) 액션 버튼 */}
          <section className={s.card} style={{ padding: 16 }}>
            <div className={s.buttons}>
              <a className={s.btn} href="#">
                반납하기
              </a>
              <a className={s.btnSecondary} href="#">
                연장하기
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
