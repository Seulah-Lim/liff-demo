// BottomSheet.tsx
import { type ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import * as s from "./bottomSheet.css";

type BottomSheetProps = {
  open: boolean;
  title: ReactNode | string;
  onClose: () => void;

  // 버튼 라벨/액션
  cancelLabel?: string; // 기본: "취소"
  onCancel?: () => void; // 기본: onClose
  confirmLabel: string;
  onConfirm: () => void;
  confirmAutoFocus?: boolean; // 기본: true

  // 제목과 버튼 사이에 렌더할 콘텐츠
  children?: ReactNode;
};

export function BottomSheet({
  open,
  title,
  onClose,
  cancelLabel = "취소",
  onCancel,
  confirmLabel,
  onConfirm,
  confirmAutoFocus = true,
  children,
}: BottomSheetProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 뒤로가기(popstate)로 닫힘
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
            {title}
          </div>
        </div>

        <div className={s.sheetBody}>{children}</div>

        <div className={s.sheetFooter}>
          <button
            className={s.sheetBtnGhost}
            type="button"
            onClick={onCancel ?? onClose}
          >
            {cancelLabel}
          </button>
          <button
            className={s.sheetBtnPrimary}
            type="button"
            onClick={onConfirm}
            autoFocus={confirmAutoFocus}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
