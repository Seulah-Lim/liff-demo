// inUseNotice.css.ts
import { APP_BAR_HEIGHT } from "@shared/const/layout";
import { style, globalStyle } from "@vanilla-extract/css";

const lightVars = {
  "--bg": "#f7f7f8",
  "--bg-rgb": "247, 247, 248",
  "--card": "#ffffff",
  "--border": "#e5e7eb",
  "--fg": "#111827",
  "--fg-rgb": "17, 24, 39",
  "--muted": "#6b7280",
  "--brand": "#111827",
  "--accent": "#10b981",
} as const;

const darkVars = {
  "--bg": "#0b0b0c",
  "--bg-rgb": "11, 11, 12",
  "--card": "#111214",
  "--border": "#1f2937",
  "--fg": "#e5e7eb",
  "--fg-rgb": "229, 231, 235",
  "--muted": "#9ca3af",
  "--brand": "#111827",
  "--accent": "#34d399",
} as const;

// 기본(라이트)
globalStyle(":root", { vars: lightVars });

// 다크 모드는 @media 안쪽에
globalStyle(":root", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: darkVars,
    },
  },
});

/* ----- Global reset / base ----- */
globalStyle("*", { boxSizing: "border-box" });
globalStyle("html, body, #root", { height: "100%" });

globalStyle("body", {
  margin: 0,
  background: "var(--bg)",
  color: "var(--fg)",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif',
});

/* ----- Layout ----- */
export const container = style({
  paddingTop: APP_BAR_HEIGHT,

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

export const sep = style({
  height: 1,
  background: "var(--border)",
  margin: "12px 0",
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
  border: "1px solid #e5e7eb",
});

export const pillBlue = style([
  pill,
  {
    background: "#e0e7ff",
    color: "#3730a3",
    borderColor: "#c7d2fe",
  },
]);
export const pillGreen = style([
  pill,
  {
    background: "#ecfdf5",
    color: "#065f46",
    borderColor: "#a7f3d0",
  },
]);
export const pillRed = style([
  pill,
  {
    background: "#fee2e2",
    color: "#991b1b",
    borderColor: "#fecaca",
  },
]);

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
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  color: "#9a3412",
  margin: "8px 0 4px",
});

export const iconCircle = style({
  width: 28,
  height: 28,
  borderRadius: 999,
  display: "grid",
  placeItems: "center",
  background: "#fed7aa",
  color: "#9a3412",
  fontWeight: 700,
});

/* Image */
export const imageCover = style({
  width: "100%",
  height: 120,
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  marginTop: 4,
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
