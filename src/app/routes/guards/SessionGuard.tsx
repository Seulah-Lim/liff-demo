import { Navigate, Outlet, useNavigate } from "react-router";

import { useLiffStore } from "@app/store/liffStore";
import LoadingScreen from "@pages/common/Loading";
import { useEffect } from "react";
import AppBar from "@shared/ui/appBar/AppBar";
import { getLiffId, isAllowedLiffId } from "@shared/const/liff_id";

export default function SessionGuard() {
  const navigate = useNavigate();

  const { ready, isLoggedIn, init, setReady } = useLiffStore();
  useEffect(() => {
    if (ready) return;
    const liffId = getLiffId();
    if (!liffId) {
      navigate("/error?kind=MISSING_LIFF_ID", {
        replace: true,
      });
      return;
    }

    if (!isAllowedLiffId(liffId)) {
      navigate("/error?kind=INVALID_LIFF_ID", {
        replace: true,
      });
      return;
    }

    init(liffId).catch(() => {
      navigate("/error?kind=UNKNOWN&detail=LIFF_FAILED", { replace: true });
    });
  }, [ready, init, navigate, setReady]);

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
