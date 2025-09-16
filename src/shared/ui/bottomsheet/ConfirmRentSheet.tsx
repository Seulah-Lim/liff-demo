import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import * as s from "./confirmRentSheet.css";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  dueLabel: string;
};

export function ConfirmRentSheet({
  open,
  onClose,
  onConfirm,
  dueLabel,
}: SheetProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const markerId = `__sheet_${titleId}`;
    history.pushState({ __sheet: markerId }, "");
    const onPop = () => onClose();
    window.addEventListener("popstate", onPop);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
      document.body.style.overflow = prevOverflow;
      if (history.state && history.state.__sheet === markerId) history.back();
    };
  }, [open, onClose, titleId]);

  if (!open) return null;

  return createPortal(
    <>
      <div
        className={`${s.sheetOverlay} ${open ? s.sheetOverlayOpen : ""}`}
        onMouseDown={onClose}
      />
      <div
        className={`${s.sheet} ${open ? s.sheetOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={s.sheetHandle} />
        <div className={s.sheetHeader}>
          <div id={titleId} className={s.sheetTitle}>
            이용을 시작할까요?
          </div>
        </div>

        <div className={s.sheetBody}>
          {/* 반납 예정만 표시 */}
          <div className={s.sheetRow}>
            <div className={s.sheetKey}>반납 예정</div>
            <div className={s.sheetVal}>{dueLabel}</div>
          </div>

          <div className={s.sheetNotes}>
            <div className={s.sheetNote}>
              반납 전에 언제든 연장할 수 있어요.
            </div>
            <div className={s.sheetNote}>
              반납 방법은 프로필 &gt; 반납 안내에서 확인할 수 있어요
            </div>
          </div>
        </div>

        <div className={s.sheetFooter}>
          <button className={s.sheetBtnGhost} type="button" onClick={onClose}>
            취소
          </button>
          <button
            className={s.sheetBtnPrimary}
            type="button"
            onClick={onConfirm}
            autoFocus
          >
            대여 시작하기
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
