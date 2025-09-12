import { Navigate, Outlet } from "react-router";

import { useBidStore } from "@app/store/bidStore";

export default function BidGuard() {
  const bid = useBidStore((s) => s.bid);

  if (!bid) {
    console.log("navi to error");
    return <Navigate to="/error?kind=MISSING_BID" replace />;
  }

  return <Outlet />;
}
