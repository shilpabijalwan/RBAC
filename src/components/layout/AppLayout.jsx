import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout as logoutAction,
  selectCurrentUser,
} from "../../store/slices/authSlice";
import "../../pages/Shared/shared.css";
import "./AppLayout.css";
import { useLogoutMutation } from "../../store/services/AuthServices";

function AppLayout() {
  const { pathname } = useLocation();
  const teamNavActive = pathname === "/team" || pathname.startsWith("/team/");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const userName = currentUser?.name || currentUser?.fullName || "User";
  const userEmail = currentUser?.email || "user@company.com";
  const [logout] = useLogoutMutation();
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log("logout error", error);
    } finally {
      dispatch(logoutAction());
      navigate("/login", { replace: true });
    }
  };

  const handleOpenProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div className="rbac-layout">
      <aside className="rbac-sidebar">
        <div className="rbac-sidebar__brand-wrap">
          <div className="rbac-sidebar__brand">PROGRESSO</div>
          <p className="rbac-sidebar__tag">Access Management</p>
        </div>
        <nav className="rbac-sidebar__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            <span className="rbac-sidebar__icon" aria-hidden>
              ▣
            </span>
            Dashboard
          </NavLink>
          <NavLink
            to="/roles"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            <span className="rbac-sidebar__icon" aria-hidden>
              ◫
            </span>
            Roles
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            <span className="rbac-sidebar__icon" aria-hidden>
              ◧
            </span>
            Projects
          </NavLink>
          <NavLink
            to="/team"
            className={() =>
              `rbac-sidebar__link ${teamNavActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            <span className="rbac-sidebar__icon" aria-hidden>
              ◉
            </span>
            Team
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            <span className="rbac-sidebar__icon" aria-hidden>
              ⚙
            </span>
            Settings
          </NavLink>
          {/* <NavLink
            to="/permissions"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            <span className="rbac-sidebar__icon" aria-hidden>
              ◇
            </span>
            Permissions
          </NavLink> */}
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            <span className="rbac-sidebar__icon" aria-hidden>
              ◎
            </span>
            Users
          </NavLink>
        </nav>
        <div className="rbac-sidebar__footer">
          <button
            type="button"
            className="rbac-sidebar__logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="rbac-main">
        <header className="rbac-header">
          <div className="rbac-header__left">
            <div className="rbac-header__search-wrap">
              <span className="rbac-header__search-icon" aria-hidden>
                ⌕
              </span>
              <input
                type="text"
                className="rbac-header__search"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="rbac-header__right">
            <button
              type="button"
              className="rbac-header__notify"
              aria-label="Notifications"
            >
              <span aria-hidden>◉</span>
              <span className="rbac-header__notify-dot" aria-hidden />
            </button>
            <button
              type="button"
              className="rbac-header__user"
              onClick={handleOpenProfilePage}
              aria-label="Open my profile"
            >
              <span className="rbac-header__user-meta">
                <span className="rbac-header__user-name">{currentUser?.role || "My Profile"}</span>
                <span className="rbac-header__user-subtitle">{userEmail}</span>
              </span>
              <span className="rbac-header__avatar" aria-hidden>
                {initials}
              </span>
            </button>
          </div>
        </header>
        <section className="rbac-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AppLayout;
