// rentScreen.css.ts
import { style, globalStyle } from "@vanilla-extract/css";

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

// 다크 모드는 @media 안쪽에
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
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

export const app = style({
  width: "100vw",
  maxWidth: "100vw",
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: "var(--bg)",
});

export const appbar = style({
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "transparent",
  borderBottom: 0,
  padding: "calc(12px + env(safe-area-inset-top)) 16px 12px 16px",
  textAlign: "center",
  fontWeight: 600,
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

globalStyle(`${card} h3`, {
  margin: "0 0 8px 0",
  fontSize: 16,
});

export const sep = style({
  height: 1,
  background: "var(--border)",
  margin: "12px 0",
});

/* ---------- Image ---------- */
export const imageCover = style({
  width: "100%",
  height: 120,
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: 12,
  border: "1px solid var(--border)",
  marginTop: 8,
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
  {
    background: "transparent",
    color: "var(--fg)",
  },
]);

export const btnDanger = style([
  btn,
  {
    background: "#ef4444",
    borderColor: "#ef4444",
    color: "#fff",
  },
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

// input:checked + label
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
