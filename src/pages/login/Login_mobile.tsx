// src/App.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import liff from "@line/liff";
import type { Profile } from "@liff/get-profile";
import { buildUrlWithBid, getBidFromLocation } from "../../utils/bid";

const LIFF_ID = "2008002745-KgmzwRd4";

export default function Login_mobile() {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bid, setBid] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initialBid = getBidFromLocation();

    liff
      .init({ liffId: LIFF_ID })
      .then(async () => {
        const isIn = liff.isLoggedIn();
        setLoggedIn(isIn);

        if (isIn) {
          try {
            const p = await liff.getProfile();
            setProfile(p);
          } catch (e) {
            setError(String(e));
          }
        }

        const afterBid = getBidFromLocation();
        const finalBid = afterBid ?? initialBid ?? null;
        setBid(finalBid);

        // URL 정리(선택): 앞으로 항상 ?bid=... 형태 유지
        if (finalBid) {
          const u = new URL(location.href);
          if (!u.searchParams.get("bid")) {
            u.searchParams.set("bid", finalBid);
          }
          if (u.searchParams.has("liff.state")) {
            u.searchParams.delete("liff.state");
          }
          history.replaceState(null, "", u.toString());
        }
      })
      .catch((e) => setError(`LIFF init failed: ${e}`))
      .finally(() => setReady(true));
  }, []);

  const handleToggleAuth = async () => {
    if (!ready) return;

    if (!loggedIn) {
      liff.login();
      return;
    }
    liff.logout();
    setLoggedIn(false);
    setProfile(null);
  };

  const goBatteryPage = () => {
    // /battery로 이동하면서 bid 쿼리를 붙여줌
    navigate(buildUrlWithBid("/batteryInfo", bid), { replace: false });
  };

  const goScanPage = () => {
    navigate(buildUrlWithBid("/scan", bid), { replace: false });
  };

  const goTempPage = () => {};

  const goCurrentLocationPage = () => {
    // /battery로 이동하면서 bid 쿼리를 붙여줌
    navigate(buildUrlWithBid("/currentLocation", bid), { replace: false });
  };

  return (
    <>
      <main style={{ maxWidth: 560, margin: "40px auto", padding: 24 }}>
        <h1>LIFF 로그인 테스트</h1>

        {!ready && <p>초기화 중…</p>}
        {ready && (
          <>
            <section style={{ margin: "16px 0" }}>
              <button
                onClick={handleToggleAuth}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                {loggedIn ? "로그아웃" : "로그인"}
              </button>
            </section>
            {error && (
              <p style={{ color: "red", whiteSpace: "pre-wrap" }}>{error}</p>
            )}
            <section style={{ marginTop: 16 }}>
              <h2>상태</h2>
              <p>{loggedIn ? "로그인 상태" : "로그아웃 상태"}</p>
            </section>
            {loggedIn && profile && (
              <section style={{ marginTop: 16 }}>
                <h2>프로필</h2>

                {profile.pictureUrl ? (
                  <img
                    src={profile.pictureUrl}
                    alt={`${profile.displayName}의 프로필 이미지`}
                    width={96}
                    height={96}
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    aria-label="프로필 이미지 없음"
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 24,
                      background: "#eee",
                      color: "#555",
                    }}
                  >
                    {profile.displayName?.[0] ?? "?"}
                  </div>
                )}

                <p style={{ marginTop: 8 }}>
                  <strong>{profile.displayName}</strong>
                </p>
                {profile.statusMessage && <p>{profile.statusMessage}</p>}
                <p style={{ color: "#666", marginTop: 4 }}>
                  ID: {profile.userId}
                </p>
              </section>
            )}

            <div style={{ marginTop: 16 }}>
              <button
                onClick={goBatteryPage}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                배터리 정보 페이지로 이동
              </button>
            </div>
            <div style={{ marginTop: 16 }}>
              <button
                onClick={goScanPage}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Scan 페이지로 이동
              </button>
            </div>
            <div style={{ marginTop: 16 }}>
              <button
                onClick={goTempPage}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                임시 페이지들로 이동
              </button>
            </div>
            <div style={{ marginTop: 16 }}>
              <button
                onClick={goCurrentLocationPage}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                위치 조회 페이지로 이동
              </button>
            </div>
            <section style={{ marginTop: 16 }}>
              <h2>UserAgent</h2>
              <pre
                style={{
                  fontSize: "12px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                {navigator.userAgent}
              </pre>
            </section>
          </>
        )}
      </main>
    </>
  );
}
