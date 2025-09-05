import * as s from "./rentScreen.css.ts";

export default function RentScreen() {
  const IMAGE_URL =
    "https://www.okamura.com/wp-content/uploads/2025/04/OC_Image_1.webp";

  return (
    <div className={s.container}>
      <div className={s.app}>
        <div className={s.appbar}>대여</div>

        <main className={s.content}>
          <section className={s.card}>
            <h3>배터리 정보</h3>
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
                <span>#12345</span>
                <span className={`${s.pill} ${s.pillGreen}`}>
                  <span className={s.dot} /> Available
                </span>
              </div>

              <div className={s.k}>충전량</div>
              <div>85%</div>

              <div className={s.k}>스테이션</div>
              <div>City Hall #12</div>
            </div>
          </section>

          <section className={s.card}>
            <h3>시간 선택</h3>
            <div className={s.chips}>
              <div className={s.chip}>
                <input
                  className={s.chipInput}
                  type="radio"
                  name="t"
                  id="t30"
                  defaultChecked
                />
                <label className={s.chipLabel} htmlFor="t30">
                  30분
                </label>
              </div>
              <div className={s.chip}>
                <input className={s.chipInput} type="radio" name="t" id="t60" />
                <label className={s.chipLabel} htmlFor="t60">
                  1시간
                </label>
              </div>
              <div className={s.chip}>
                <input
                  className={s.chipInput}
                  type="radio"
                  name="t"
                  id="t120"
                />
                <label className={s.chipLabel} htmlFor="t120">
                  2시간
                </label>
              </div>
              <div className={s.chip}>
                <input
                  className={s.chipInput}
                  type="radio"
                  name="t"
                  id="tCustom"
                />
                <label className={s.chipLabel} htmlFor="tCustom">
                  맞춤
                </label>
              </div>
            </div>

            <div className={s.sep} />
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 14,
              }}
            >
              <input type="checkbox" defaultChecked />
              <span className={s.small}>약관에 동의합니다</span>
            </label>
          </section>

          <section className={s.card} style={{ padding: 16 }}>
            <div className={s.buttons}>
              <a className={s.btn} href="#">
                대여하기
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
