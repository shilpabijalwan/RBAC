import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/slices/authSlice";
import "./Dashboard.css";

function Dashboard() {
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser, "currentUser");
  return (
    <div className="rbac-page rbac-dashboard">
      <header className="rbac-dashboard__hero">
        <div className="rbac-dashboard__hero-content">
          <h1 className="rbac-dashboard__hero-title">
            Team{" "}
            <span className="rbac-dashboard__hero-highlight">Velocity</span>{" "}
            Index
          </h1>
          <p className="rbac-dashboard__hero-subtitle">
            Operational oversight of access architecture, role distribution and
            permission lifecycle.
          </p>
        </div>
        <div className="rbac-dashboard__hero-cta">
          <button type="button" className="rbac-btn rbac-btn--primary">
            Initiate Report
          </button>
          <button type="button" className="rbac-dashboard__ghost-btn">
            Configure View
          </button>
        </div>
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
