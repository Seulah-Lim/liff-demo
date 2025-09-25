// supportScreen.css.ts
import { CTA_BOTTOM_GAP, SAFE_AREA_BOTTOM } from "@shared/const/layout";
import { style } from "@vanilla-extract/css";

export const sep = style({
  height: 1,
  background: "var(--border)",
  margin: "12px 0",
});

export const meta = style({ color: "var(--muted)", fontSize: 12 });

/* ---------- Lists & Items ---------- */
export const list = style({ display: "grid", gap: 10 });

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

/* ---------- Map Placeholder ---------- */
export const map = style({
  height: 140,
  border: "1px dashed var(--border)",
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  color: "var(--muted)",
  fontSize: 12,
});

/* ---------- Form ---------- */
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

/* ---------- Buttons ---------- */
export const fabSticky = style({
  position: "fixed",
  bottom: `calc(${SAFE_AREA_BOTTOM} + ${CTA_BOTTOM_GAP})`,
  left: 12,
  right: 12,
  zIndex: 50,
});

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

/* ---------- Badge ---------- */
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
