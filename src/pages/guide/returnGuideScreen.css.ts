import { APP_BAR_HEIGHT, SAFE_AREA_BOTTOM } from "@shared/const/layout";
import { style } from "@vanilla-extract/css";

/* ---------- Layout ---------- */
export const container = style({
  paddingTop: APP_BAR_HEIGHT,
  paddingBottom: SAFE_AREA_BOTTOM,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
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
  gridTemplateRows: "auto auto 1fr auto", // 정보 / 시간선택 / 가변 / 버튼
  padding: 12,
});

/* ---------- Card / text ---------- */
export const card = style({
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  boxShadow: "0 1px 0 rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04)",
  padding: 16,
});

export const cardTitle = style({
  margin: "0 0 8px 0",
  fontSize: 16,
});

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

/* ---------- Station list (minimal) ---------- */
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

// 상태 배지 색상 (여유/보통/혼잡/없음)
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
