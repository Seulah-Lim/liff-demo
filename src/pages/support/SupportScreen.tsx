import { Card } from "@shared/components";
import * as s from "./supportScreen.css";
import { app, container, content } from "@shared/css";

export default function SupportScreen() {
  return (
    <div className={container({ cta: true })}>
      <div className={app}>
        <main className={content}>
          <Card>
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
          </Card>

          <div className={s.fabSticky}>
            <div className={s.buttons}>
              <div className={s.btn}>제출하기</div>
              <a className={s.btnSecondary} href="#">
                고객센터 연결
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
