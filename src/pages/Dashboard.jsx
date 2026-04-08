import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="rbac-page rbac-dashboard">
      <header className="rbac-dashboard__hero">
        <div className="rbac-dashboard__hero-content">
          <h1 className="rbac-dashboard__hero-title">
            Team <span className="rbac-dashboard__hero-highlight">Velocity</span> Index
          </h1>
          <p className="rbac-dashboard__hero-subtitle">
            Operational oversight of architectural sprints. Real-time monitoring of resource
            distribution and deployment frequency.
          </p>
        </div>
        <div className="rbac-dashboard__hero-cta">
          <button type="button" className="rbac-dashboard__ghost-btn">
            Configure view
          </button>
          <button type="button" className="rbac-btn rbac-btn--primary">
            Initiate report
          </button>
        </div>
      </header>

      <section className="rbac-dashboard__bento">
        <article className="rbac-metric-card rbac-metric-card--chart">
          <div className="rbac-metric-card__head">
            <div>
              <p className="rbac-metric-card__eyebrow">Deployment Frequency</p>
              <h3 className="rbac-metric-card__value">
                42.8 <span>+12%</span>
              </h3>
            </div>
            <p className="rbac-metric-card__live">Live stream</p>
          </div>
          <div className="rbac-metric-card__bars" aria-hidden>
            <span style={{ "--h": "40%" }} />
            <span style={{ "--h": "65%" }} />
            <span style={{ "--h": "50%" }} />
            <span className="is-accent" style={{ "--h": "85%" }} />
            <span style={{ "--h": "45%" }} />
            <span style={{ "--h": "70%" }} />
            <span style={{ "--h": "90%" }} />
            <span style={{ "--h": "60%" }} />
            <span style={{ "--h": "55%" }} />
            <span className="is-accent" style={{ "--h": "95%" }} />
            <span style={{ "--h": "40%" }} />
            <span style={{ "--h": "30%" }} />
          </div>
        </article>

        <article className="rbac-metric-card rbac-metric-card--alloc">
          <h3 className="rbac-metric-card__eyebrow">Resource Allocation</h3>
          <div className="rbac-metric-card__progress-list">
            <div className="rbac-progress-item">
              <p>Compute Cluster A</p>
              <span>88%</span>
              <div className="rbac-progress-track"><div style={{ width: "88%" }} /></div>
            </div>
            <div className="rbac-progress-item">
              <p>Frontend Neural Net</p>
              <span>64%</span>
              <div className="rbac-progress-track"><div style={{ width: "64%" }} /></div>
            </div>
            <div className="rbac-progress-item">
              <p>Database Sharding</p>
              <span>31%</span>
              <div className="rbac-progress-track"><div style={{ width: "31%" }} /></div>
            </div>
          </div>
        </article>
      </section>

      <section className="rbac-ledger">
        <div className="rbac-ledger__head">
          <h2>System Ledger // Activity</h2>
          <span>View all logs</span>
        </div>
        <div className="rbac-ledger__table-wrap">
          <table className="rbac-ledger__table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Process Id</th>
                <th>Operator</th>
                <th>Status</th>
                <th>Intensity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>14:22:01</td>
                <td>CORE_REFACTOR_01</td>
                <td>A. Vance</td>
                <td><span className="rbac-ledger__status">Stable</span></td>
                <td>II</td>
              </tr>
              <tr>
                <td>14:18:55</td>
                <td>UPSTREAM_SYNC</td>
                <td>AUTO_DEPLOY</td>
                <td><span className="rbac-ledger__status rbac-ledger__status--error">Critical</span></td>
                <td>IIII</td>
              </tr>
              <tr>
                <td>13:45:12</td>
                <td>SCHEMA_MIGRATION</td>
                <td>L. Kagawa</td>
                <td><span className="rbac-ledger__status rbac-ledger__status--pending">Pending</span></td>
                <td>I</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rbac-beacons">
        <article className="rbac-beacon"><span />Network Health</article>
        <article className="rbac-beacon"><span />Architecture Load</article>
        <article className="rbac-beacon"><span />Uptime Counter</article>
        <article className="rbac-beacon"><span />Security Protocol</article>
      </section>

      <button type="button" className="rbac-dashboard__fab" aria-label="Add">
        +
      </button>

    </div>
  );
}

export default Dashboard;
