// export default function MainLayout() {
//   return (
//     <div className="app-shell">
//       <main>
//         <Outlet />
//         <BottomNavSpacer />
//       </main>
//       <BottomNav />
//     </div>
//   );
// }

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
