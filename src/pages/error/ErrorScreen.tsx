import React from "react";
import * as s from "./errorScrren.css";
import { useLiffStore } from "../../app/store/liffStore";

export type ErrorKind =
  | "NOT_LIFF"
  | "MISSING_BID"
  | "BATTERY_FETCH_FAILED"
  | "NO_USER"
  | "UNKNOWN";

export interface ErrorScreenProps {
  kind: ErrorKind;
  detail?: string;
  supportId?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  retryLabel?: string;
  onRetry?: () => void;
}

function getDefaultConfig(kind: ErrorKind) {
  switch (kind) {
    case "NOT_LIFF":
      return {
        title: "LIFF 앱이 아닙니다",
        message:
          "해당 서비스는 LINE LIFF 환경에서 동작합니다. LINE 앱에서 열어주세요.",
        primaryLabel: "LIFF 앱으로 열기",
        secondaryLabel: "링크 복사",
        retryLabel: "다시 시도",
      };
    case "BATTERY_FETCH_FAILED":
      return {
        title: "배터리 정보를 불러올 수 없습니다",
        message:
          "네트워크 상태를 확인하시거나 잠시 후 다시 시도해주세요. 문제가 계속되면 고객센터로 문의해주세요.",
        primaryLabel: "상태 새로고침",
        secondaryLabel: "도움말",
        retryLabel: "다시 시도",
      };
    case "NO_USER":
      return {
        title: "사용자 정보가 없습니다",
        message: "로그인이 필요합니다. 로그인 후 다시 이용해주세요.",
        primaryLabel: "로그인",
        secondaryLabel: "다시 시도",
      };
    case "MISSING_BID":
      return {
        title: "잘못된 QR 코드입니다",
        message:
          "인식된 배터리 정보가 없거나 유효하지 않은 QR 코드입니다.\n올바른 QR 코드를 다시 스캔해 주세요.",
      };

    case "UNKNOWN":
    default:
      return {
        title: "알 수 없는 오류가 발생했습니다",
        message:
          "예기치 못한 오류가 발생했어요. 잠시 후 다시 시도하거나 고객센터로 문의해주세요.",
        primaryLabel: "문의하기",
        secondaryLabel: "홈으로 이동",
        retryLabel: "다시 시도",
      };
  }
}

const IconAlert: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 9v4m0 4h.01M10.29 3.859c.86-1.488 2.56-1.488 3.42 0l7.2 12.46c.86 1.488-.215 3.181-1.71 3.181H4.8c-1.495 0-2.57-1.693-1.71-3.18l7.2-12.461Z"
    />
  </svg>
);

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  kind,

  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  retryLabel,
  onRetry,
}) => {
  const cfg = getDefaultConfig(kind);

  const _primaryLabel = primaryLabel ?? cfg.primaryLabel;
  const _secondaryLabel = secondaryLabel ?? cfg.secondaryLabel;
  const _retryLabel = retryLabel ?? cfg.retryLabel;
  const { login } = useLiffStore();

  const defaultHandlers = {
    NOT_LIFF: {
      onPrimary: () => alert("LIFF 앱 열기 동작 연결"),
      onSecondary: () => alert("링크 복사"),
      onRetry: () => window.location.reload(),
    },
    BATTERY_FETCH_FAILED: {
      onPrimary: () => window.location.reload(),
      onSecondary: () => alert("도움말 페이지 이동"),
      onRetry: () => window.location.reload(),
    },
    NO_USER: {
      onPrimary: () => {
        login();
      },
      onSecondary: () => window.location.reload(),
      onRetry: () => window.location.reload(),
    },
    MISSING_BID: {
      onPrimary: () => {},
      onSecondary: () => {},
      onRetry: () => window.location.reload(),
    },
    UNKNOWN: {
      onPrimary: () => alert("문의/고객센터 연결"),
      onSecondary: () => (window.location.href = "/"),
      onRetry: () => window.location.reload(),
    },
  } as const;

  const handlers = defaultHandlers[kind];

  return (
    <main className={s.main}>
      <section className={s.card}>
        <div className={s.head}>
          <div className={s.icon}>
            <IconAlert className={s.iconSvg} />
          </div>
          <div className={s.headText}>
            <h1 className={s.title}>{cfg.title}</h1>
            <p className={s.message}>{cfg.message}</p>
          </div>
        </div>

        <div className={s.actions}>
          {cfg.primaryLabel && (
            <button
              type="button"
              onClick={onPrimary ?? handlers.onPrimary}
              className={s.btnPrimary}
            >
              {_primaryLabel}
            </button>
          )}

          {cfg.secondaryLabel && (
            <button
              type="button"
              onClick={onSecondary ?? handlers.onSecondary}
              className={s.btnSecondary}
            >
              {_secondaryLabel}
            </button>
          )}
          {cfg.retryLabel && (
            <button
              type="button"
              onClick={onRetry ?? handlers.onRetry}
              className={s.btnGhost}
            >
              {_retryLabel}
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default ErrorScreen;
