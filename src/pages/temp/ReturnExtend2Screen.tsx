const baseCss = `
:root{
  --bg:#f7f7f8;
  --card:#ffffff;                   /* 카드 배경 복원(라이트) */
  --border:#e5e7eb;
  --fg:#111827;
  --muted:#6b7280;
  --brand:#111827;                  /* 버튼/선택칩 배경은 어둡게 */
  --accent:#10b981;
  --danger:#ef4444;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#0b0b0c;
    --card:#111214;                 /* 카드 배경 복원(다크) */
    --border:#1f2937;
    --fg:#e5e7eb;
    --muted:#9ca3af;
    --brand:#111827;
    --accent:#34d399;
  }
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{
  margin:0;background:var(--bg);color:var(--fg);
  font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,Apple SD Gothic Neo,Noto Sans KR,sans-serif
}
.container{min-height:100dvh;display:flex;flex-direction:column;align-items:stretch}
.app{
  width:100vw; max-width:100vw; min-height:100dvh;
  display:flex; flex-direction:column; background:var(--bg);
}
.appbar{
  position:sticky; top:0; z-index:10;
  background:transparent; border-bottom:0;
  padding:calc(12px + env(safe-area-inset-top)) 16px 12px 16px;
  text-align:center; font-weight:600
}
.content{
  flex:1; display:grid; gap:12px;
  grid-template-rows: auto auto 1fr auto; /* 정보 / 시간선택 / 가변 / 버튼 */
  padding:12px;
}
.card{
  background:var(--card);           /* ✅ 카드 배경 복원 */
  border:1px solid var(--border);
  border-radius:16px;
  box-shadow: 0 1px 0 rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04);
  padding:16px;
}
.card h3{margin:0 0 8px 0;font-size:16px}
.row{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:14px}
.meta{color:var(--muted);font-size:12px}
.badge{display:inline-flex;align-items:center;gap:6px;padding:3px 8px;border-radius:999px;background:#eef2ff;color:#3730a3;font-size:12px}
.sep{height:1px;background:var(--border);margin:12px 0}

/* 버튼: 흰 글씨(white)지만 항상 brand(어두운 배경) 위 */
.btn{
  display:inline-flex;justify-content:center;align-items:center;width:100%;
  padding:16px 14px;border-radius:14px;border:1px solid var(--border);
  background:var(--brand);color:#fff;font-weight:700;text-decoration:none
}
.btn.secondary{background:transparent;color:var(--fg)}
.btn.danger{background:#ef4444;border-color:#ef4444;color:#fff}

.buttons{display:grid;grid-template-columns:1fr;gap:10px;padding:0}
.buttons.two{grid-template-columns:1fr 1fr;gap:12px}

.chips{display:flex;flex-wrap:wrap;gap:10px}
.chip{position:relative}
.chip input{position:absolute;opacity:0;inset:0}
.chip label{
  display:inline-flex;align-items:center;gap:6px;padding:10px 14px;
  border-radius:999px;border:1px solid var(--border);background:transparent;font-size:14px
}
/* 선택 칩: 어두운 brand 배경 + 흰 글씨 → 대비 OK */
.chip input:checked + label{background:var(--brand);color:#fff;border-color:var(--brand)}

.kv{ display:grid;grid-template-columns:110px 1fr; gap:8px;font-size:15px }
.kv .k{color:var(--muted)}
.list{display:grid;gap:10px}
.item{
  display:flex;justify-content:space-between;gap:12px;padding:12px;border:1px solid var(--border);
  border-radius:12px;background:transparent
}
.item .sub{color:var(--muted);font-size:12px}
.map{height:140px;border:1px dashed var(--border);border-radius:12px;display:grid;place-items:center;color:var(--muted);font-size:12px}
.label{font-size:13px;color:var(--muted);margin-bottom:6px}
.input, textarea{
  width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);
  background:transparent;color:var(--fg);font-size:14px
}
textarea{min-height:120px;resize:vertical}
.file{display:flex;gap:10px;align-items:center}
.hint{font-size:12px;color:var(--muted)}
.small{font-size:12px;color:var(--muted)}
hr.soft{border:0;height:1px;background:var(--border);margin:8px 0}
`;
export default function ReturnExtend2Screen() {
  return (
    <div className="container">
      <style>{baseCss}</style>
      <div className="app">
        <div className="appbar">반납 안내</div>
        <main className="content">
          <section className="card">
            <h3>반납 방법 안내</h3>
            <ol
              className="list"
              style={{ listStyle: "decimal", paddingLeft: 18 }}
            >
              <li>스테이션에 배터리를 꽂아주세요.</li>
              <li>지시등이 점등되면 반납이 완료됩니다.</li>
              <li>문제가 있으면 신고/고객지원으로 연결하세요.</li>
            </ol>
            <div className="hint">
              개인 위치 정보는 서버에 저장되지 않습니다.
            </div>
          </section>
          <section className="card">
            <h3>반납 지점 안내</h3>
            <div className="map">미니 지도(썸네일 또는 캡처 영역)</div>
            <div className="sep"></div>
            <div className="list">
              <div className="item">
                <div>
                  <div>
                    <strong>City Hall #12</strong>
                  </div>
                  <div className="sub">120m · 1층 카운터</div>
                </div>
                <span className="badge">여유 있음</span>
              </div>
              <div className="item">
                <div>
                  <div>
                    <strong>Library West</strong>
                  </div>
                  <div className="sub">240m · B1 스테이션</div>
                </div>
                <span className="badge">보통</span>
              </div>
              <div className="item">
                <div>
                  <div>
                    <strong>Food Court</strong>
                  </div>
                  <div className="sub">350m · 2층 중앙</div>
                </div>
                <span
                  className="badge"
                  style={{ background: "#fee2e2", color: "#991b1b" }}
                >
                  부족
                </span>
              </div>
            </div>
          </section>
          <section className="card" style={{ minHeight: 60 }}></section>
        </main>
      </div>
    </div>
  );
}
