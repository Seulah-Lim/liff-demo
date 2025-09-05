import * as s from "./returnGuideScreen.css";

export default function ReturnGuideScreen() {
  return (
    <div className={s.container}>
      <div className={s.app}>
        <div className={s.appbar}>반납 안내</div>
        <main className={s.content}>
          <section className={s.card}>
            <h3>반납 방법 안내</h3>
            <ol
              className={s.list}
              style={{ listStyle: "decimal", paddingLeft: 18 }}
            >
              <li>스테이션에 배터리를 꽂아주세요.</li>
              <li>지시등이 점등되면 반납이 완료됩니다.</li>
              <li>문제가 있으면 신고/고객지원으로 연결하세요.</li>
            </ol>
            <div className={s.hint}>
              개인 위치 정보는 서버에 저장되지 않습니다.
            </div>
          </section>

          <section className={s.card}>
            <h3>반납 지점 안내</h3>
            <div className={s.map}>미니 지도(썸네일 또는 캡처 영역)</div>
            <div className={s.sep} />

            <div className={s.list}>
              <div className={s.item}>
                <div>
                  <div>
                    <strong>City Hall #12</strong>
                  </div>
                  <div className={s.sub}>120m · 1층 카운터</div>
                </div>
                <span className={s.badge}>여유 있음</span>
              </div>

              <div className={s.item}>
                <div>
                  <div>
                    <strong>Library West</strong>
                  </div>
                  <div className={s.sub}>240m · B1 스테이션</div>
                </div>
                <span className={s.badge}>보통</span>
              </div>

              <div className={s.item}>
                <div>
                  <div>
                    <strong>Food Court</strong>
                  </div>
                  <div className={s.sub}>350m · 2층 중앙</div>
                </div>
                <span
                  className={s.badge}
                  style={{ background: "#fee2e2", color: "#991b1b" }}
                >
                  부족
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
