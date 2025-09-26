import { style } from "@vanilla-extract/css";

export const meta = style({
  color: "#6b7280",
  fontSize: 12,
});

/* ----- Banner ----- */

export const banner = style({
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  padding: 12,
  borderRadius: 12,
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
