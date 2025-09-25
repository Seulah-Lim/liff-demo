import { style } from "@vanilla-extract/css";

/* 재사용할 수 있게 RentScreen의 스타일 일부만 가져옴 */
export const imageCover = style({
  width: "100%",
  height: 120,
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: 12,
  border: "1px solid var(--border)",
  marginBottom: 12,
});

export const kv = style({
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  gap: 8,
  fontSize: 14,
});
export const k = style({ color: "var(--muted)" });

export const row = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const batteryValue = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
});

export const metaHint = style({
  fontSize: 13,
  color: "var(--muted)",
  paddingLeft: 2,
  opacity: 0.7,
});

/* 상태 색상 (불투명도 포함) */
export const healthGood = style({
  color: "#16a34a",
  opacity: 0.72,
  "@media": {
    "(prefers-color-scheme: dark)": { color: "#34d399", opacity: 0.8 },
  },
});
export const healthWarn = style({
  color: "#d97706",
  opacity: 0.72,
  "@media": {
    "(prefers-color-scheme: dark)": { color: "#fbbf24", opacity: 0.8 },
  },
});
export const healthPoor = style({
  color: "#dc2626",
  opacity: 0.72,
  "@media": {
    "(prefers-color-scheme: dark)": { color: "#f87171", opacity: 0.8 },
  },
});

/* 작은 Pill */
export const pill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  border: "1px solid var(--border)",
});
export const pillGreen = style([
  pill,
  { background: "#ecfdf5", color: "#065f46", borderColor: "#a7f3d0" },
]);
export const pillPurple = style([
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
