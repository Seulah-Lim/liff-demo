import { APP_BAR_HEIGHT, CONTENT_BOTTOM_INSET } from "@shared/const/layout";
import { style, globalStyle, keyframes } from "@vanilla-extract/css";

/* ---------- CSS Variables (라이트/다크) ---------- */
const lightVars = {
  "--bg": "#f7f7f8",
  "--card": "#ffffff",
  "--border": "#e5e7eb",
  "--fg": "#111827",
  "--muted": "#6b7280",
  "--brand": "#111827",
  "--accent": "#10b981",
} as const;

const darkVars = {
  "--bg": "#0b0b0c",
  "--card": "#111214",
  "--border": "#1f2937",
  "--fg": "#e5e7eb",
  "--muted": "#9ca3af",
  "--brand": "#111827",
  "--accent": "#34d399",
} as const;

// 기본(라이트)
globalStyle(":root", { vars: lightVars });

// 다크 모드
globalStyle(":root", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: darkVars,
    },
  },
});

/* ---------- Reset & Base ---------- */
globalStyle("*", { boxSizing: "border-box" });
globalStyle("html, body, #root", { height: "100%" });
globalStyle("body", {
  margin: 0,
  background: "var(--bg)",
  color: "var(--fg)",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif',
});

/* ---------- Layout ---------- */
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
  gridTemplateRows: "auto auto 1fr auto", // 정보 / 시간선택 / 가변 / 버튼
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
export const sep = style({
  height: 1,
  background: "var(--border)",
  margin: "16px 0",
});

export const cardTint = style([
  card,
  {
    background: "linear-gradient(0deg, var(--tint), var(--tint)), var(--card)",
  },
]);

export const cardAvailable = style([
  cardTint,
  {
    vars: { "--tint": "rgba(16,185,129,0.06)" },
    "@media": {
      "(prefers-color-scheme: dark)": {
        vars: { "--tint": "rgba(16,185,129,0.10)" },
      },
    },
  },
]);

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

/* ---------- Buttons ---------- */
export const buttons = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 10,
  padding: 0,
});
export const buttonsTwo = style([
  buttons,
  { gridTemplateColumns: "1fr 1fr", gap: 12 },
]);

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
  { background: "transparent", color: "var(--fg)" },
]);
export const btnDanger = style([
  btn,
  { background: "#ef4444", borderColor: "#ef4444", color: "#fff" },
]);

/* ---------- Chips (Radio) ---------- */
export const chips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
});

export const chip = style({ position: "relative" });

export const chipInput = style({
  position: "absolute",
  opacity: 0,
  inset: 0,
});

export const chipLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid var(--border)",
  background: "transparent",
  fontSize: 14,
  cursor: "pointer",
});

globalStyle(`${chipInput}:checked + label`, {
  background: "var(--brand)",
  color: "#fff",
  borderColor: "var(--brand)",
});

/* ---------- Key-Value & Text utils ---------- */
export const kv = style({
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  gap: 8,
  fontSize: 15,
});
export const k = style({ color: "var(--muted)" });
export const small = style({ fontSize: 12, color: "var(--muted)" });
export const meta = style({ fontSize: 12, color: "var(--muted)" });

/* ---------- Pills (status) ---------- */
export const pill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  border: "1px solid var(--border)",
  background: "#eef2ff",
  color: "#3730a3",
});
export const pillGreen = style([
  pill,
  { background: "#ecfdf5", color: "#065f46", borderColor: "#a7f3d0" },
]);
export const pillBlue = style([
  pill,
  { background: "#e0e7ff", color: "#3730a3", borderColor: "#c7d2fe" },
]);
export const pillRed = style([
  pill,
  { background: "#fee2e2", color: "#991b1b", borderColor: "#fecaca" },
]);

export const dot = style({
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "currentColor",
  display: "inline-block",
});

/* ---------- Spinner ---------- */
export const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});
export const spinner = style({
  width: 16,
  height: 16,
  borderRadius: "50%",
  border: "2px solid rgba(0,0,0,0.15)",
  borderTopColor: "currentColor",
  animation: `${spin} 1s linear infinite`,
});

export const customArea = style({
  overflow: "hidden",
  maxHeight: 0,
  opacity: 0,
  marginTop: 0,
  transition:
    "max-height 220ms ease, opacity 200ms ease, margin-top 200ms ease",
});
export const customAreaOpen = style({
  maxHeight: 180,
  opacity: 1,
  marginTop: 10,
});

export const customRow = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto 1fr",
  alignItems: "center",
  gap: 8,
  marginTop: 4,
});

export const customLabel = style({
  fontSize: 13,
  color: "var(--muted)",
});

export const selectWrap = style({
  position: "relative",
});

export const select = style({
  width: "100%",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  background: "transparent",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 14,
  color: "var(--fg)",
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: "#93c5fd",
    },
  },
});

/* 약관 체크박스 행 */
export const termsRow = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: 14,
});

/* ---------- Summary ---------- */
export const summaryRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  marginTop: 10,
});
export const summaryValue = style({
  fontSize: 14,
  fontWeight: 700,
  color: "var(--fg)",
});

export const fabSticky = style({
  position: "fixed",
  bottom: 12,
  left: 12,
  right: 12,
  zIndex: 50,
});

//bottomsheet

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
