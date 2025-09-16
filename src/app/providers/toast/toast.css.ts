import { CONTENT_BOTTOM_INSET } from "@shared/const/layout";
import { style, globalStyle } from "@vanilla-extract/css";

export const toast = style({
  background: "var(--card)",
  color: "var(--fg)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  boxShadow: "0 8px 24px rgba(0,0,0,.12)",
  minHeight: 44,
});

globalStyle(".Toastify__toast-body", {
  fontSize: 12,
  lineHeight: "20px",
});

globalStyle(".Toastify__toast-container", {
  padding: `0px 12px calc(${CONTENT_BOTTOM_INSET} + 12px) 12px`,
});

globalStyle(".Toastify__toast", {
  width: "max-content",
  maxWidth: "100%",
  borderRadius: 14,
  background: "rgba(var(--fg-rgb), 0.8)",

  color: "var(--bg)",
});
