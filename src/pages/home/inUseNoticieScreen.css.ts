// inUseNotice.css.ts
import { APP_BAR_HEIGHT, SAFE_AREA_BOTTOM } from "@shared/const/layout";
import { style } from "@vanilla-extract/css";

/* ----- Layout ----- */
export const container = style({
  paddingTop: APP_BAR_HEIGHT,
  paddingBottom: SAFE_AREA_BOTTOM,
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
  padding: 12,
  gridTemplateRows: "auto auto",
});

/* ----- Card / blocks ----- */
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

export const cardBusy = style([
  cardTint,
  {
    vars: { "--tint": "rgba(239,68,68,0.06)" },
    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: { "--tint": "rgba(239,68,68,0.10)" },
      },
    },
  },
]);
/* key-value grid */
export const kv = style({
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  gap: 8,
  fontSize: 15,
});

export const keyText = style({
  color: "#6b7280",
});

export const meta = style({
  color: "#6b7280",
  fontSize: 12,
});

/* ----- Buttons (옵션) ----- */
export const btn = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "16px 14px",
  borderRadius: 14,
  border: "1px solid #e5e7eb",
  background: "#111827",
  color: "#fff",
  fontWeight: 700,
  textDecoration: "none",
});
export const btnSecondary = style([
  btn,
  {
    background: "transparent",
    color: "inherit",
  },
]);
export const btnDisabled = style([
  btn,
  {
    background: "#f3f4f6",
    color: "#9ca3af",
    borderColor: "#e5e7eb",
    cursor: "not-allowed",
  },
]);

export const buttons = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
});

/* ----- Pill badges ----- */
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

/* ----- Banner ----- */

export const banner = style({
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  padding: 12,
  borderRadius: 12,
  marginBottom: 12,
  background: "rgba(239, 68, 68, 0.10)",
  color: "var(--fg)",
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "rgba(239, 68, 68, 0.16)",
      border: "1px solid rgba(239,68,68,0.36)",
    },
  },
});

export const iconCircle = style({
  width: 28,
  height: 28,
  borderRadius: 999,
  display: "grid",
  placeItems: "center",
  background: "rgba(239,68,68,0.16)",
  color: "#b91c1c",
  border: "1px solid rgba(239,68,68,0.30)",
  boxShadow: "0 1px 0 rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.06)",
  fontWeight: 700,
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "rgba(239,68,68,0.24)",
      color: "#fecaca",
      border: "1px solid rgba(239,68,68,0.38)",
      boxShadow:
        "0 1px 0 rgba(0,0,0,0.16), inset 0 0 0 1px rgba(255,255,255,0.04)",
    },
  },
});

export const imageCover = style({
  width: "100%",
  height: 120,
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  marginBottom: 12,
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

// 상태 배지 색상 (여유/보통/혼잡/없음)
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
