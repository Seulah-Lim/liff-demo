import Lottie from "lottie-react";
import loadingData from "../../shared/assets/lottie/loading.json";

export default function LoadingScreen() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie
        animationData={loadingData}
        loop={true}
        autoplay={true}
        style={{
          width: "50%",
          maxWidth: "250px", // 모바일 기준 최대 200px
          height: "auto",
        }}
      />
    </div>
  );
}
