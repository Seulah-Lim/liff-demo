import * as s from "./supportScreen.css";

export default function SupportScreen() {
  return (
    <div className={s.container}>
      <div className={s.app}>
        <main className={s.content}>
          <section className={s.card}>
            <div className={s.label}>사유</div>
            <textarea
              className={s.textarea}
              placeholder="예: 충전이 안돼요 / 분실했습니다 등"
            />

            <div className={s.sep} />

            <div className={s.label}>사진 업로드</div>
            <div className={s.file}>
              <input
                className={s.input}
                type="file"
                accept="image/*"
                capture="environment"
              />
            </div>

            <div className={s.hint}>
              장소·상태가 보이도록 촬영해주세요. (개인정보 노출 주의)
            </div>
          </section>

          <section className={s.card}>
            <div className={s.buttonsTwo}>
              <a className={s.btn} href="#">
                제출
              </a>
              <a className={s.btnSecondary} href="#">
                고객센터 연결
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
