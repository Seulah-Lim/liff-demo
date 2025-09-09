// App.tsx
import { Outlet } from "react-router";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Outlet />
    </div>
  );
}
