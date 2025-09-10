import { Link, useLocation, useSearchParams } from "react-router";
import * as s from "./app.css";

export default function AppBar() {
  const { pathname } = useLocation();
  const [sp] = useSearchParams();
  const { lastView } = useHomeViewStore();

  const isHome = pathname === "/";

  const title = getTitleFromPath(pathname);
  const showQuickMenu = isHome;
  function getTitleFromPath(path: string) {
    if (path === "/") {
      const view = parseHomeView(sp.get("view")) ?? lastView;
      switch (view) {
        case "rent":
          return "Available Battery"; // 배터리 대여 가능

        case "borrowed":
          return "Unavailable Battery"; // 타인 사용 중 → 대여 불가
        case "return":
          return "My Battery"; // 내가 대여한 배터리 관리
        default:
          return "Home";
      }
    }

    if (path.startsWith("/support")) return "Support"; //고객 지원/신고
    if (path.startsWith("/return-guide")) return "Return Guide"; // 반납 안내

    return "Page";
  }
  return (
    <header className={s.root} role="banner">
      <div className={s.title} aria-live="polite">
        {title}
      </div>

      {showQuickMenu && <QuickMenuButton />}
    </header>
  );
}

export function AppBarSpacer() {
  return <div className={s.spacer} aria-hidden="true" />;
}

// 퀵메뉴
import { useState, useRef, useEffect } from "react";
import { parseHomeView, useHomeViewStore } from "../store/homeStore";

function QuickMenuButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className={s.actions} ref={ref}>
      <button
        className={s.iconBtn}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Quick Menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" className={s.icon}>
          <path d="M12 7a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {open && (
        <div className={s.menu} role="menu" aria-label="Quick actions">
          <Link to="/return-guide" role="menuitem" className={s.menuItem}>
            <svg viewBox="0 0 24 24" className={s.menuIcon}>
              <path d="M19 3H5a2 2 0 00-2 2v14l4-4h12a2 2 0 002-2V5a2 2 0 00-2-2z" />
            </svg>
            반납 안내
          </Link>
          <Link to="/support" role="menuitem" className={s.menuItem}>
            <svg viewBox="0 0 24 24" className={s.menuIcon}>
              <path d="M3 3h18v2H3V3zm0 6h12v2H3V9zm0 6h18v2H3v-2z" />
            </svg>
            고객 지원
          </Link>
        </div>
      )}
    </div>
  );
}
