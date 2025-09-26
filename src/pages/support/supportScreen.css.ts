import { style } from "@vanilla-extract/css";

/* Page */
export const pageHeader = style({
  display: "grid",
  gap: "6px",
  marginBottom: "8px",
});

export const title = style({
  margin: 0,
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "-0.01em",
});

export const subtitle = style({
  margin: 0,
  fontSize: "13px",
  opacity: 0.8,
});

/* Section */
export const sectionCard = style({
  display: "grid",
  gap: "12px",
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
});

export const sectionKicker = style({
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.02em",
  opacity: 0.9,
});

export const sectionNote = style({
  fontSize: "12px",
  opacity: 0.6,
});

/* Quick actions (cards) */
export const quickCardGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  "@media": { "(min-width: 420px)": { gridTemplateColumns: "1fr 1fr" } },
});

export const quickTextCol = style({
  display: "grid",
  gap: "2px",
  textAlign: "left",
});

export const quickCard = style({
  display: "grid",
  gap: 4,
  gridTemplateColumns: "36px 1fr",
  alignItems: "center",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "rgba(var(--fg-rgb), 0.02)",
  boxShadow:
    "0 1px 0 rgba(var(--fg-rgb),0.04), 0 1px 2px rgba(var(--fg-rgb),0.06)",
  transition:
    "background 120ms ease, border-color 120ms ease, box-shadow 120ms ease",
  selectors: {
    "&:hover": {
      background: "rgba(var(--fg-rgb), 0.04)",
      borderColor: "rgba(var(--fg-rgb), 0.16)",
    },
    "&:active": {
      background: "rgba(var(--fg-rgb), 0.06)",
      transform: "translateY(0)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
    "&:focus-visible": {
      outline: "2px solid var(--accent)",
      outlineOffset: "2px",
    },
  },
});

export const quickTitle = style({
  fontSize: "14px",
  fontWeight: 700,
  color: "var(--fg)",
});

export const quickDesc = style({
  fontSize: "12px",
  opacity: 0.7,
  color: "var(--fg)",
});

/* Support rows */
export const supportRow = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  gap: "10px",
});

export const supportItem = style({
  display: "grid",
  gap: "2px",
});

export const supportTitle = style({
  fontSize: "14px",
  fontWeight: 600,
});

export const supportDesc = style({
  fontSize: "12px",
  opacity: 0.8,
});

/* Form */
export const fieldLabel = style({
  fontSize: "13px",
  fontWeight: 600,
});

export const textareaWrap = style({
  position: "relative",
});

export const textarea = style({
  width: "100%",
  minHeight: "112px",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(var(--fg-rgb), 0.12)",
  background: "transparent",
  fontSize: "14px",
  lineHeight: "1.5",
  resize: "vertical",
});

export const charCounter = style({
  position: "absolute",
  right: "10px",
  bottom: "8px",
  fontSize: "11px",
  opacity: 0.6,
});

/* Dropzone */
export const dropzone = style({
  position: "relative",
  display: "grid",
  placeItems: "center",
  minHeight: "200px",
  borderRadius: "12px",
  border: "1.5px dashed var(--border)",
  background: "rgba(var(--fg-rgb), 0.02)",
  padding: "10px",
  cursor: "pointer",
  transition: "border-color 120ms ease, background 120ms ease",
  WebkitTapHighlightColor: "transparent", // iOS 파란 하이라이트 제거
  userSelect: "none", // 텍스트 선택 방지
  pointerEvents: "none",
});

export const fileInput = style({
  position: "absolute",
  inset: 0,
  opacity: 0,
  cursor: "pointer",
});

export const dropInner = style({
  display: "grid",
  gap: "4px",
  textAlign: "center",
});

export const dropHint = style({
  fontSize: "12px",
  opacity: 0.7,
});

/* Form actions */
export const formActions = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "8px",
  marginTop: "8px",
});

export const smallActions = style({
  marginTop: "4px",
  display: "flex",
  justifyContent: "flex-end",
});
export const quickSvg = style({
  width: 24,
  height: 24,
  flex: "0 0 28px",
  color: "var(--fg)",
  opacity: 0.7,
});

export const previewWrap = style({
  width: "100%",
  height: "180px",
  overflow: "hidden",
  borderRadius: "10px",
  background: "rgba(var(--fg-rgb), 0.04)",
});

export const previewImg = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const previewOverlay = style({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
  padding: "16px 20px",
  color: "#fff",
});

export const previewHint = style({
  fontSize: "12px",
  opacity: 0.95,
});

export const previewRemove = style({
  fontSize: "12px",
  padding: "6px 10px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.6)",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  selectors: {
    "&:hover": { background: "rgba(255,255,255,0.16)" },
  },
});

export const pickRow = style({
  marginTop: 10,
  display: "flex",
  gap: 12,
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "auto",
});

export const previewActions = style({
  display: "flex",
  gap: 8,
  alignItems: "center",
  pointerEvents: "auto",
});

// export const ghostBtn = style({
//   fontSize: "12px",
//   padding: "6px 10px",
//   borderRadius: 8,
//   border: "1px solid rgba(255,255,255,0.6)",
//   background: "rgba(255,255,255,0.1)",
//   color: "#fff",
//   selectors: { "&:hover": { background: "rgba(255,255,255,0.16)" } },
// });

export const ghostBtn = style({
  fontSize: "12px",
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.12)",
  color: "var(--card)",
  WebkitBackdropFilter: "blur(8px)",
  backdropFilter: "blur(8px)",
  transition: "background 120ms ease, border-color 120ms ease",
  selectors: {
    "&:hover": { background: "rgba(255,255,255,0.18)" },
    "&:active": { background: "rgba(255,255,255,0.22)" },
  },
});

export const iconBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 60,
  height: 40,
  borderRadius: 10,

  border: "1px solid var(--border)",
  background: "rgba(var(--fg-rgb), 0.02)",
  boxShadow:
    "0 1px 0 rgba(var(--fg-rgb),0.04), 0 1px 2px rgba(var(--fg-rgb),0.06)",
  transition:
    "background 120ms ease, border-color 120ms ease, box-shadow 120ms ease",
  color: "var(--fg)",
  cursor: "pointer",

  selectors: {
    "&:hover": {
      background: "rgba(var(--fg-rgb), 0.06)",
      borderColor: "rgba(var(--fg-rgb), 0.16)",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
    "&:focus-visible": {
      outline: "2px solid var(--accent)",
      outlineOffset: 2,
    },
  },
});

export const iconSvg = style({
  width: 18,
  height: 18,
  flex: "0 0 18px",
  fill: "var(--fg)",
  opacity: 0.6,
});
