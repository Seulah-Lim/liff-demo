import { style } from "@vanilla-extract/css";

export const stationListMinimal = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: 8,
});

export const stationRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  selectors: {
    "&:hover": { background: "rgba(0,0,0,.03)" },
    "&:active": { transform: "translateY(0.5px)" },
  },
  transition: "background .15s ease, transform .05s ease",
});

export const stationMain = style({
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const stationName = style({
  fontSize: 12,
  fontWeight: 600,
  color: "var(--fg)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const stationSub = style({
  fontSize: 10,
  color: "var(--muted)",
});

export const stationAside = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const slotPill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontVariantNumeric: "tabular-nums",
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--fg)",
});

export const disclosureBtn = style({
  width: 28,
  height: 28,
  borderRadius: 999,
  border: "1px solid transparent",
  background: "transparent",
  color: "var(--muted)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "default",
  selectors: {
    "&:hover": { color: "var(--fg)" },
    "&:focus-visible": { outline: "none", borderColor: "var(--border)" },
  },
});
export const status_여유 = style({
  borderColor: "rgba(20, 160, 80, .35)",
  background: "rgba(20, 160, 80, .08)",
  color: "rgb(20, 140, 80)",
});

export const status_보통 = style({
  borderColor: "rgba(180, 140, 30, .35)",
  background: "rgba(180, 140, 30, .08)",
  color: "rgb(160, 120, 30)",
});

export const status_혼잡 = style({
  borderColor: "rgba(200, 60, 60, .35)",
  background: "rgba(200, 60, 60, .08)",
  color: "rgb(180, 50, 50)",
});

export const status_없음 = style({
  borderColor: "var(--border)",
  background: "transparent",
  color: "var(--muted)",
});
