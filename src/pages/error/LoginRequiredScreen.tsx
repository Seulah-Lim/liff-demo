import * as s from "./errorScrren.css";

import Lottie from "lottie-react";

import liff from "@line/liff";
import noUserLottie from "@shared/assets/lottie/ghost.json";
import { useLiffStore } from "@app/store/liffStore";
import { buildMainPermanentLink } from "@shared/api/liff/buildLinks";

export const LoginRequiredScreen = () => {
  const { login } = useLiffStore();

  const inClient =
    typeof liff !== "undefined" && typeof liff.isInClient === "function"
      ? liff.isInClient()
      : false;

  return (
    <main className={s.main}>
      <section className={s.card}>
        <Lottie
          animationData={noUserLottie}
          loop={true}
          autoplay={true}
          style={{
            width: "100%",
            maxWidth: "250px",
            height: "auto",
            alignSelf: "center",
          }}
        />

        <div className={s.head}>
          <div className={s.headText}>
            <h1 className={s.title}>로그인이 필요합니다.</h1>
            <p className={s.message}>
              {inClient
                ? "서비스 사용을 위해 로그인 해주세요."
                : "LINE 앱에서실행하면 더 빠르고 편리하게 이용하실 수 있습니다."}
            </p>
          </div>
        </div>

        <div className={s.actions}>
          <button
            type="button"
            onClick={() => {
              login();
            }}
            className={s.btnPrimary}
          >
            로그인
          </button>

          {!inClient && (
            <button
              type="button"
              onClick={async () => {
                const deep = await buildMainPermanentLink();
                console.log(deep, "으로 이동");
                location.href = deep;
              }}
              className={s.btnSecondary}
            >
              LINE앱에서 사용
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
            className={s.btnGhost}
          >
            다시 시도
          </button>
        </div>
      </section>
    </main>
  );
};

export default LoginRequiredScreen;
