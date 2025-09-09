export default function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #f1f5f9",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 8px 24px rgba(16, 24, 40, 0.06)",
          fontSize: 14,
          color: "#111827",
        }}
      >
        초기화 중입니다…
      </div>
    </div>
  );
}
