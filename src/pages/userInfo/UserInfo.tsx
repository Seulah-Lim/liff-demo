import React from "react";
import { useLiffStore } from "../../app/store/liffStore";
import { useBidStore } from "../../app/store/bidStore";

export default function UserInfo() {
  const {
    ready,
    isLoggedIn,
    profile,
    idToken,
    decodedIdToken,
    grantedScopes,
    scopes,
    login,
  } = useLiffStore();
  const ua = navigator.userAgent;
  const bid = useBidStore((s) => s.bid);

  if (!ready) return <div style={muted}>초기화 중…</div>;

  return (
    <div style={container}>
      <h1 style={{ margin: 0 }}>User Info</h1>

      <section style={card}>
        {isLoggedIn ? (
          <div style={kv}>
            <div style={row}>
              <span style={label}>batteryId</span>
              <code style={codeBox}>{bid ?? "-"}</code>
            </div>
            <div style={row}>
              <span style={label}>userId</span>
              <code style={codeBox}>{profile?.userId ?? "-"}</code>
            </div>
            <div style={row}>
              <span style={label}>idToken</span>
              <code style={codeBox}>{idToken ?? "-"}</code>
            </div>
            {decodedIdToken && (
              <div style={row}>
                <span style={label}>decodedIdToken</span>
                <div style={{ display: "grid", gap: 4 }}>
                  {Object.entries(decodedIdToken).map(([k, v]) => (
                    <div key={k} style={{ display: "grid", gap: 2 }}>
                      <span style={label}>{k}</span>
                      <code style={codeBox}>
                        {typeof v === "object" ? JSON.stringify(v) : String(v)}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={row}>
              <span style={label}>Granted Permission</span>
              <code style={codeBox}>{grantedScopes}</code>
            </div>
            <div style={row}>
              <span style={label}>Scopes</span>
              <code style={codeBox}>{scopes}</code>
            </div>
            <div style={row}>
              <span style={label}>UserAgent</span>
              <code style={codeBox}>{ua}</code>
            </div>
          </div>
        ) : (
          <div>
            <p style={muted}>로그인이 필요합니다.</p>
            <button style={btnPrimary} onClick={login}>
              로그인
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

const container: React.CSSProperties = {
  maxWidth: 640,
  margin: "24px auto 48px",
  padding: 16,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, Apple SD Gothic Neo, Noto Sans KR, sans-serif",
  display: "grid",
  gap: 16,
};

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 20,
  background: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,.06)",
};

const kv: React.CSSProperties = { display: "grid", gap: 12 };
const row: React.CSSProperties = { display: "grid", gap: 6 };
const label: React.CSSProperties = { fontSize: 12, color: "#6b7280" };
const codeBox: React.CSSProperties = {
  display: "block",
  padding: 8,
  background: "#f9fafb",
  color: "#111",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  wordBreak: "break-all",
  fontFamily: "monospace",
  fontSize: 12,
};
const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "#111",
  color: "#fff",
  border: "1px solid #111",
  cursor: "pointer",
  appearance: "none",
};
const muted: React.CSSProperties = { color: "#6b7280", fontSize: 13 };
