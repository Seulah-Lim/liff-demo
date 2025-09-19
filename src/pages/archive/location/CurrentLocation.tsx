import React, { useEffect, useRef, useState } from "react";

type LatLng = { lat: number; lng: number; accuracy?: number; ts?: number };

export default function CurrentLocation() {
  const [pos, setPos] = useState<LatLng | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [watching, setWatching] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10_000,
    maximumAge: 0,
  };

  const onSuccess = (p: GeolocationPosition) => {
    setPos({
      lat: p.coords.latitude,
      lng: p.coords.longitude,
      accuracy: p.coords.accuracy,
      ts: p.timestamp,
    });
    setError(null);
  };

  const onError = (e: GeolocationPositionError) => {
    const msg =
      e.code === e.PERMISSION_DENIED
        ? "위치 권한이 거부되었습니다."
        : e.code === e.POSITION_UNAVAILABLE
        ? "위치를 확인할 수 없습니다."
        : e.code === e.TIMEOUT
        ? "위치 조회가 시간 초과되었습니다."
        : "알 수 없는 오류가 발생했습니다.";
    setError(msg);
  };

  const getOnce = () => {
    if (!("geolocation" in navigator)) {
      setError("이 브라우저는 위치 조회를 지원하지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  };

  const startWatch = () => {
    if (!("geolocation" in navigator)) {
      setError("이 브라우저는 위치 조회를 지원하지 않습니다.");
      return;
    }
    if (watchIdRef.current != null) return;
    const id = navigator.geolocation.watchPosition(onSuccess, onError, options);
    watchIdRef.current = id;
    setWatching(true);
  };

  const stopWatch = () => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setWatching(false);
  };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 정리
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const mapEmbedSrc = pos
    ? `https://maps.google.com/maps?q=${pos.lat},${pos.lng}&z=16&output=embed`
    : "";

  return (
    <div style={containerStyle}>
      <h1 style={{ margin: 0 }}>현재 위치</h1>

      <div style={btnRowStyle}>
        <button style={btnStyle} onClick={getOnce}>
          한 번 가져오기
        </button>
        {!watching ? (
          <button style={btnStyle} onClick={startWatch}>
            실시간 추적 시작
          </button>
        ) : (
          <button style={btnStyle} onClick={stopWatch}>
            실시간 추적 중지
          </button>
        )}
      </div>

      {error && <p style={{ color: "#b00020" }}>{error}</p>}

      {pos && (
        <div style={panelStyle}>
          <div>
            <div>
              위도: <b>{pos.lat.toFixed(6)}</b>
            </div>
            <div>
              경도: <b>{pos.lng.toFixed(6)}</b>
            </div>
            {pos.accuracy != null && (
              <div>정확도: ±{Math.round(pos.accuracy)} m</div>
            )}
            {pos.ts && <div>갱신: {new Date(pos.ts).toLocaleString()}</div>}
          </div>

          {/* 간단한 지도 미리보기 (Google Maps 임베드, API 키 불필요) */}
          <div style={{ marginTop: 12 }}>
            <iframe
              title="map"
              src={mapEmbedSrc}
              width="100%"
              height={240}
              style={{ border: 0, borderRadius: 12 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div style={{ marginTop: 8 }}>
              <a
                href={`https://maps.google.com/?q=${pos.lat},${pos.lng}`}
                target="_blank"
                rel="noreferrer"
              >
                지도로 열기
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** --- 최소 스타일 --- */
const containerStyle: React.CSSProperties = {
  maxWidth: 420,
  margin: "24px auto",
  padding: 16,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, Apple SD Gothic Neo, Noto Sans KR, sans-serif",
};

const btnRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  marginTop: 12,
  flexWrap: "wrap",
};

const btnStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ddd",
  cursor: "pointer",
};

const panelStyle: React.CSSProperties = {
  marginTop: 12,
  padding: 12,
  border: "1px solid #eee",
  borderRadius: 12,
};
