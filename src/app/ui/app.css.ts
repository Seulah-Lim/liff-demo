// app/ui/AppBar/appBar.css.ts
import { style } from "@vanilla-extract/css";

const APP_BAR_HEIGHT = "56px";
const SIDE_SAFE = 96; // 좌/우 아이콘 영역 안전폭(px)

export const root = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: APP_BAR_HEIGHT,

  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  backgroundColor: "rgba(255, 255, 255, 0.10)",
  backdropFilter: "blur(10px)",
  zIndex: 10,
});

export const spacer = style({
  height: APP_BAR_HEIGHT,
});

export const left = style({
  width: `${SIDE_SAFE}px`,
  display: "flex",
  alignItems: "center",
});

/** 제목: 화면 전체 기준 정확히 중앙 */
export const title = style({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",

  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "1.2",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",

  // 제목 클릭이 필요 없으면 주석 해제해서 터치 이벤트 통과시키기
  // pointerEvents: "none",
});

/** 오른쪽 아이콘 영역: 화면 오른쪽 끝 정렬 */
export const actions = style({
  marginLeft: "auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
});

export const icon = style({
  width: "20px",
  height: "20px",
  display: "block",
  fill: "currentColor",
});

export const iconBtn = style({
  padding: "8px",
  borderRadius: "12px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&:hover": { background: "rgba(0,0,0,0.05)" },
    "&:active": { background: "rgba(0,0,0,0.10)" },
    "&:focus-visible": {
      outline: "2px solid rgba(0,0,0,0.35)",
      outlineOffset: "2px",
    },
  },
});

export const menu = style({
  position: "fixed",
  top: APP_BAR_HEIGHT,
  right: 0,
  borderRadius: "12px",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  border: "1px solid rgba(0,0,0,0.08)",
  padding: "4px 40px 4px 8px",
  zIndex: 20,
});

export const menuItem = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 12px",
  borderRadius: "10px",
  color: "inherit",
  textDecoration: "none",
  userSelect: "none",
  selectors: {
    "&:hover": { background: "rgba(0,0,0,0.05)" },
    "&:active": { background: "rgba(0,0,0,0.10)" },
    "&:focus-visible": {
      outline: "2px solid rgba(0,0,0,0.35)",
      outlineOffset: "2px",
    },
  },
});

export const menuIcon = style({
  width: "16px",
  height: "16px",
  display: "block",
  fill: "currentColor",
});
