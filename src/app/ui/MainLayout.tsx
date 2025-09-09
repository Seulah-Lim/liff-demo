// app/layouts/MainLayout.tsx
import { Outlet } from "react-router";
import { BottomNav, BottomNavSpacer } from "./BottomNavi";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <main>
        <Outlet />
        <BottomNavSpacer />
      </main>
      <BottomNav />
    </div>
  );
}
