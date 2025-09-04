// src/pages/Battery.tsx

import { Link } from "react-router";
import { useBidStore } from "../../app/store/bidStore";

const LIFF_ID = "2008002745-KgmzwRd4";

export default function BatteryInfo() {
  const bid = useBidStore((s) => s.bid);
  const sampleStateLink = `https://liff.line.me/${LIFF_ID}?liff.state=${encodeURIComponent(
    "?bid=yourBatteryId"
  )}`;
  const samplePermalink = `https://liff.line.me/${LIFF_ID}/?bid=yourBatteryId`;
  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 24 }}>
      <h1>배터리 정보</h1>

      {bid ? (
        <section
          style={{
            marginTop: 20,
            padding: 16,
            border: "1px solid #e5e5e5",
            borderRadius: 8,
          }}
        >
          <h2 style={{ marginTop: 0 }}>배터리 번호</h2>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 0.4,
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: 6,
              display: "inline-block",
            }}
          >
            {bid}
          </div>
        </section>
      ) : (
        <section
          style={{
            marginTop: 20,
            padding: 16,
            border: "1px solid #e5e5e5",
            borderRadius: 8,
          }}
        >
          <h2 style={{ marginTop: 0 }}>URL에 배터리 ID 넣는 방법</h2>
          <p style={{ margin: "8px 0 12px", color: "#555" }}>
            아래 예시 링크 중 하나를 클릭해 테스트하세요. 접속 후 하단에 배터리
            번호가 표시됩니다.
          </p>
          <div style={{ padding: "8px 0", borderTop: "1px solid #ddd" }}>
            <strong style={{ display: "block", marginBottom: 4 }}>
              LIFF SDK 방식 (<code>liff.state</code>)
            </strong>
            <a
              href={sampleStateLink}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#0066cc",
                textDecoration: "underline",
                wordBreak: "break-all",
                fontSize: 14,
              }}
            >
              {sampleStateLink}
            </a>
          </div>

          <div style={{ padding: "8px 0", borderTop: "1px solid #ddd" }}>
            <strong style={{ display: "block", marginBottom: 4 }}>
              permanent link (일반 쿼리)
            </strong>
            <a
              href={samplePermalink}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#0066cc",
                textDecoration: "underline",
                wordBreak: "break-all",
                fontSize: 14,
              }}
            >
              {samplePermalink}
            </a>
          </div>
        </section>
      )}

      <div style={{ marginTop: 20 }}>
        <Link to={bid ? `/?bid=${encodeURIComponent(bid)}` : "/"}>
          ← 홈으로
        </Link>
      </div>
    </main>
  );
}
