import { keyframes, style } from "@vanilla-extract/css";
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
  minHeight: "56px",
});

const dotWave = keyframes({
  "0%": { transform: "translateY(0)", opacity: 0.4 },
  "30%": { transform: "translateY(-4px)", opacity: 1 },
  "60%": { transform: "translateY(0)", opacity: 0.7 },
  "100%": { transform: "translateY(0)", opacity: 0.4 },
});

export const dots = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  color: "#fff",
  minWidth: 54,
  justifyContent: "center",
});

export const dot = style({
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "currentColor",
  animation: `${dotWave} 1s ease-in-out infinite`,
  selectors: {
    "&:nth-child(2)": { animationDelay: "0.15s" },
    "&:nth-child(3)": { animationDelay: "0.30s" },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});
