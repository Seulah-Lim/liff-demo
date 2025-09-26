import { CTA_BOTTOM_GAP, SAFE_AREA_BOTTOM } from "@shared/const";
import { style } from "@vanilla-extract/css";

/* ---------- Rows / text ---------- */
export const row = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
});

export const meta = style({ color: "var(--muted)", fontSize: 12 });

/* ---------- Buttons ---------- */
export const twoButtonsGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
});

export const fabSticky = style({
  position: "fixed",
  bottom: `calc(${SAFE_AREA_BOTTOM} + ${CTA_BOTTOM_GAP})`,
  left: 12,
  right: 12,
  zIndex: 50,
});

/* ---------- Banner (success) ---------- */
export const bannerSuccess = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 12,
  borderRadius: 14,
  border: "1px solid var(--border)",
  background: "rgba(16,185,129,0.10)", // accent tint
});

export const bannerIcon = style({
  width: 28,
  height: 28,
  borderRadius: 999,
  background: "var(--accent)",
  boxShadow: "0 0 0 2px rgba(16,185,129,0.18)",
  flex: "0 0 auto",
});

export const bannerBody = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  lineHeight: 1.25,
});

export const bannerSub = style({
  margin: 0,
  color: "var(--muted)",
  fontSize: 12,
});

/* ---------- Rows / inline ---------- */
export const rowBetween = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
});

export const rowInline = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
});

/* ---------- Datetime ---------- */
export const datetime = style({
  fontVariantNumeric: "tabular-nums",
});

//------ bottom sheet -----//

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
