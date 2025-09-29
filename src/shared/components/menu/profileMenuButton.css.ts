import { APP_BAR_HEIGHT } from "@shared/const";
import { style } from "@vanilla-extract/css";

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
  fill: "var(--fg)",
});

export const iconBtn = style({
  padding: "8px",
  borderRadius: "12px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
});

export const menu = style({
  position: "fixed",
  right: 12,
  top: APP_BAR_HEIGHT,
  borderRadius: 14,
  backgroundColor: "rgba(var(--bg-rgb), 0.5)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(var(--fg-rgb),0.08)",
  boxShadow: "0 12px 32px rgba(var(--fg-rgb),0.18)",
  padding: 8,
  transformOrigin: "top right",
  width: 160,
});

// export const menuHeader = style({
//   display: "flex",
//   flexDirection: "column",
//   gap: "6px",
//   alignItems: "flex-start",
//   margin: "0px 12px",
// });

// export const greetingClamp = style({
//   margin: 0,
//   fontSize: 12,
//   lineHeight: 1.4,
//   opacity: 0.7,
//   display: "-webkit-box",
//   WebkitBoxOrient: "vertical",
//   WebkitLineClamp: 2, // ★ 2줄 제한
//   overflow: "hidden",
//   textOverflow: "ellipsis", // 보조용
// });

export const nameInline = style({
  fontWeight: 600,
});

export const divider = style({
  height: 1,
  background: "rgba(var(--fg-rgb), 0.1)",
  margin: "6px 8px",
});

export const menuItem = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 10,
  color: "inherit",
  textDecoration: "none",
  userSelect: "none",
  cursor: "pointer",
  fontSize: 14,
  lineHeight: 1.2,
  transition: "background 120ms ease, transform 60ms ease",
  selectors: {
    "&:hover": { background: "rgba(var(--fg-rgb), 0.06)" },
    "&:active": { background: "rgba(var(--fg-rgb), 0.10)" },
    "&:focus-visible": {
      outline: "2px solid rgba(var(--fg-rgb), 0.35)",
      outlineOffset: 2,
    },
  },
});

export const destructive = style({
  color: "rgb(220, 53, 69)",
  selectors: {
    "&:hover": { background: "rgba(var(--bg-rgb), 0.08)" },
    "&:active": { background: "rgba(var(--bg-rgb), 0.14)" },
    "&:focus-visible": {
      outlineColor: "rgba(220,53,69,0.5)",
    },
  },
});

export const menuIcon = style({
  width: 16,
  height: 16,
  display: "block",
  opacity: 0.9,
});

export const avatarBtn = style({
  padding: "8px",
  borderRadius: "12px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
});

export const avatar = style({
  width: 28,
  height: 28,
  borderRadius: "50%",
  objectFit: "cover",
});

export const avatarFallback = style({
  width: 28,
  height: 28,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "#f3f4f6",
  color: "#6b7280",
  fontWeight: 600,
  border: "1px solid #e5e7eb",
});

export const menuHeader = style({
  padding: "6px 12px 4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "6px",
  textAlign: "left",
});

export const greetingClamp = style({
  margin: 0, // <-- p 기본 margin 제거: 들뜸 방지
  lineHeight: 1.35,
});

export const statusRow = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  alignSelf: "flex-start", // 부모 좌측 기준으로 딱 붙게
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: "12px",
  fontSize: "11px",
  lineHeight: 1.6,
});

export const badgeOk = style({
  background: "rgba(16,185,129,.15)",
  color: "#10b981",
});

export const badgeWarn = style({
  background: "rgba(234,179,8,.15)",
  color: "#eab308",
});

export const inlineBtn = style({
  padding: 0,
  background: "none",
  border: "none",
  textDecoration: "underline",
  fontSize: "12px",
  cursor: "pointer",
  color: "var(--fg)",
});
