import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const button = recipe({
  base: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px 14px",
    borderRadius: 14,
    border: "1px solid var(--border)",
    textDecoration: "none",
    fontWeight: 700,
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    transition: "transform 0.05s ease, opacity 0.2s ease, background 0.2s ease",
    minHeight: "56px", // 로딩 전/후 높이 안정
    selectors: {
      "&:active": { transform: "translateY(1px)" },
      "&:disabled": {
        cursor: "not-allowed",
        pointerEvents: "none",
      },
      "&[aria-disabled='true']": {
        opacity: 0.6,
        pointerEvents: "none",
        cursor: "not-allowed",
      },
      '&[data-loading="true"]': { pointerEvents: "none" }, // 로딩 중 중복클릭 방지
      "&:focus-visible": {
        outline: "2px solid color-mix(in oklab, var(--brand), white 30%)",
        outlineOffset: 2,
      },
      // 텍스트 선택 방지(모바일 롱프레스 대응)
      "&::selection": { background: "transparent" },
    },
  },
  variants: {
    variant: {
      primary: {
        background: "var(--brand)",
        color: "#fff",
      },
      secondary: {
        background: "#fff",
        color: "var(--brand)",
      },
    },
    size: {
      large: {
        minHeight: 56,
        padding: "16px 16px",
        fontSize: 16,
        lineHeight: "20px",
      },
      medium: {
        minHeight: 48,
        padding: "12px 14px",
        fontSize: 15,
        lineHeight: "18px",
      },
      small: {
        minHeight: 40,
        padding: "10px 12px",
        fontSize: 14,
        lineHeight: "16px",
      },
    },
    fullWidth: {
      on: { width: "100%" },
      off: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "large",
    fullWidth: "on",
  },
});

// --- Loading dots ---
const dotWave = keyframes({
  "0%": { transform: "translateY(0)", opacity: 0.4 },
  "30%": { transform: "translateY(-4px)", opacity: 1 },
  "60%": { transform: "translateY(0)", opacity: 0.7 },
  "100%": { transform: "translateY(0)", opacity: 0.4 },
});

export const dots = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  color: "inherit",
  minWidth: 54, // 텍스트 폭 대비로 흔들림 방지
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
