import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useLiffStore } from "../../app/store/liffStore";
import {
  accountCard,
  actionsRow,
  avatarFallback,
  avatarXL,
  badgeOutline,
  banner,
  btnGhost,
  btnPrimary,
  card,
  codeBoxSmall,
  container,
  debugCard,
  h2,
  label,
  logBox,
  mutedNote,
  nameText,
  navItem,
  navList,
  profileRow,
  subText,
  value,
} from "./homehub.css";
import { buildMainPermanentLink } from "../../app/lib/liff/buildLinks";

const LIFF_DEEPLINK = "https://liff.line.me/2008002745-KgmzwRd4";
declare const __BUILD_TIME__: string;

export default function HomeHub() {
  const { ready, isLoggedIn, profile, debugLogs, login, logout, appendLog } =
    useLiffStore();
  const [busy, setBusy] = useState<null | "login" | "logout">(null);
  const [debugOpen, setDebugOpen] = useState(false);

  useEffect(() => {
    appendLog(`ready: ${ready}`);
  }, [ready, appendLog]);
  useEffect(() => {
    appendLog(`isLoggedIn: ${isLoggedIn}`);
  }, [isLoggedIn, appendLog]);

  const codeStatePresence = useMemo(() => {
    const q = new URLSearchParams(location.search);
    return (
      ["code", "state", "liffClientId", "liffRedirectUri"]
        .filter((k) => q.has(k))
        .join(", ") || "none"
    );
  }, []);

  const liffState = useMemo(() => {
    const q = new URLSearchParams(location.search);
    return q.get("liff.state") ?? "-";
  }, []);

  const handleLogin = () => {
    setBusy("login");
    login();
  };
  const handleLogout = () => {
    setBusy("logout");
    logout();
  };

  const openInLINE = async () => {
    const deep = await buildMainPermanentLink();

    location.href = deep;
  };

  return (
    <div className={container}>
      {!ready && <div className={banner}>초기화 중… (waiting LIFF ready)</div>}
      <h1 style={{ margin: 0 }}>홈</h1>
      {/* 계정 */}
      <section className={accountCard}>
        <h2 className={h2}>Account</h2>
        <>
          <div className={profileRow}>
            {isLoggedIn && profile?.pictureUrl ? (
              <img src={profile.pictureUrl} alt="프로필" className={avatarXL} />
            ) : (
              <div className={avatarFallback}>LI</div>
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className={nameText}>
                {isLoggedIn ? (
                  <>
                    안녕하세요, <b>{profile?.displayName ?? "사용자"}</b>님
                  </>
                ) : (
                  "로그인되어 있지 않습니다."
                )}
              </div>
              <div className={subText}>
                {!isLoggedIn && "LINE 계정으로 로그인하여 서비스를 이용하세요."}
              </div>
            </div>
          </div>
          <div className={actionsRow}>
            {isLoggedIn ? (
              <button
                className={btnGhost}
                onClick={handleLogout}
                disabled={!ready || busy === "logout"}
              >
                {busy === "logout" ? "로그아웃 중…" : "로그아웃"}
              </button>
            ) : (
              <button
                className={btnPrimary}
                onClick={handleLogin}
                disabled={!ready || busy === "login"}
              >
                {busy === "login" ? "로그인 중…" : "로그인"}
              </button>
            )}
            <button className={btnGhost} onClick={openInLINE}>
              LIFF로 열기
            </button>
          </div>
        </>
      </section>{" "}
      <section className={debugCard}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h2 className={h2} style={{ margin: 0, color: "#111" }}>
            {import.meta.env.PROD ? "PROD " : "BUILD"}
          </h2>
          <button
            className={btnGhost}
            onClick={() => setDebugOpen((v) => !v)}
            aria-expanded={debugOpen}
            aria-controls="debug-panel"
            title={debugOpen ? "접기" : "펼치기"}
            style={{ padding: "2px 6px", fontSize: "14px", lineHeight: 1 }}
          >
            {debugOpen ? "▲" : "▼"}
          </button>
          <span className={badgeOutline}>
            logs {Array.isArray(debugLogs) ? debugLogs.length : 0}
          </span>
        </div>
        <span className={value}>
          {new Date(__BUILD_TIME__).toLocaleString()}
        </span>
        {debugOpen && (
          <div id="debug-panel" style={{ marginTop: 12 }}>
            <div>
              <div>
                <span className={label}>ready</span>
                <span className={value}>{String(ready)}</span>
              </div>
              <div>
                <span className={label}>isLoggedIn</span>
                <span className={value}>{String(isLoggedIn)}</span>
              </div>
              <div>
                <span className={label}>location</span>
                <code className={codeBoxSmall}>{location.href}</code>
              </div>
              <div>
                <span className={label}>liff.state</span>
                <code className={codeBoxSmall}>{liffState}</code>
              </div>
              <div>
                <span className={label}>code/state present</span>
                <span className={value}>{codeStatePresence}</span>
              </div>
              <div>
                <span className={label}>BASE_URL</span>
                <code className={codeBoxSmall}>{import.meta.env.BASE_URL}</code>
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <div className={label}>events</div>
              <pre className={logBox}>
                {Array.isArray(debugLogs) && debugLogs.length > 0
                  ? debugLogs.join("\n")
                  : "-"}
              </pre>
            </div>
          </div>
        )}
      </section>
      <section className={card}>
        <h2 className={h2}>Navigation</h2>
        <nav>
          {/* 예시 화면 그룹 */}
          {/* 실제 동작 그룹 */}
          <div>
            <div className={mutedNote}>실제 동작 항목</div>
            <ul className={navList}>
              <li>
                <Link className={navItem} to="home/userInfo">
                  UserInfo
                </Link>
              </li>
              <li>
                <a className={navItem} href={LIFF_DEEPLINK}>
                  LINE 앱(LIFF)으로 열기
                </a>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div className={mutedNote}>UI 데모 화면</div>

            <ul className={navList}>
              <li>
                <Link className={navItem} to="/home/rent">
                  대여 화면
                </Link>
              </li>
              <li>
                <Link className={navItem} to="/home/borrowed">
                  대여 화면 (타인 사용중)
                </Link>
              </li>
              <li>
                <Link className={navItem} to="/home/return?a=1">
                  반납 안내
                </Link>
              </li>
              <li>
                <Link className={navItem} to="/home/return?b=1">
                  반납/연장하기
                </Link>
              </li>
              <li>
                <Link className={navItem} to="/support">
                  신고하기
                </Link>
              </li>
              <li>
                <Link className={navItem} to="home/scan" aria-disabled>
                  Scan QR 화면
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
}
