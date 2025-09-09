import { style, globalStyle } from "@vanilla-extract/css";

const height = 64; // 네비 높이(px)

export const root = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 50,
  height: `${height}px`,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  alignItems: "stretch",

  // iOS 안전영역
  paddingBottom: "env(safe-area-inset-bottom)",

  // 반투명 블러 바
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -6px 20px rgba(0,0,0,0.06)",

  // iOS 탭 하이라이트 제거
  WebkitTapHighlightColor: "transparent",
});

export const item = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
  textDecoration: "none",
  color: "#444",
  fontSize: 12,
  fontWeight: 500,
  userSelect: "none",

  ":focus-visible": {
    outline: "none",
    boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.15)",
    borderRadius: 12,
  },

  // 터치 피드백
  selectors: {
    "&:active": {
      background: "rgba(0,0,0,0.04)",
    },
  },
});

export const active = style({
  color: "#111",
  fontWeight: 600,

  // 상단 활성 인디케이터
  "::after": {
    content: "",
    position: "absolute",
    top: 0,
    left: "20%",
    right: "20%",
    height: 3,
    borderRadius: 3,
    background: "#111",
    opacity: 0.9,
  },
});

export const icon = style({
  width: 22,
  height: 22,
  display: "block",
  fill: "currentColor",
});

export const label = style({
  lineHeight: 1,
  letterSpacing: 0.2,
});

// 컨텐츠가 네비에 가리지 않도록 하단 여백용
export const spacer = style({
  height: `calc(${height}px + env(safe-area-inset-bottom))`,
});

// 모바일에만 표시하고 싶다면 (옵션):
globalStyle("@media (min-width: 768px) { body .bottom-nav-hide-desktop }", {
  display: "none",
});
