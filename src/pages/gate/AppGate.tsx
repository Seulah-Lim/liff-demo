// src/app/AppGate.tsx
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useEnsureSession } from "./User";
import LoadingScreen from "./Loading";

export default function AppGate() {
  const { phase, err, redirectToError } = useEnsureSession();

  useEffect(() => {
    if (phase === "error" && err) {
      redirectToError(err);
    }
  }, [phase, err, redirectToError]);

  if (phase === "idle" || phase === "loading") {
    return <LoadingScreen />;
  }

  // phase === "ok"
  return <Outlet />;
}
