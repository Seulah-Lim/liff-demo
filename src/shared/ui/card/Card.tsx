import type { CSSProperties, ReactNode } from "react";
import * as s from "./card.css";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  /** 연한 배경 틴트가 필요하면 컬러(hex/rgba) 전달 */
  tintRgb?: string; // 예: "rgba(16,185,129,0.06)"
};

export function Card({ title, children, className, tintRgb }: CardProps) {
  const styleVars: CSSProperties | undefined = tintRgb
    ? ({
        ["--tint-light"]: `rgba(${tintRgb}, 0.06)`,
        ["--tint-dark"]: `rgba(${tintRgb}, 0.10)`,
      } as CSSProperties)
    : undefined;

  const cls = tintRgb ? `${s.card} ${s.withAdaptiveTint}` : s.card;

  return (
    <div className={`${cls} ${className ?? ""}`} style={styleVars}>
      {title && <h3 className={s.cardTitle}>{title}</h3>}
      {children}
    </div>
  );
}
