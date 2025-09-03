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
export default function SupportScreen() {
  return (
    <div className="container">
      <style>{baseCss}</style>
      <div className="app">
        <div className="appbar">신고/고객지원</div>
        <main className="content">
          <section className="card">
            <h3>신고/고객지원</h3>
            <div className="label">사유</div>
            <textarea placeholder="예: 충전이 안돼요 / 분실했습니다 등"></textarea>
            <div className="sep"></div>
            <div className="label">사진 업로드</div>
            <div className="file">
              <input
                className="input"
                type="file"
                accept="image/*"
                capture="environment"
              />
            </div>
            <div className="hint">
              장소·상태가 보이도록 촬영해주세요. (개인정보 노출 주의)
            </div>
          </section>
          <section className="card">
            <div className="buttons two">
              <a className="btn" href="#">
                제출
              </a>
              <a className="btn secondary" href="#">
                고객센터 연결
              </a>
            </div>
          </section>
          <section className="card" style={{ minHeight: 60 }}></section>
        </main>
      </div>
    </div>
  );
}
