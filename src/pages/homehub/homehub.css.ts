import { style } from "@vanilla-extract/css";

export const card = style({
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
});

export const container = style({
  maxWidth: 640,
  margin: "24px auto 48px",
  padding: 16,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
  display: "grid",
  gap: 16,
});

export const h2 = style({
  margin: "0 0 8px",
  fontSize: 18,
});

export const btn = style({
  padding: "10px 14px",
  border: "1px solid #d1d5db",
  borderRadius: 10,
  cursor: "pointer",
  appearance: "none",
  background: "#f3f4f6",
  color: "#111",
});

export const navList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: 8,
});

export const navItem = style({
  display: "block",
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
});

/* 보조 텍스트/프로필 */
export const muted = style({
  color: "#6b7280",
  fontSize: 13,
});

export const accountCard = style([
  card,
  {
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
  },
]);

export const profileRow = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const avatarXL = style({
  width: 56,
  height: 56,
  borderRadius: "50%",
  objectFit: "cover",
  border: "1px solid #e5e7eb",
});

export const avatarFallback = style({
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "#f3f4f6",
  color: "#6b7280",
  fontWeight: 600,
  border: "1px solid #e5e7eb",
});

export const nameText = style({
  fontSize: 16,
});

export const subText = style([
  muted,
  {
    marginTop: 4,
  },
]);

export const actionsRow = style({
  display: "flex",
  gap: 8,
  marginTop: 12,
});

export const btnPrimary = style([
  btn,
  {
    border: "1px solid #111",
  },
]);

export const btnGhost = style([btn]);

export const debugCard = style([
  card,
  {
    padding: 16,
    background: "#fff",
    boxShadow: "inset 0 0 0 1px #eef2f7",
  },
]);

export const banner = style({
  padding: "8px 12px",
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  borderRadius: 8,
  color: "#7c2d12",
  marginBottom: 12,
  fontSize: 13,
});

export const label = style({
  color: "#6b7280",
  fontSize: 12,
  marginRight: 8,
});

export const value = style({
  fontSize: 13,
  color: "#111",
});

export const codeBoxSmall = style({
  display: "inline-block",
  padding: "4px 6px",
  background: "#f9fafb",
  color: "#111",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  fontFamily: "monospace",
  fontSize: 12,
  wordBreak: "break-all",
});

export const logBox = style({
  margin: 0,
  padding: 8,
  background: "#0b1020",
  color: "#e5e7eb",
  borderRadius: 8,
  fontSize: 12,
  maxHeight: 160,
  overflow: "auto",
  lineHeight: 1.4,
});

export const badge = style({
  display: "inline-block",
  padding: "2px 8px",
  fontSize: "12px",
  lineHeight: 1.6,
  borderRadius: "9999px",
  backgroundColor: "rgba(0,0,0,0.08)",
  color: "#222",
  marginLeft: "8px",
  verticalAlign: "middle",
});

export const badgeOutline = style({
  display: "inline-block",
  padding: "2px 8px",
  fontSize: "12px",
  lineHeight: 1.6,
  borderRadius: "9999px",
  border: "1px solid rgba(0,0,0,0.2)",
  color: "#222",
  marginLeft: "8px",
  verticalAlign: "middle",
  background: "#fff",
});

export const mutedNote = style({
  display: "block",
  marginTop: "2px",
  fontSize: "12px",
  color: "#666",
});
