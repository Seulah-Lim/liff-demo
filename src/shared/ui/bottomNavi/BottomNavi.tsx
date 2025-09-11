// app/ui/BottomNav/BottomNav.tsx
import { NavLink } from "react-router";
import * as s from "./bottomNavi.css";
import { useHomeViewStore } from "@app/store/homeStore";

export function BottomNav() {
  const { lastView } = useHomeViewStore();
  const homeTo =
    lastView !== "homehub"
      ? { pathname: "/", search: `?view=${lastView}` } // or "/home"
      : "/";

  return (
    <nav className={s.root} role="navigation" aria-label="Bottom Navigation">
      <NavLink
        to={homeTo}
        end
        className={({ isActive }) =>
          [s.item, isActive ? s.active : ""].join(" ")
        }
      >
        <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l8 7h-2v9h-5v-6H11v6H6v-9H4l8-7z" />
        </svg>
        <span className={s.label}>Home</span>
      </NavLink>

      <NavLink
        to="/me"
        end
        className={({ isActive }) =>
          [s.item, isActive ? s.active : ""].join(" ")
        }
      >
        <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9v-1a6 6 0 0112 0v1H5z" />
        </svg>
        <span className={s.label}>My Page</span>
      </NavLink>

      <NavLink
        to="/support"
        className={({ isActive }) =>
          [s.item, isActive ? s.active : ""].join(" ")
        }
      >
        <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v5l4 2-.7 1.4L11 13V7h2z" />
        </svg>
        <span className={s.label}>Support</span>
      </NavLink>
    </nav>
  );
}

export function BottomNavSpacer() {
  return <div className={s.spacer} aria-hidden="true" />;
}
