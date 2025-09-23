import { style } from "@vanilla-extract/css";

export const toast = style({
  background: "rgba(var(--bg-rgb), 0.2)",
  backdropFilter: "blur(12px)",
  color: "var(--fg)",
  border: "1px solid var(--border)",
  boxShadow: "0 8px 24px rgba(0,0,0,.12)",
  minHeight: 44,
  width: "max-content",
  maxWidth: "100%",
  borderRadius: 14,
  fontSize: 12,
});
