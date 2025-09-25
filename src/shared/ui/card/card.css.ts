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
