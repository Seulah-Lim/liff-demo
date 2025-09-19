// src/pages/scan/ScanResult.tsx
import { useState } from "react";
import liff from "@line/liff";

export default function ScanResult() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [parsedBid, setParsedBid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);
    setParsedBid(null);
    setError(null);

    try {
      const res = await liff.scanCodeV2();
      const raw = res?.value;
      setResult(raw ?? null);

      if (typeof raw !== "string" || raw.length === 0) {
        setError("Invalid QR format.");
        return;
      }

      if (!/^https?:\/\//i.test(raw)) {
        setError("Invalid https URL format.");
        return;
      }

      let url: URL;
      try {
        url = new URL(raw);
      } catch {
        setError("Invalid URL format.");
        return;
      }

      const bid = url.searchParams.get("bid");
      if (bid && bid.length > 0) {
        setParsedBid(bid);
      } else {
        setError("Invalid format: 'bid' parameter is missing.");
      }
    } catch (e) {
      setError("Scan failed: " + String(e));
    } finally {
      setScanning(false);
    }
  };

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 24 }}>
      <h1>QR 스캔 테스트</h1>

      <button
        onClick={handleScan}
        disabled={scanning}
        style={{
          padding: "10px 16px",
          backgroundColor: scanning ? "#888" : "black",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: scanning ? "not-allowed" : "pointer",
        }}
      >
        {scanning ? "스캔 중…" : "QR 스캔하기"}
      </button>

      {result && (
        <section style={{ marginTop: 20 }}>
          <h2>스캔 결과</h2>
          <p
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: 4,
              wordBreak: "break-all",
              background: "#f9f9f9",
            }}
          >
            {result}
          </p>
        </section>
      )}

      {parsedBid && (
        <section style={{ marginTop: 20 }}>
          <h2>Parsed Result</h2>
          <p
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: 4,
            }}
          >
            ✅ bid: <strong>{parsedBid}</strong>
          </p>
        </section>
      )}

      {error && (
        <section style={{ marginTop: 20 }}>
          <h2 style={{ color: "red" }}>Error</h2>
          <p style={{ color: "red" }}>{error}</p>
          {result && (
            <p
              style={{
                marginTop: 8,
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: 4,
                wordBreak: "break-all",
              }}
            >
              Raw scanned value: {result}
            </p>
          )}
        </section>
      )}
    </main>
  );
}
