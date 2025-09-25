// src/shared/ui/modal/Modal.tsx
import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  overlayStyle,
  panelStyle,
  headerStyle,
  titleStyle,
  bodyStyle,
  footerStyle,
  actionsStyle,
  actionBtnStyle,
  primaryBtnStyle,
  secondaryBtnStyle,
  dangerBtnStyle,
} from "./modal.css";

type ModalAction = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  autoFocus?: boolean;
};

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
  actions?: ModalAction[]; // 0~2개 권장
};

export function Modal({
  open,
  onOpenChange,
  title,
  children,
  closeOnOverlayClick = true,
  actions = [],
}: ModalProps) {
  // 접근성: title/body 참조 ID
  const titleId = useId();
  const bodyId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);

    // 스크롤 잠금
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const renderAction = (action: ModalAction, idx: number) => {
    const variantClass =
      action.variant === "danger"
        ? dangerBtnStyle
        : action.variant === "secondary"
        ? secondaryBtnStyle
        : primaryBtnStyle;

    return (
      <button
        key={`${action.label}-${idx}`}
        className={`${actionBtnStyle} ${variantClass}`}
        onClick={action.onClick}
        autoFocus={action.autoFocus}
        type="button"
      >
        {action.label}
      </button>
    );
  };

  return createPortal(
    <div
      className={overlayStyle}
      onMouseDown={() => {
        if (closeOnOverlayClick) onOpenChange(false);
      }}
    >
      <div
        className={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={bodyId}
        onMouseDown={(e) => e.stopPropagation()} // 패널 내부 클릭은 닫히지 않게
      >
        {(title || title === "") && (
          <header className={headerStyle}>
            <h2 id={titleId} className={titleStyle}>
              {title}
            </h2>
          </header>
        )}

        <section id={bodyId} className={bodyStyle}>
          {children}
        </section>

        {actions.length > 0 && (
          <footer className={footerStyle}>
            <div className={actionsStyle}>
              {actions.slice(0, 2).map(renderAction)}
            </div>
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}
