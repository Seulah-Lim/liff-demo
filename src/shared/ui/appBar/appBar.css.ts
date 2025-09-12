// app/ui/AppBar/appBar.css.ts
import { APP_BAR_HEIGHT } from "@shared/const/layout";
import { style } from "@vanilla-extract/css";

const SIDE_SAFE = 96;

export const root = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: APP_BAR_HEIGHT,

  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  backgroundColor: " rgba(var(--bg-rgb), 0.1)",
  backdropFilter: "blur(10px)",
  zIndex: 10,
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

export const iconBtn = style({
  padding: "8px",
  borderRadius: "12px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
});
