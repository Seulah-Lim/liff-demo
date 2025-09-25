import { style } from "@vanilla-extract/css";

export const card = style({
  width: "100%", // TODO 뺄지말지봐야함
  background:
    "linear-gradient(0deg, var(--tint, transparent), var(--tint, transparent)), var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  boxShadow: "0 1px 0 rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04)",
  padding: 16,
});

export const withAdaptiveTint = style({
  vars: {
    "--tint": "var(--tint-light, transparent)",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: { "--tint": "var(--tint-dark, transparent)" },
    },
  },
});

export const cardTitle = style({
  margin: "0 0 8px 0",
  fontSize: 16,
});
