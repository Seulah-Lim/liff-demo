import { APP_BAR_HEIGHT } from "@shared/const";
import { style } from "@vanilla-extract/css";

// 전체 배경
export const main = style({
  height: "100vh",
  paddingTop: APP_BAR_HEIGHT,
  width: "100vw",
  background: "var(--bg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  boxSizing: "border-box",
});

// 카드
export const card = style({
  width: "100vw",
  maxWidth: 420,
  padding: 24,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

// 헤더 영역
export const head = style({
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
});

export const headText = style({
  flex: 1,
});

export const title = style({
  fontSize: 20,
  fontWeight: 600,

  margin: "0 0 4px",
});

export const message = style({
  fontSize: 14,
  color: "#475569",
  lineHeight: 1.6,
  margin: 0,
  whiteSpace: "pre-line",
});

export const detail = style({
  marginTop: 8,
  fontSize: 12,
  color: "#64748b",
  whiteSpace: "pre-line",
});

export const support = style({
  marginTop: 4,
  fontSize: 11,
  color: "#94a3b8",
});

// 버튼 영역
export const buttonsWrapperStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

// 푸터 도움말
export const footer = style({
  marginTop: 24,
  paddingTop: 16,
  borderTop: "1px solid #e2e8f0",
});

export const help = style({
  margin: 0,
  paddingLeft: 18,
  display: "grid",
  gap: 4,
  color: "#64748b",
  fontSize: 12,
  lineHeight: 1.5,
});
