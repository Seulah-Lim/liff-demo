const Login_desktop = () => {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>⚠️ 라인 앱에서만 접속 가능합니다</h2>
      <p style={styles.desc}>
        현재 브라우저에서는 이 페이지를 이용할 수 없습니다.
        <br />
        아래 방법으로 접속해 주세요:
      </p>
      <ul style={styles.list}>
        <li>📷 모바일 카메라로 QR 코드를 스캔</li>
        <li>🔎 라인 앱의 QR 리더기로 스캔</li>
        <li>🔗 라인 앱 안에서 URL 직접 열기</li>
      </ul>
    </div>
  );
};

export default Login_desktop;

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
  },
  desc: {
    fontSize: "16px",
    color: "#444",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.8",
  },
};
