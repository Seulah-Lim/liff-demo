import { useLiffStore } from "@app/store/liffStore";
import { useModalByQuery } from "@shared/hooks/useModalByQuery";

import * as s from "./profileMenuButton.css";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import liff from "@line/liff";
import { Modal } from "@shared/components";
import { createPortal } from "react-dom";

export function ProfileMenuButton() {
  const navigate = useNavigate();
  const { logout } = useLiffStore();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, open, close } = useModalByQuery("logout");
  const { profile, friendFlag } = useLiffStore();
  const ref = useRef<HTMLDivElement | null>(null);

  const isHome = pathname === "/";
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleNaviButton = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };
  function goAddFriendOnly() {
    const url = `https://line.me/R/ti/p/${import.meta.env.VITE_BOT_ID}`;
    liff.openWindow({ url, external: false });
  }

  return (
    <div className={s.actions} ref={ref}>
      <button
        className={s.avatarBtn}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label="Quick Menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        {profile?.pictureUrl ? (
          <img src={profile.pictureUrl} alt="프로필" className={s.avatar} />
        ) : (
          <div className={s.avatarFallback}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </div>
        )}
      </button>

      {menuOpen &&
        createPortal(
          <div className={s.menu} role="menu" aria-label="Quick actions">
            <div className={s.menuHeader} role="presentation">
              {profile?.displayName && (
                <p
                  className={s.greetingClamp}
                  title={`${profile.displayName}님`}
                >
                  <strong className={s.nameInline}>
                    {profile.displayName}
                  </strong>
                  님
                </p>
              )}

              <div className={s.statusRow}>
                {friendFlag ? (
                  <span className={`${s.badge} ${s.badgeOk}`}>
                    공식계정 친구
                  </span>
                ) : (
                  <>
                    <span className={`${s.badge} ${s.badgeWarn}`}>
                      친구 아님
                    </span>
                    <button
                      type="button"
                      className={s.inlineBtn}
                      onMouseDown={goAddFriendOnly}
                    >
                      친구 추가
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className={s.divider} role="separator" />

            <div
              role="menuitem"
              className={s.menuItem}
              onMouseDown={open}
              aria-label="로그아웃"
            >
              로그아웃
            </div>

            {isHome && (
              <>
                <div
                  className={s.menuItem}
                  onMouseDown={() => {
                    handleNaviButton("/return-guide");
                  }}
                >
                  반납 안내
                </div>
                <div
                  className={s.menuItem}
                  onMouseDown={() => {
                    handleNaviButton("/support");
                  }}
                >
                  고객 지원
                </div>
              </>
            )}
          </div>,
          document.body
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
