const baseCss = `
:root{
  --bg:#f7f7f8;
  --card:#ffffff;
  --border:#e5e7eb;
  --fg:#111827;
  --muted:#6b7280;
  --brand:#111827;
  --accent:#10b981;
  --danger:#ef4444;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#0b0b0c;
    --card:#111214;
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
.app{width:100vw;max-width:100vw;min-height:100dvh;display:flex;flex-direction:column;background:var(--bg);}
.appbar{
  position:sticky; top:0; z-index:10; background:transparent; border-bottom:0;
  padding:calc(12px + env(safe-area-inset-top)) 16px 12px 16px; text-align:center; font-weight:600
}
.content{
  flex:1; display:grid; gap:12px;
  grid-template-rows: auto auto 1fr auto;
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
.sep{height:1px;background:var(--border);margin:12px 0}
.buttons{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.btn{
  display:inline-flex;justify-content:center;align-items:center;width:100%;
  padding:16px 14px;border-radius:14px;border:1px solid var(--border);
  background:var(--brand);color:#fff;font-weight:700;text-decoration:none
}
.btn.secondary{background:transparent;color:var(--fg)}
.kv{ display:grid;grid-template-columns:110px 1fr; gap:8px;font-size:15px }
.kv .k{color:var(--muted)}
/* 상태 배지(pill) */
.pill{
  display:inline-flex;align-items:center;gap:6px;
  padding:2px 8px;border-radius:999px;font-size:12px;
  border:1px solid var(--border);background:#e0e7ff;color:#3730a3; /* 기본: blue 톤 */
}
.pill .dot{ width:6px;height:6px;border-radius:50%;background:currentColor; display:inline-block; }
`;

export default function ReturnExtend1Screen() {
  const IMAGE_URL = "https://i.postimg.cc/rpkz8RHV/OC-Image-1-1536x1025.webp"; // 필요 시 교체

  return (
    <div className="container">
      <style>{baseCss}</style>
      <div className="app">
        <div className="appbar">반납/연장</div>
        <main className="content">
          {/* 1) 배터리 정보 */}
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

            <div className="sep" />
            <div className="kv">
              <div className="k">모델</div>
              <div>OC Portable Battery</div>

              <div className="k">배터리ID</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>#12345</span>
                {/* 상태 배지: 이 화면은 '내가 대여 중'이므로 In use */}
                <span className="pill">
                  <span className="dot" /> In use
                </span>
              </div>

              <div className="k">충전량</div>
              <div>85%</div>

              <div className="k">스테이션</div>
              <div>City Hall #12</div>
            </div>
          </section>

          {/* 2) 반납 시간 */}
          <section className="card">
            <h3>반납 시간</h3>
            <div className="row">
              <span className="meta">만료 예정</span>
              <strong>2025-09-02 18:30</strong>
            </div>
            {/* 필요하면 남은 시간도 표시 가능
            <div className="row">
              <span className="meta">남은 시간</span>
              <strong>38분</strong>
            </div>
            */}
          </section>

          {/* 3) 액션 버튼 */}
          <section className="card" style={{ padding: 16 }}>
            <div className="buttons">
              <a className="btn" href="#">
                반납하기
              </a>
              <a className="btn secondary" href="#">
                연장하기
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
