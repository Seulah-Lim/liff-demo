import { useLocation, useSearchParams } from "react-router";
import * as s from "./appBar.css";
import lineLogo from "@shared/assets/img/line_logo.png";
import { useEffect, useState } from "react";
import { buildMainPermanentLink } from "@shared/lib/liff/buildLinks";
import { parseHomeView, useHomeViewStore } from "@app/store/homeStore";
import liff from "@line/liff";
import { useModalByQuery } from "@shared/hooks/useModalByQuery";

import { useLiffStore } from "@app/store/liffStore";

import { ProfileMenuButton } from "@shared/ui/menu/ProfileMenuButton";
import { Modal } from "@shared/ui";

export function AppBar() {
  const { pathname } = useLocation();
  const [sp] = useSearchParams();
  const { lastView } = useHomeViewStore();
  const { isLoggedIn } = useLiffStore();
  const [showLineButton, setShowLINEButton] = useState(false);
  const { isOpen, open, close } = useModalByQuery("open-line");

  useEffect(() => {
    setShowLINEButton(!liff.isInClient());
  }, []);

  const title = getTitleFromPath(pathname);
  const showQuickMenu = isLoggedIn;
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
          return "";
      }
    }

    if (path.startsWith("/support")) return "Support"; //고객 지원/신고
    if (path.startsWith("/return-guide")) return "Return Guide"; // 반납 안내

    return "";
  }
  return (
    <header className={s.root} role="banner">
      <div className={s.title} aria-live="polite">
        {title}
      </div>
      {showLineButton && (
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
      {showQuickMenu && <ProfileMenuButton />}
    </header>
  );
}
