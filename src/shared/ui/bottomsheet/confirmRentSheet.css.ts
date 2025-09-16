import { keyframes, style } from "@vanilla-extract/css";

/* ---------- Bottom Sheet ---------- */
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
  padding: 16,
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

export const sheetHandle = style({
  width: 40,
  height: 4,
  borderRadius: 999,
  background: "var(--border)",
  margin: "0 auto 8px",
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
export const sheetRow = style({
  display: "grid",
  gridTemplateColumns: "100px 1fr",
  fontSize: 14,
  alignItems: "center",
});
export const sheetKey = style({ color: "var(--muted)" });
export const sheetVal = style({
  color: "var(--fg)",
  textAlign: "right",
  fontWeight: "bold",
  fontSize: "20px",
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

/* ----- Notes in sheet ----- */
export const sheetNotes = style({
  marginTop: 4,
  display: "grid",
  gap: 6,
  padding: 10,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "linear-gradient(0deg, rgba(0,0,0,0.02), rgba(0,0,0,0.02))",
});

export const sheetNote = style({
  position: "relative",
  paddingLeft: 16,
  fontSize: 12,
  color: "var(--muted)",
  lineHeight: "18px",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 6,
      top: 8,
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: "var(--brand)",
      opacity: 0.6,
    },
  },
});
