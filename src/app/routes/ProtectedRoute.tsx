import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useLiffStore } from "@app/store/liffStore";
import { useBidStore } from "@app/store/bidStore";
import LoadingScreen from "@pages/common/Loading";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const { ready, isLoggedIn, init } = useLiffStore();
  const bid = useBidStore((s) => s.bid);
  const ensureBidOnce = useBidStore((s) => s.ensureBidOnce);

  useEffect(() => {
    if (!ready) {
      init().catch(() => {
        navigate("/error?kind=UNKNOWN&detail=LIFF_FAILED", { replace: true });
      });
    }
  }, [ready, init, navigate]);

  useEffect(() => {
    ensureBidOnce(search);
  }, [search, ensureBidOnce]);

  if (!ready) return <LoadingScreen />;
  if (!isLoggedIn) return <Navigate to="/error?kind=NO_USER" replace />;
  if (!bid) return <Navigate to="/error?kind=MISSING_BID" replace />;

  return <Outlet />;
}
