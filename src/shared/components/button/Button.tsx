import React from "react";
import * as s from "./button.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "large" | "medium" | "small";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean; // 기본 true
  isLoading?: boolean; // 로딩 상태
  loadingLabel?: string; // 스크린리더용 라벨 (기본: "처리 중")
};

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "large",
  children,
  className,
  fullWidth = true,
  isLoading = false,
  loadingLabel = "처리 중",
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const disabledLike = Boolean(disabled || isLoading);

  const cls =
    s.button({
      variant,
      size,
      fullWidth: fullWidth ? "on" : "off",
    }) + (className ? ` ${className}` : "");

  const content = isLoading ? (
    <span className={s.dots} role="status" aria-label={loadingLabel}>
      <i className={s.dot} />
      <i className={s.dot} />
      <i className={s.dot} />
    </span>
  ) : (
    children
  );

  // 공통 a11y attrs
  const a11y = {
    "data-loading": isLoading ? "true" : "false",
    "aria-busy": isLoading || undefined,
  } as const;

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      disabled={disabledLike}
      {...a11y}
      {...rest}
    >
      {content}
    </button>
  );
}
