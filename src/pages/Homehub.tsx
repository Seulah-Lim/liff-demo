import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLiffStore } from "../app/store/liffStore";
const LIFF_DEEPLINK = "https://liff.line.me/2008002745-KgmzwRd4";
declare const __BUILD_TIME__: string;

export default function HomeHub() {
  const {
    ready,
    isLoggedIn,
    profile,
    debugLogs,
    init,
    login,
    logout,
    appendLog,
  } = useLiffStore();
  const [busy, setBusy] = useState<null | "login" | "logout">(null);
  useEffect(() => {
    appendLog("HomeHub mounted");
    appendLog("init() called from HomeHub");
    init();
  }, [appendLog, init]);
  useEffect(() => {
    appendLog(`ready: ${ready}`);
  }, [ready, appendLog]);
  useEffect(() => {
    appendLog(`isLoggedIn: ${isLoggedIn}`);
  }, [isLoggedIn, appendLog]);

  const handleLogin = () => {
    setBusy("login");
    login();
  };
  const handleLogout = () => {
    setBusy("logout");
    logout();
  };

  const openInLINE = () => {
    // 필요 시 현재 쿼리/해시를 붙이고 싶으면 아래처럼:
    // location.href = `${LIFF_DEEPLINK}${location.search}${location.hash}`;
    location.href = LIFF_DEEPLINK;
  };

  return (
    <div style={container}>
      {!ready && <div style={banner}>초기화 중… (waiting LIFF ready)</div>}
      <h1 style={{ margin: 0 }}>LIFF 샘플 홈</h1>
      {/* 계정 */}
      <section style={accountCard}>
        <h2 style={h2}>Account</h2>
        <>
          <div style={profileRow}>
            {isLoggedIn && profile?.pictureUrl ? (
              <img src={profile.pictureUrl} alt="프로필" style={avatarXL} />
            ) : (
              <div style={avatarFallback}>LI</div>
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={nameText}>
                {isLoggedIn ? (
                  <>
                    안녕하세요, <b>{profile?.displayName ?? "사용자"}</b>님
                  </>
                ) : (
                  "로그인되어 있지 않습니다."
                )}
              </div>
              <div style={subText}>
                {!isLoggedIn && "LINE 계정으로 로그인하여 서비스를 이용하세요."}
              </div>
            </div>
          </div>
          <div style={actionsRow}>
            {isLoggedIn ? (
              <button
                style={btnGhost}
                onClick={handleLogout}
                disabled={!ready || busy === "logout"}
              >
                {busy === "logout" ? "로그아웃 중…" : "로그아웃"}
              </button>
            ) : (
              <button
                style={btnPrimary}
                onClick={handleLogin}
                disabled={!ready || busy === "login"}
              >
                {busy === "login" ? "로그인 중…" : "로그인"}
              </button>
            )}
            <button style={btnGhost} onClick={openInLINE}>
              LIFF로 열기
            </button>
          </div>
        </>
      </section>{" "}
      <section style={debugCard}>
        <h2 style={h2}>Debug</h2>{" "}
        {
          <div>
            <span style={label}>
              {import.meta.env.PROD ? "build" : "dev server start"}
            </span>
            <span style={value}>
              {new Date(__BUILD_TIME__).toLocaleString()}
            </span>
          </div>
        }
        <div>
          {" "}
          <div>
            <span style={label}>ready</span>
            <span style={value}>{String(ready)}</span>
          </div>{" "}
          <div>
            <span style={label}>isLoggedIn</span>
            <span style={value}>{String(isLoggedIn)}</span>
          </div>{" "}
          <div>
            <span style={label}>location</span>
            <code style={codeBoxSmall}>{location.href}</code>
          </div>{" "}
          <div>
            <span style={label}>liff.state</span>
            <code style={codeBoxSmall}>
              {new URLSearchParams(location.search).get("liff.state") ?? "-"}
            </code>
          </div>{" "}
          <div>
            <span style={label}>code/state present</span>
            <span style={value}>
              {" "}
              {["code", "state", "liffClientId", "liffRedirectUri"]
                .filter((k) => new URLSearchParams(location.search).has(k))
                .join(", ") || "none"}{" "}
            </span>
          </div>{" "}
          <div>
            <span style={label}>BASE_URL</span>
            <code style={codeBoxSmall}>{import.meta.env.BASE_URL}</code>
          </div>{" "}
        </div>{" "}
        <div style={{ marginTop: 10 }}>
          <div style={label}>events</div>{" "}
          <pre style={logBox}>
            {Array.isArray(debugLogs) && debugLogs.length > 0
              ? debugLogs.join("\n")
              : "-"}
          </pre>
        </div>{" "}
      </section>
      {/* 탐색 */}{" "}
      <section style={card}>
        <h2 style={h2}>Navigation</h2>{" "}
        <nav>
          {" "}
          <ul style={navList}>
            {" "}
            <li>
              <Link style={navItem} to="/userInfo">
                UserInfo
              </Link>
            </li>{" "}
            <li>
              <Link style={navItem} to="/scan">
                Scan
              </Link>
            </li>{" "}
            <li>
              <Link style={navItem} to="/batteryInfo">
                배터리 정보
              </Link>
            </li>{" "}
            <li>
              <Link style={navItem} to="/flows/rent">
                대여 시작
              </Link>
            </li>{" "}
            <li>
              <Link style={navItem} to="/flows/borrowed">
                사용 중(타인 대여 중)
              </Link>
            </li>{" "}
            <li>
              <Link style={navItem} to="/flows/return?a=1">
                반납 안내
              </Link>
            </li>{" "}
            <li>
              <Link style={navItem} to="/flows/return?b=1">
                반납/연장하기
              </Link>
            </li>{" "}
            <li>
              <Link style={navItem} to="/flows/support">
                신고하기
              </Link>
            </li>{" "}
            <li>
              <a style={navItem} href={LIFF_DEEPLINK}>
                LINE 앱(LIFF)으로 열기
              </a>
            </li>{" "}
          </ul>{" "}
        </nav>{" "}
      </section>
    </div>
  );
}

/* --- styles --- */
const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
};

const container: React.CSSProperties = {
  maxWidth: 640,
  margin: "24px auto 48px",
  padding: 16,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, Apple SD Gothic Neo, Noto Sans KR, sans-serif",
  display: "grid",
  gap: 16,
};

const h2: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 18,
  color: "#111",
};

const btn: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid #d1d5db",
  borderRadius: 10,
  cursor: "pointer",
  appearance: "none",
  background: "#f3f4f6",
  color: "#111",
};

const navList: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: 8,
};
const navItem: React.CSSProperties = {
  display: "block",
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
};

// 보조 텍스트/프로필
const muted: React.CSSProperties = { color: "#6b7280", fontSize: 13 };

const accountCard: React.CSSProperties = {
  ...card,
  padding: 20,

  boxShadow: "0 1px 3px rgba(0,0,0,.06)",
};

const profileRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const avatarXL: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  objectFit: "cover",
  border: "1px solid #e5e7eb",
};

const avatarFallback: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "#f3f4f6",
  color: "#6b7280",
  fontWeight: 600,
  border: "1px solid #e5e7eb",
};

const nameText: React.CSSProperties = { fontSize: 16 };
const subText: React.CSSProperties = { ...muted, marginTop: 4 };

const actionsRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  marginTop: 12,
};

const btnPrimary: React.CSSProperties = {
  ...btn,

  border: "1px solid #111",
};

const btnGhost: React.CSSProperties = {
  ...btn,
};

const debugCard: React.CSSProperties = {
  ...card,
  padding: 16,
  background: "#fff",
  boxShadow: "inset 0 0 0 1px #eef2f7",
};

const banner: React.CSSProperties = {
  padding: "8px 12px",
  background: "#fff7ed",

  border: "1px solid #fed7aa",
  borderRadius: 8,
  color: "#7c2d12",
  marginBottom: 12,
  fontSize: 13,
};

const label: React.CSSProperties = {
  color: "#6b7280",
  fontSize: 12,
  marginRight: 8,
};
const value: React.CSSProperties = {
  fontSize: 13,
  color: "#111",
};
const codeBoxSmall: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 6px",
  background: "#f9fafb",
  color: "#111",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  fontFamily: "monospace",
  fontSize: 12,
  wordBreak: "break-all",
};
const logBox: React.CSSProperties = {
  margin: 0,
  padding: 8,
  background: "#0b1020",
  color: "#e5e7eb",
  borderRadius: 8,
  fontSize: 12,
  maxHeight: 160,
  overflow: "auto",
  lineHeight: 1.4,
};
