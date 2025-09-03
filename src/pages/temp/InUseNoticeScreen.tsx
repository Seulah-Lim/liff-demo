const baseCss = `
:root{
  --bg:#f7f7f8; --card:#ffffff; --border:#e5e7eb; --fg:#111827; --muted:#6b7280;
  --brand:#111827; --accent:#10b981; --danger:#ef4444;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#0b0b0c; --card:#111214; --border:#1f2937; --fg:#e5e7eb; --muted:#9ca3af;
    --brand:#111827; --accent:#34d399;
  }
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:var(--bg);color:var(--fg);
  font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,Apple SD Gothic Neo,Noto Sans KR,sans-serif}
.container{min-height:100dvh;display:flex;flex-direction:column;align-items:stretch}
.app{width:100vw;max-width:100vw;min-height:100dvh;display:flex;flex-direction:column;background:var(--bg);}
.appbar{position:sticky;top:0;z-index:10;background:transparent;border-bottom:0;
  padding:calc(12px + env(safe-area-inset-top)) 16px 12px 16px;text-align:center;font-weight:600}
.content{flex:1;display:grid;gap:12px;padding:12px;grid-template-rows:auto auto}
.card{background:var(--card);border:1px solid var(--border);border-radius:16px;
  box-shadow:0 1px 0 rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.04);padding:16px;}
.card h3{margin:0 0 8px 0;font-size:16px}
.row{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:14px}
.kv{display:grid;grid-template-columns:110px 1fr;gap:8px;font-size:15px}
.kv .k{color:var(--muted)}
.meta{color:var(--muted);font-size:12px}
.sep{height:1px;background:var(--border);margin:12px 0}
.buttons{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.btn{display:inline-flex;justify-content:center;align-items:center;width:100%;
  padding:16px 14px;border-radius:14px;border:1px solid var(--border);
  background:var(--brand);color:#fff;font-weight:700;text-decoration:none}
.btn.secondary{background:transparent;color:var(--fg)}
.btn.disabled{background:#f3f4f6;color:#9ca3af;border-color:#e5e7eb;cursor:not-allowed}

/* 상태 배지(pill) */
.pill{display:inline-flex;align-items:center;gap:6px;padding:2px 8px;border-radius:999px;font-size:12px;
  border:1px solid var(--border);}
.pill.blue{background:#e0e7ff;color:#3730a3;border-color:#c7d2fe}   /* In use */
.pill.green{background:#ecfdf5;color:#065f46;border-color:#a7f3d0}  /* Available */
.pill.red{background:#fee2e2;color:#991b1b;border-color:#fecaca}   /* Broken */
.pill .dot{width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block}

/* 대여 불가 배너 */
.banner{display:flex;gap:12px;align-items:flex-start;padding:12px;border-radius:12px;
  background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;margin:8px 0 4px}
.iconCircle{width:28px;height:28px;border-radius:999px;display:grid;place-items:center;
  background:#fed7aa;color:#9a3412;font-weight:700}
/* 근처 스테이션 리스트 */
.stations{display:grid;gap:10px}
.station{
  display:flex;justify-content:space-between;align-items:center;gap:12px;
  padding:12px;border:1px solid var(--border);border-radius:12px;background:transparent;
}
.stat-left{min-width:0}
.stat-name{font-weight:700}
.stat-meta{color:var(--muted);font-size:12px;margin-top:2px;display:flex;gap:6px;align-items:center;flex-wrap:wrap}

/* 재고 배지 */
.avail{
  display:inline-flex;align-items:center;gap:6px;
  padding:6px 10px;border-radius:999px;font-size:12px;border:1px solid var(--border);
}

  `;

export default function InUseNoticeScreen() {
  const IMAGE_URL = "https://i.postimg.cc/rpkz8RHV/OC-Image-1-1536x1025.webp"; // 필요 시 교체

  return (
    <div className="container">
      <style>{baseCss}</style>
      <div className="app">
        <div className="appbar">대여 불가</div>

        <main className="content">
          {/* 1) 대여 불가 안내 + 배터리 정보 */}
          <section className="card">
            {/* 강한 메시지 배너: 반납 화면과 확실히 구분 */}
            <div className="banner">
              <div className="iconCircle">!</div>
              <div>
                <div style={{ fontWeight: 700 }}>지금은 대여할 수 없어요</div>
                <div className="meta">
                  다른 사용자가 이 배터리를 사용 중입니다.
                </div>
              </div>
            </div>

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
                marginTop: 4,
              }}
            />

            <div className="sep" />
            <div className="kv">
              <div className="k">모델</div>
              <div>OC Portable Battery</div>

              <div className="k">배터리ID</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>#12345</span>
                {/* 상태: 타인 대여 중 → In use */}
                <span className="pill blue">
                  <span className="dot" /> In use
                </span>
              </div>

              <div className="k">스테이션</div>
              <div>City Hall #12</div>
            </div>
          </section>

          <section className="card">
            <h3>근처 스테이션</h3>
            <div className="stations">
              <div className="station">
                <div className="stat-left">
                  <div className="stat-name">Library West</div>
                  <div className="stat-meta">
                    <span>240m</span>
                    <span>·</span>
                    <span>B1 스테이션</span>
                  </div>
                </div>
                <span className="avail good">여유</span>
              </div>

              <div className="station">
                <div className="stat-left">
                  <div className="stat-name">Food Court</div>
                  <div className="stat-meta">
                    <span>350m</span>
                    <span>·</span>
                    <span>2층 중앙</span>
                  </div>
                </div>
                <span className="avail mid">보통</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
