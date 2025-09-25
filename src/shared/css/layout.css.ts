import {
  APP_BAR_HEIGHT,
  CTA_AREA,
  SAFE_AREA_BOTTOM,
} from "@shared/const/layout";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    paddingTop: APP_BAR_HEIGHT,

    vars: { "--pb": SAFE_AREA_BOTTOM },
    paddingBottom: "var(--pb)",
  },
  variants: {
    cta: {
      true: {
        vars: { "--pb": `calc(${SAFE_AREA_BOTTOM} + ${CTA_AREA})` },
      },
      false: {},
    },
  },
  defaultVariants: { cta: false },
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
  gridTemplateRows: "auto auto 1fr auto",
  padding: 12,
});
