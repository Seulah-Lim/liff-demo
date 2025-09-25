// BottomSheet.tsx
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
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
  confirmAutoFocus?: boolean; // 기본: false

  // 스와이프(아래로 끌어 닫기)
  swipeToClose?: boolean; // 기본: true
  swipeCloseThreshold?: number; // 기본: 120(px)
  swipeVelocityThreshold?: number; // 기본: 0.5(px/ms)

  // 제목과 버튼 사이 컨텐츠
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
  confirmAutoFocus = false,
  swipeToClose = true,
  swipeCloseThreshold = 120,
  swipeVelocityThreshold = 0.5,
  children,
}: BottomSheetProps) {
  const titleId = useId();

  // --- 스와이프 상태 ---
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startYRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ y: number; t: number } | null>(null);

  const resetDrag = () => {
    setDragging(false);
    setDragY(0);
    startYRef.current = null;
    lastPointRef.current = null;
  };

  const onPointerDownHandle = (e: React.PointerEvent) => {
    if (!swipeToClose) return;
    // 핸들 잡고 드래그 시작
    setDragging(true);
    startYRef.current = e.clientY;
    lastPointRef.current = { y: e.clientY, t: e.timeStamp };
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    // 드래그 중 브라우저 기본 스크롤을 최소화
    e.preventDefault();
  };

  const onPointerMoveHandle = (e: React.PointerEvent) => {
    if (!dragging || startYRef.current == null) return;
    const dy = e.clientY - startYRef.current;
    // 위로 끄는 건 무시, 아래로만
    const clamped = Math.max(0, dy);
    setDragY(clamped);
    lastPointRef.current = { y: e.clientY, t: e.timeStamp };
  };

  const onPointerUpHandle = (e: React.PointerEvent) => {
    if (
      !dragging ||
      startYRef.current == null ||
      lastPointRef.current == null
    ) {
      resetDrag();
      return;
    }
    const totalDy = Math.max(0, e.clientY - startYRef.current);
    const dt = Math.max(1, e.timeStamp - lastPointRef.current.t); // ms
    const dy = e.clientY - lastPointRef.current.y;
    const velocity = dy / dt; // px/ms (양수면 아래로 빠르게)

    const shouldClose =
      totalDy > swipeCloseThreshold || velocity > swipeVelocityThreshold;

    if (shouldClose) {
      onClose(); // 부모가 open=false로 만들면 시트는 언마운트됨
    } else {
      // 원위치로 부드럽게 복귀
      setDragging(false);
      setDragY(0);
      // 복귀 애니메이션은 CSS 전환(transition)으로 처리됨
    }
  };

  useEffect(() => {
    if (!open) {
      // 열림 → 닫힘 시 드래그 상태 초기화
      resetDrag();
      return;
    }

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

  // 드래그 진행도에 따라 오버레이 투명도 살짝 줄임(피드백)
  const overlayOpacity = 1 - Math.min(1, dragY / 300);

  return createPortal(
    <>
      <div
        className={`${s.sheetOverlay} ${open ? s.sheetOverlayOpen : ""}`}
        style={{ opacity: overlayOpacity }}
        onMouseDown={onClose}
      />
      <div
        className={`${s.sheet} ${open ? s.sheetOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        // 시트 전체 클릭이 오버레이로 전파되어 닫히지 않도록
        onMouseDown={(e) => e.stopPropagation()}
        // 드래그 중에는 인라인 transform으로 위치 이동
        style={{
          transform:
            dragging || dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: dragging ? "none" : undefined, // 드래그 중에는 스냅 없이 따라오게
          willChange: "transform",
        }}
      >
        <div
          className={s.sheetHandleArea}
          onPointerDown={onPointerDownHandle}
          onPointerMove={onPointerMoveHandle}
          onPointerUp={onPointerUpHandle}
          onPointerCancel={onPointerUpHandle}
        >
          <div className={s.sheetHandle} />
        </div>

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
