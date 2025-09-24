import { APP_BAR_HEIGHT, CONTENT_BOTTOM_INSET } from "@shared/const/layout";
import { style } from "@vanilla-extract/css";

export const container = style({
  paddingTop: APP_BAR_HEIGHT,
  paddingBottom: CONTENT_BOTTOM_INSET,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

export const app = style({
  width: "100vw",
  maxWidth: "100vw",
  display: "flex",
  flexDirection: "column",
  background: "var(--bg)",
});

export const content = style({
  flex: 1,
  display: "grid",
  gap: 12,
  gridTemplateRows: "auto auto 1fr auto",
  padding: 12,
});

/* ---------- Card ---------- */
export const card = style({
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  boxShadow: "0 1px 0 rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04)",
  padding: 16,
});

export const cardTitle = style({
  margin: "0 0 8px 0",
  fontSize: 16,
});

export const cardTint = style([
  card,
  {
    background: "linear-gradient(0deg, var(--tint), var(--tint)), var(--card)",
  },
]);

export const cardInUse = style([
  cardTint,
  {
    vars: { "--tint": "rgba(99,102,241,0.06)" },
    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: { "--tint": "rgba(99,102,241,0.10)" },
      },
    },
  },
]);

export const hint = style({ fontSize: 12, color: "var(--muted)" });

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
export const buttons = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
});

export const btn = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "16px 14px",
  borderRadius: 14,
  border: "1px solid var(--border)",
  background: "var(--brand)",
  color: "#fff",
  fontWeight: 700,
  textDecoration: "none",
});

export const btnSecondary = style([
  btn,
  { background: "#fff", color: "var(--brand)" },
]);

/* ---------- KV grid ---------- */
export const kv = style({
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  gap: 8,
  fontSize: 15,
});

export const k = style({ color: "var(--muted)" });

/* ---------- Image ---------- */
export const imageCover = style({
  width: "100%",
  height: 120,
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: 12,
  border: "1px solid var(--border)",
  marginBottom: 12,
});

/* ---------- Pill (status) ---------- */
export const pill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  border: "1px solid #a5b4fc",
  background: "#e0e7ff",
  color: "#3730a3",
});

export const dot = style({
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "currentColor",
  display: "inline-block",
});

export const fabSticky = style({
  position: "fixed",
  bottom: 12,
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

/* ---------- Battery meter ---------- */
export const batteryWrap = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const batteryBar = style({
  position: "relative",
  width: "100%",
  height: 8,
  borderRadius: 999,
  background: "linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.02))",
  border: "1px solid var(--border)",
  overflow: "hidden",
});

export const batteryFill = style({
  height: "100%",
  borderRadius: 999,
  background: "var(--accent)",
  transition: "width .25s ease",
});

export const batteryPct = style({
  fontSize: 12,
  color: "var(--muted)",
  fontVariantNumeric: "tabular-nums",
});

/* ---------- Station list (minimal) ---------- */
export const stationListMinimal = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: 8,
});

export const stationRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  selectors: {
    "&:hover": { background: "rgba(0,0,0,.03)" },
    "&:active": { transform: "translateY(0.5px)" },
  },
  transition: "background .15s ease, transform .05s ease",
});

export const stationMain = style({
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const stationName = style({
  fontSize: 12,
  fontWeight: 600,
  color: "var(--fg)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const stationSub = style({
  fontSize: 10,
  color: "var(--muted)",
});

export const stationAside = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const slotPill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontVariantNumeric: "tabular-nums",
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--fg)",
});

export const disclosureBtn = style({
  width: 28,
  height: 28,
  borderRadius: 999,
  border: "1px solid transparent",
  background: "transparent",
  color: "var(--muted)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "default",
  selectors: {
    "&:hover": { color: "var(--fg)" },
    "&:focus-visible": { outline: "none", borderColor: "var(--border)" },
  },
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

export const status_여유 = style({
  borderColor: "rgba(20, 160, 80, .35)",
  background: "rgba(20, 160, 80, .08)",
  color: "rgb(20, 140, 80)",
});

export const status_보통 = style({
  borderColor: "rgba(180, 140, 30, .35)",
  background: "rgba(180, 140, 30, .08)",
  color: "rgb(160, 120, 30)",
});

export const status_혼잡 = style({
  borderColor: "rgba(200, 60, 60, .35)",
  background: "rgba(200, 60, 60, .08)",
  color: "rgb(180, 50, 50)",
});

export const status_없음 = style({
  borderColor: "var(--border)",
  background: "transparent",
  color: "var(--muted)",
});
