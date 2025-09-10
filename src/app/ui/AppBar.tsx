import { Link, useLocation, useSearchParams } from "react-router";
import * as s from "./appBar.css";

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
import liff from "@line/liff";
import { buildMainPermanentLink } from "../lib/liff/buildLinks";

function QuickMenuButton() {
  const [open, setOpen] = useState(false);

  const [showInfoButton, setShowInfoButton] = useState(false);
  useEffect(() => {
    setShowInfoButton(!liff.isInClient());
  }, []);

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
      {showInfoButton && (
        <button
          type="button"
          className={s.iconBtn}
          aria-label="Information"
          onClick={async () => {
            // TODO: 안내 모달/공지 페이지 등 열기
            const deep = await buildMainPermanentLink();

            location.href = deep;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={s.icon}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </button>
      )}

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
