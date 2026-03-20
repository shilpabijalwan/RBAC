import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction, selectCurrentUser } from "../../store/slices/authSlice";
import "../../pages/shared.css";
import "./AppLayout.css";
import { useLogoutMutation } from "../../store/services/AuthServices";

function AppLayout() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const userName = currentUser?.name || currentUser?.fullName || "User";
  const userEmail = currentUser?.email || "user@example.com";
  const [logout] = useLogoutMutation();
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!userMenuRef.current?.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    try {
      await logout().unwrap();
    } catch (error) {
      console.log("logout error", error);
    } finally {
      dispatch(logoutAction());
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="rbac-layout">
      <aside className="rbac-sidebar">
        <div className="rbac-sidebar__brand">RBAC</div>
        <nav className="rbac-sidebar__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/roles"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            Roles
          </NavLink>
          <NavLink
            to="/permissions"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            Permissions
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? "rbac-sidebar__link--active" : ""}`
            }
          >
            Users
          </NavLink>
        </nav>
      </aside>
      <main className="rbac-main">
        <header className="rbac-header">
          <div className="rbac-header__title-wrap">
            <h1 className="rbac-header__title">Role Based Access Control</h1>
            <p className="rbac-header__subtitle">
              Manage users, roles and permissions
            </p>
          </div>
          <div className="rbac-header__user-wrap" ref={userMenuRef}>
            <button
              type="button"
              className="rbac-header__user"
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={isUserMenuOpen}
            >
              <span className="rbac-header__avatar" aria-hidden>
                {initials}
              </span>
              <span className="rbac-header__user-meta">
                <span className="rbac-header__user-name">{userName}</span>
                <span className="rbac-header__user-email">{userEmail}</span>
              </span>
              <span className="rbac-header__menu-icon" aria-hidden>
                ▾
              </span>
            </button>

            <div
              className={`rbac-user-menu ${isUserMenuOpen ? "rbac-user-menu--open" : ""}`}
              role="menu"
            >
              <button
                type="button"
                className="rbac-user-menu__item"
                role="menuitem"
              >
                Update profile
              </button>
              <button
                type="button"
                className="rbac-user-menu__item"
                role="menuitem"
              >
                Account settings
              </button>
              <button
                type="button"
                className="rbac-user-menu__item rbac-user-menu__item--danger"
                role="menuitem"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
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
