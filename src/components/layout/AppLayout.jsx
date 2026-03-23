import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout as logoutAction,
  selectCurrentUser,
  setCredentials,
} from "../../store/slices/authSlice";
import "../../pages/shared.css";
import "./AppLayout.css";
import {
  useGetAvailableRolesQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpdateProfileRolesMutation,
} from "../../store/services/AuthServices";
import UpdateProfileSideSheet from "../UpdateProfileSideSheet";

function AppLayout() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [profileSheetKey, setProfileSheetKey] = useState(0);
  const userMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const userName = currentUser?.name || currentUser?.fullName || "User";
  const userEmail = currentUser?.email || "user@example.com";
  const [logout] = useLogoutMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfileRoles] = useUpdateProfileRolesMutation();
  const { data: rolesResponse } = useGetAvailableRolesQuery();
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

  const handleOpenProfileSheet = () => {
    setIsUserMenuOpen(false);
    setProfileSheetKey((k) => k + 1);
    setIsProfileSheetOpen(true);
  };

  const handleProfileUpdate = async (payload) => {
    try {
      const response = await updateProfile(payload).unwrap();
      const updatedUser = response?.user ?? response?.data?.user;
      if (updatedUser) {
        dispatch(setCredentials({ user: updatedUser }));
      }
    } catch (error) {
      console.log("profile update error", error);
    }
  };

  const handleProfileRolesUpdate = async (payload) => {
    try {
      const response = await updateProfileRoles(payload).unwrap();
      const updatedUser = response?.user ?? response?.data?.user;
      if (updatedUser) {
        dispatch(setCredentials({ user: updatedUser }));
      } else {
        dispatch(
          setCredentials({
            user: {
              ...currentUser,
              roles: payload.roles,
            },
          }),
        );
      }
    } catch (error) {
      console.log("roles update error", error);
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
                onClick={handleOpenProfileSheet}
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
        <UpdateProfileSideSheet
          key={profileSheetKey}
          open={isProfileSheetOpen}
          onClose={() => setIsProfileSheetOpen(false)}
          currentUser={currentUser}
          availableRoles={rolesResponse?.roles ?? rolesResponse?.data ?? []}
          onSubmitProfile={handleProfileUpdate}
          onSubmitRoles={handleProfileRolesUpdate}
        />
      </main>
    </div>
  );
}

export default AppLayout;
