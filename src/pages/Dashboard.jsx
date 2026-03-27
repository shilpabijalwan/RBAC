import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/slices/authSlice";
import "./Dashboard.css";

function Dashboard() {
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser , "currentUser");
  return (
    <div className="rbac-page rbac-dashboard">
      <header className="rbac-page__header">
        <h1 className="rbac-page__title">Dashboard</h1>
        <p className="rbac-page__subtitle">
          Overview of roles, permissions, and users
        </p>
      </header>
      <div className="rbac-dashboard__grid">
        <section className="rbac-dashboard__card">
          <h2 className="rbac-dashboard__card-title">Roles</h2>
          <p className="rbac-dashboard__card-value">—</p>
          <p className="rbac-dashboard__card-desc">Total roles defined</p>
        </section>
        <section className="rbac-dashboard__card">
          <h2 className="rbac-dashboard__card-title">Permissions</h2>
          <p className="rbac-dashboard__card-value">—</p>
          <p className="rbac-dashboard__card-desc">Total permissions</p>
        </section>
        <section className="rbac-dashboard__card">
          <h2 className="rbac-dashboard__card-title">Users</h2>
          <p className="rbac-dashboard__card-value">—</p>
          <p className="rbac-dashboard__card-desc">
            Users with role assignments
          </p>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
