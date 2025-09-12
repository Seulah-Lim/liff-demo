import * as s from "./errorScrren.css";
import Lottie from "lottie-react";
import errorLottie from "@shared/assets/lottie/error.json";
import noDataLottie from "@shared/assets/lottie/no_user.json";

export type ErrorKind =
  | "NOT_LIFF"
  | "MISSING_BID"
  | "BATTERY_FETCH_FAILED"
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
        title: "서비스 이용에 문제가 발생했습니다",
        message: "문제가 계속되면 고객센터로 문의해 주시기 바랍니다.",
        secondaryLabel: "다시 시도",
        animation: errorLottie,
      };

    case "MISSING_BID":
      return {
        title: "잘못된 QR 코드입니다",
        message: "인식된 배터리 정보가 없거나 유효하지 않은 QR 코드입니다.",
        animation: noDataLottie,
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

  const defaultHandlers = {
    NOT_LIFF: {
      onPrimary: () => alert("LIFF 앱 열기 동작 연결"),
      onSecondary: () => alert("링크 복사"),
      onRetry: () => window.location.reload(),
    },
    BATTERY_FETCH_FAILED: {
      onPrimary: () => window.location.reload(),
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
        {cfg.animation && (
          <Lottie
            animationData={cfg.animation}
            loop={true}
            autoplay={true}
            style={{
              width: "100%",
              maxWidth: "250px",
              height: "auto",
              alignSelf: "center",
            }}
          />
        )}

        <div className={s.head}>
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
