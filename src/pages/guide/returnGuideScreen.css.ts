// returnExtendGuide.css.ts
import { APP_BAR_HEIGHT } from "@shared/const/layout";
import { style } from "@vanilla-extract/css";

/* ---------- Layout ---------- */
export const container = style({
  height: "100vh",
  paddingTop: APP_BAR_HEIGHT,
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

export const content = style({
  flex: 1,
  display: "grid",
  gap: 12,
  gridTemplateRows: "auto auto 1fr auto", // 정보 / 시간선택 / 가변 / 버튼
  padding: 12,
});

/* ---------- Card / text ---------- */
export const card = style({
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  boxShadow: "0 1px 0 rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04)",
  padding: 16,
});

export const row = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
});

export const meta = style({ color: "var(--muted)", fontSize: 12 });

export const sep = style({
  height: 1,
  background: "var(--border)",
  margin: "12px 0",
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

/* ---------- Lists / items ---------- */
export const list = style({
  display: "grid",
  gap: 10,
});

export const item = style({
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  padding: 12,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "transparent",
});

export const sub = style({ color: "var(--muted)", fontSize: 12 });

/* ---------- Map placeholder ---------- */
export const map = style({
  height: 140,
  border: "1px dashed var(--border)",
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  color: "var(--muted)",
  fontSize: 12,
});

/* ---------- Form & helpers ---------- */
export const label = style({
  fontSize: 13,
  color: "var(--muted)",
  marginBottom: 6,
});

export const input = style({
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--fg)",
  fontSize: 14,
});

export const textarea = style([input, { minHeight: 120, resize: "vertical" }]);

export const file = style({ display: "flex", gap: 10, alignItems: "center" });

export const hint = style({ fontSize: 12, color: "var(--muted)" });
export const small = style({ fontSize: 12, color: "var(--muted)" });

export const softHr = style({
  border: 0,
  height: 1,
  background: "var(--border)",
  margin: "8px 0",
});

/* ---------- Badge & Pill ---------- */
export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "3px 8px",
  borderRadius: 999,
  background: "#eef2ff",
  color: "#3730a3",
  fontSize: 12,
});

export const pill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  border: "1px solid var(--border)",
  background: "#e0e7ff", // 기본: blue 톤
  color: "#3730a3",
});

export const dot = style({
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "currentColor",
  display: "inline-block",
});

/* ---------- KV grid ---------- */
export const kv = style({
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  gap: 8,
  fontSize: 15,
});
export const k = style({ color: "var(--muted)" });
