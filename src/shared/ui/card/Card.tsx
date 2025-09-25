import type { ReactNode } from "react";
import * as s from "./card.css";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** 연한 배경 틴트가 필요하면 컬러(hex/rgba) 전달 */
  tint?: string; // 예: "rgba(16,185,129,0.06)"
};

export function Card({ children, className, tint }: CardProps) {
  return (
    <div
      className={`${s.card} ${className ?? ""}`}
      style={tint ? ({ ["--tint"]: tint } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
