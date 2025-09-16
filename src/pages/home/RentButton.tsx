import * as s from "./rentButton.css.ts";
type Props = {
  disabled: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  onClick: () => void;
};

export function RentButton({ disabled, onClick: onConfirm }: Props) {
  return (
    <button className={s.btn} onClick={onConfirm} disabled={disabled}>
      {disabled ? (
        <span className={s.dots} role="status" aria-label="처리 중">
          <i className={s.dot} />
          <i className={s.dot} />
          <i className={s.dot} />
        </span>
      ) : (
        "대여하기"
      )}
    </button>
  );
}
