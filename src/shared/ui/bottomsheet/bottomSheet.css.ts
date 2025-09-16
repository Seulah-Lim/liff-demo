import { keyframes, style } from "@vanilla-extract/css";

const slideUp = keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "translateY(0)" },
});
// const fadeIn = keyframes({
//   "0%": { opacity: 0 },
//   "100%": { opacity: 1 },
// });

export const sheetOverlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.4)",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 180ms ease",
});
export const sheetOverlayOpen = style({
  opacity: 1,
  pointerEvents: "auto",
});

export const sheet = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  transform: "translateY(100%)",
  background: "var(--card)",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  boxShadow: "0 -8px 24px rgba(0,0,0,.2)",
  padding: "0px 16px 20px 16px",
  zIndex: 60,
  maxHeight: "80dvh",
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  gap: 12,
});
export const sheetOpen = style({
  transform: "translateY(0)",
  animation: `${slideUp} 200ms ease`,
});

export const sheetHandleArea = style({
  width: "100%",
  padding: "8px 0px 8px 0px ",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  touchAction: "none",
});

export const sheetHandle = style({
  width: 40,
  height: 4,
  borderRadius: 999,
  background: "var(--border)",
});

export const sheetHeader = style({
  display: "grid",
  gap: 6,
});
export const sheetTitle = style({
  fontSize: 16,
  fontWeight: 700,
});
export const sheetMeta = style({
  fontSize: 12,
  color: "var(--muted)",
});

export const sheetBody = style({
  overflowY: "auto",
  display: "grid",
  gap: 10,
  padding: "4px 0",
});

export const sheetFooter = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  position: "sticky",
  bottom: 0,
  background: "var(--card)",
});

export const sheetBtnBase = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "14px 12px",
  borderRadius: 12,
  border: "1px solid var(--border)",
  fontWeight: 700,
  fontSize: 14,
});
export const sheetBtnPrimary = style([
  sheetBtnBase,
  { background: "var(--brand)", color: "#fff" },
]);
export const sheetBtnGhost = style([
  sheetBtnBase,
  { background: "transparent", color: "var(--fg)" },
]);
