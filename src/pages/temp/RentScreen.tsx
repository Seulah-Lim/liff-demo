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
  background:var(--card);           
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

.buttons{display:grid;grid-template-columns:1fr;gap:10px;padding:0} /* 하단 카드에 맞춰 패딩 0 */
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
.pill{
  display:inline-flex;align-items:center;gap:6px;
  padding:2px 8px;border-radius:999px;font-size:12px;
  border:1px solid var(--border);background:#eef2ff;color:#3730a3;
}
.pill.green{ background:#ecfdf5; color:#065f46; border-color:#a7f3d0; } /* Available */
.pill.blue{  background:#e0e7ff; color:#3730a3; border-color:#c7d2fe; } /* In use   */
.pill.red{   background:#fee2e2; color:#991b1b; border-color:#fecaca; } /* Broken  */
.pill .dot{ width:6px;height:6px;border-radius:50%;background:currentColor; display:inline-block; }

`;

export default function RentScreen() {
  const IMAGE_URL =
    "https://www.okamura.com/wp-content/uploads/2025/04/OC_Image_1.webp";

  return (
    <div className="container">
      <style>{baseCss}</style>
      <div className="app">
        <div className="appbar">대여</div>
        <main className="content">
          {/* 1) 배터리 정보 (카드) */}
          <section className="card">
            <h3>배터리 정보</h3>

            {/* 이미지 (가운데 크롭, 작게) */}
            <img
              src={IMAGE_URL}
              alt="Battery preview"
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 12,
                border: "1px solid var(--border)",
                marginTop: 8,
              }}
            />

            {/* ▶ 상세 정보 (모델/ID/충전/스테이션) */}
            <div className="sep" />
            <div className="kv">
              <div className="k">모델</div>
              <div>OC Portable Battery</div>

              <div className="k">배터리ID</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>#12345</span>
                {/* 상태 배지: Available / In use / Broken 중 하나 선택 */}
                <span className="pill green">
                  <span className="dot" /> Available
                </span>
                {/* 예: In use면 아래로 교체
      <span className="pill blue"><span className="dot" /> In use</span>
      */}
                {/* 예: Broken이면 아래로 교체
      <span className="pill red"><span className="dot" /> Broken</span>
      */}
              </div>

              <div className="k">충전량</div>
              <div>85%</div>

              <div className="k">스테이션</div>
              <div>City Hall #12</div>
            </div>
          </section>

          {/* 2) 시간 선택 (카드) */}
          <section className="card">
            <h3>시간 선택</h3>
            <div className="chips">
              <div className="chip">
                <input type="radio" name="t" id="t30" defaultChecked />
                <label htmlFor="t30">30분</label>
              </div>
              <div className="chip">
                <input type="radio" name="t" id="t60" />
                <label htmlFor="t60">1시간</label>
              </div>
              <div className="chip">
                <input type="radio" name="t" id="t120" />
                <label htmlFor="t120">2시간</label>
              </div>
              <div className="chip">
                <input type="radio" name="t" id="tCustom" />
                <label htmlFor="tCustom">맞춤</label>
              </div>
            </div>
            <div className="sep" />
            <label className="row" style={{ alignItems: "center", gap: 10 }}>
              <input type="checkbox" defaultChecked />
              <span className="small">약관에 동의합니다</span>
            </label>
          </section>

          {/* 3) 하단 버튼도 카드로 감싸 일관성 유지 */}
          <section className="card" style={{ padding: 16 }}>
            <div className="buttons">
              <a className="btn" href="#">
                대여하기
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
