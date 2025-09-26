import { style } from "@vanilla-extract/css";

/* ---------- Lists / items ---------- */
export const list = style({
  display: "grid",
  gap: 10,
});

export const sep = style({
  height: 1,
  background: "var(--border)",
  margin: "12px 0",
});

/* ---------- KV grid ---------- */
export const kv = style({
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  gap: 8,
  fontSize: 15,
});

export const k = style({ color: "var(--muted)" });

/* ---------- Map placeholder ---------- */
export const map = style({
  height: 140,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  color: "var(--muted)",
  fontSize: 12,

  // 이미지용 공통 속성
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  // iOS 라운드 컷오프 보장
  overflow: "hidden",
});

export const hint = style({ fontSize: 12, color: "var(--muted)" });
