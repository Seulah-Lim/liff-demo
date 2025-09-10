import { Outlet } from "react-router";
import AppBar, { AppBarSpacer } from "./AppBar";

export default function MainLayout() {
  return (
    <div>
      <AppBar />
      <main>
        <AppBarSpacer />
        <Outlet />
      </main>
    </div>
  );
}
