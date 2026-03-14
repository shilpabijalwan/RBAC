import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../../pages/shared.css';
import './AppLayout.css';

function AppLayout() {
  return (
    <div className="rbac-layout">
      <aside className="rbac-sidebar">
        <div className="rbac-sidebar__brand">RBAC</div>
        <nav className="rbac-sidebar__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? 'rbac-sidebar__link--active' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/roles"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? 'rbac-sidebar__link--active' : ''}`
            }
          >
            Roles
          </NavLink>
          <NavLink
            to="/permissions"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? 'rbac-sidebar__link--active' : ''}`
            }
          >
            Permissions
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `rbac-sidebar__link ${isActive ? 'rbac-sidebar__link--active' : ''}`
            }
          >
            Users
          </NavLink>
        </nav>
      </aside>
      <main className="rbac-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
