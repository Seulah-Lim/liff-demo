import { useNavigate } from "react-router";

const baseCss = `
:root{
  --bg:#f7f7f8; --fg:#111827; --muted:#6b7280; --border:#e5e7eb; --brand:#111827;
}
@media (prefers-color-scheme: dark){
  :root{ --bg:#0b0b0c; --fg:#e5e7eb; --muted:#9ca3af; --border:#1f2937; --brand:#e5e7eb; }
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:var(--bg);color:var(--fg);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,Apple SD Gothic Neo,Noto Sans KR,sans-serif}
.container{min-height:100dvh;display:flex;flex-direction:column;align-items:center}
.app{width:100vw;max-width:480px;min-height:100dvh;display:flex;flex-direction:column}
.header{padding:calc(12px + env(safe-area-inset-top)) 16px 12px;text-align:center;font-weight:700}
.grid{flex:1;display:grid;gap:12px;padding:12px;grid-template-columns:1fr;align-content:center}
@media (min-width:420px){ .grid{grid-template-columns:1fr 1fr} }
.btn{
  display:flex;align-items:center;justify-content:center;text-align:center;
  padding:16px;border-radius:16px;border:1px solid var(--border);
  background:var(--brand);color:#fff;text-decoration:none;font-weight:700;font-size:16px;min-height:64px;
}
.btn.outline{ background:transparent;color:var(--fg) }
.footer{padding:12px 16px calc(12px + env(safe-area-inset-bottom));text-align:center;color:var(--muted);font-size:12px}
`;

export default function Temp() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <style>{baseCss}</style>
      <div className="app">
        <div className="header">Demo Navigation</div>
        <main className="grid">
          <button className="btn" onClick={() => navigate("/rentScreen")}>
            대여 화면
          </button>
          <button className="btn" onClick={() => navigate("/inuseNotice")}>
            타인 대여중
          </button>
          <button
            className="btn outline"
            onClick={() => navigate("/returnExtend1")}
          >
            반납/연장 화면 1
          </button>
          <button
            className="btn outline"
            onClick={() => navigate("/returnExtend2")}
          >
            반납/연장 화면 2
          </button>
          <button className="btn" onClick={() => navigate("/support")}>
            신고/고객지원 화면
          </button>
        </main>
        <div className="footer">LIFF UX Mock • navigate()로 라우팅</div>
      </div>
    </div>
  );
}
