import { Link, useLocation, useSearchParams } from "react-router";
import * as s from "./appBar.css";
import lineLogo from "@shared/assets/img/line_logo.png";
import { useEffect, useRef, useState } from "react";
import { useLiffStore } from "@app/store/liffStore";
import { buildMainPermanentLink } from "@shared/api/liff/buildLinks";
import { parseHomeView, useHomeViewStore } from "@app/store/homeStore";
import liff from "@line/liff";
import { useModalByQuery } from "@shared/hooks/useModalByQuery";
import Modal from "@shared/ui/modal/Modal";

export default function AppBar() {
  const { pathname } = useLocation();
  const [sp] = useSearchParams();
  const { lastView } = useHomeViewStore();
  const [showInfoButton, setShowInfoButton] = useState(false);
  const { isOpen, open, close } = useModalByQuery("open-line");

  useEffect(() => {
    setShowInfoButton(!liff.isInClient());
  }, []);

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
      {showInfoButton && (
        <>
          <button
            type="button"
            className={s.iconBtn}
            aria-label="Information"
            onClick={open}
          >
            <img src={lineLogo} alt="" width={24} />
          </button>
          <Modal
            open={isOpen}
            onOpenChange={(v) => (v ? open() : close())}
            title="LINE 앱으로 이동하시겠습니까?"
            actions={[
              { label: "취소", variant: "secondary", onClick: close },
              {
                label: "이동",
                variant: "primary",
                onClick: async () => {
                  const deep = await buildMainPermanentLink();
                  location.href = deep;
                  close();
                },
              },
            ]}
            children={
              "LINE 앱에서 실행하면 더 빠르고 편리하게 이용하실 수 있습니다."
            }
          ></Modal>
        </>
      )}

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

function QuickMenuButton() {
  const { logout } = useLiffStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, open, close } = useModalByQuery("logout");
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className={s.actions} ref={ref}>
      <button
        className={s.iconBtn}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label="Quick Menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" className={s.icon}>
          <path d="M12 7a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {menuOpen && (
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
            onClick={open}
            aria-label="로그아웃"
          >
            로그아웃
          </div>
        </div>
      )}

      <Modal
        open={isOpen}
        onOpenChange={(v) => (v ? open() : close())}
        title=" 로그아웃 하시겠습니까?"
        actions={[
          { label: "취소", variant: "secondary", onClick: close },
          {
            label: "로그아웃",
            variant: "primary",
            onClick: () => {
              logout();
              close();
            },
          },
        ]}
        children={"현재 계정에서 로그아웃합니다."}
      ></Modal>
    </div>
  );
}
