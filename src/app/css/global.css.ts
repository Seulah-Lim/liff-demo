/* ---------- CSS Variables (라이트/다크) ---------- */

import { card, chipInput } from "@pages/home/rentScreen.css";
import { TOAST_GAP } from "@shared/const/layout";
import { globalStyle } from "@vanilla-extract/css";

const lightVars = {
  "--bg": "#f7f7f8",
  "--bg-rgb": "247, 247, 248",
  "--card": "#ffffff",
  "--border": "#e5e7eb",
  "--fg": "#111827",
  "--fg-rgb": "17, 24, 39",
  "--muted": "#6b7280",
  "--brand": "#111827",
  "--accent": "#10b981",
} as const;

const darkVars = {
  "--bg": "#0b0b0c",
  "--bg-rgb": "11, 11, 12",
  "--card": "#111214",
  "--border": "#1f2937",
  "--fg": "#e5e7eb",
  "--fg-rgb": "229, 231, 235",
  "--muted": "#9ca3af",
  "--brand": "#111827",
  "--accent": "#34d399",
} as const;

globalStyle(":root", { vars: lightVars });
globalStyle(":root", {
  "@media": { "(prefers-color-scheme: dark)": { vars: darkVars } },
});

/* ---------- Reset & Base ---------- */
globalStyle("*", { boxSizing: "border-box" });
globalStyle("html, body, #root", { height: "100%" });

globalStyle("body", {
  margin: 0,
  background: "var(--bg)",
  color: "var(--fg)",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,"Apple SD Gothic Neo","Noto Sans KR",sans-serif',
});

/** Used to define container behavior: width, position: fixed etc... **/
globalStyle(".Toastify__toast-container", {
  padding: `0px 12px calc(${TOAST_GAP} + 12px) 12px`,
});

/** Classes for the displayed toast **/
globalStyle(".Toastify__toast", {});

globalStyle(`${chipInput}:checked + label`, {
  background: "var(--brand)",
  color: "#fff",
  borderColor: "var(--brand)",
});

globalStyle(`${card} h3`, { margin: "0 0 8px 0", fontSize: 16 });
