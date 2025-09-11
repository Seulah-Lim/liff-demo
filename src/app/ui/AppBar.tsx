import { Link, useLocation, useSearchParams } from "react-router";
import * as s from "./appBar.css";
import lineLogo from "@shared/assets/img/line_logo.png";

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
import { useLiffStore } from "../store/liffStore";

function QuickMenuButton() {
  const { logout } = useLiffStore();

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

  const handleLogout = () => {
    console.log("dd");
    logout();
  };
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
          <img src={lineLogo} alt="" width={24} height={24} />
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
            반납 안내
          </Link>
          <Link to="/support" role="menuitem" className={s.menuItem}>
            고객 지원
          </Link>
          <div
            role="menuitem"
            className={s.menuItem}
            onClick={handleLogout}
            aria-label="로그아웃"
          >
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
}
