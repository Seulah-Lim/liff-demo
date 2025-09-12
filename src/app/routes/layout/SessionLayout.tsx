import { Navigate, Outlet, useNavigate } from "react-router";
import AppBar from "@shared/ui/appBar/AppBar";
import { useLiffStore } from "@app/store/liffStore";
import LoadingScreen from "@pages/common/Loading";
import { useEffect } from "react";

export default function SessionLayout() {
  const navigate = useNavigate();

  const { ready, isLoggedIn, init } = useLiffStore();
  useEffect(() => {
    if (!ready) {
      init().catch(() => {
        navigate("/error?kind=UNKNOWN&detail=LIFF_FAILED", { replace: true });
      });
    }
  }, [ready, init, navigate]);

  if (!ready) return <LoadingScreen />;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <AppBar />
    </div>
  );
}
