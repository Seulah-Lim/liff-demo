// src/shared/ui/modal/Modal.css.ts
import { style } from "@vanilla-extract/css";

export const overlayStyle = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: 16, // 모바일 좌우 여백
});

export const panelStyle = style({
  background: "#fff",
  borderRadius: 12,
  width: "100%",
  maxWidth: 480,
  maxHeight: "85vh",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  padding: "20px",
  gap: "20px",
});

export const headerStyle = style({});

export const titleStyle = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.4,
  color: "#111",
  textAlign: "center",
});

export const bodyStyle = style({
  color: "#333",
  overflow: "auto",
  textAlign: "center",
});

export const footerStyle = style({});

export const actionsStyle = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,

  // 버튼이 1개면 가운데 정렬 느낌을 위해 전체폭 사용
  selectors: {
    "&:has(> :only-child)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const actionBtnStyle = style({
  appearance: "none",
  border: "1px solid transparent",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  lineHeight: 1.2,
});

export const primaryBtnStyle = style({
  background: "#111",
  color: "#fff",
  ":active": { transform: "translateY(0.5px)" },
});

export const secondaryBtnStyle = style({
  background: "#f3f4f6",
  color: "#111",
  borderColor: "rgba(0,0,0,0.08)",
  ":active": { transform: "translateY(0.5px)" },
});

export const dangerBtnStyle = style({
  background: "#ef4444",
  color: "#fff",
  ":active": { transform: "translateY(0.5px)" },
});
