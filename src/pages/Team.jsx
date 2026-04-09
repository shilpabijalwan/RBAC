import { Link } from "react-router-dom";
import { TEAM_MEMBERS } from "../data/teamDirectory";
import "./Team.css";
import "./shared.css";

function Team() {
  return (
    <div className="rbac-page rbac-team">
      <section className="rbac-team__main">
        <header className="rbac-team__header">
          <div>
            <h1 className="rbac-team__title">Team Directory</h1>
            <p className="rbac-team__subtitle">
              Active members: 128 / key contributors highlighted
            </p>
          </div>
          <button type="button" className="rbac-btn rbac-btn--primary">
            Add Team Member
          </button>
        </header>

        <div className="rbac-team__grid">
          {TEAM_MEMBERS.map((member) => (
            <article key={member.slug} className={`rbac-team__card is-${member.tone}`}>
              <Link className="rbac-team__card-link" to={`/team/${member.slug}`}>
                <div>
                  <h3>{member.displayName}</h3>
                  <p>{member.role}</p>
                  <div className="rbac-team__tags">
                    {member.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="rbac-team__arrow" aria-hidden>
                  ›
                </span>
              </Link>
            </article>
          ))}
        </div>

        <section className="rbac-team__status">
          <h2>Team Health Overview</h2>
          <div className="rbac-team__status-grid">
            <article>
              <p>Network Integrity</p>
              <strong>99.8% Stable</strong>
            </article>
            <article>
              <p>Active Policies</p>
              <strong>42 Applied</strong>
            </article>
            <article>
              <p>System Alerts</p>
              <strong>2 Pending</strong>
            </article>
          </div>
        </section>
      </section>

      <aside className="rbac-team__editor">
        <header className="rbac-team__editor-head">
          <h2>Permission Editor</h2>
          <span aria-hidden>◈</span>
        </header>

        <section className="rbac-team__selected">
          <h3>Elara Vance</h3>
          <p>Selected member</p>
          <div className="rbac-team__auth-track">
            <span />
          </div>
          <small>Access level: 85%</small>
        </section>

        <section className="rbac-team__toggle-group">
          <h4>Architecture Access</h4>
          <div className="rbac-team__toggle-row">
            <span>Modify Core Grid</span>
            <span className="rbac-team__toggle is-on" />
          </div>
          <div className="rbac-team__toggle-row">
            <span>Override Safety Sync</span>
            <span className="rbac-team__toggle" />
          </div>
          <div className="rbac-team__toggle-row">
            <span>Deploy Protocol Z</span>
            <span className="rbac-team__toggle is-on" />
          </div>
        </section>

        <section className="rbac-team__toggle-group">
          <h4>User Permissions</h4>
          <div className="rbac-team__toggle-row">
            <span>Provision Nodes</span>
            <span className="rbac-team__toggle is-on is-secondary" />
          </div>
          <div className="rbac-team__toggle-row">
            <span>Reset User Data</span>
            <span className="rbac-team__toggle" />
          </div>
        </section>

        <div className="rbac-team__editor-actions">
          <button type="button" className="rbac-team__action rbac-team__action--primary">
            Save Changes
          </button>
          <button type="button" className="rbac-team__action">
            Reset to Default
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Team;
