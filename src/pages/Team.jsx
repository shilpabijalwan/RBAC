import "./Team.css";
import "./shared.css";

const members = [
  {
    name: "ELARA_VANCE",
    role: "Lead Architecture Specialist",
    tags: ["ADMIN", "SECURITY_CLEARANCE_01"],
    tone: "secondary",
  },
  {
    name: "KAI_SHELBY",
    role: "Logic Operations Manager",
    tags: ["MANAGER", "CORE_ENGINE"],
    tone: "primary",
  },
  {
    name: "LYRA_KHAN",
    role: "Interface Logistics",
    tags: ["MEMBER", "VISUAL_SYS"],
    tone: "muted",
  },
  {
    name: "JAX_THORNE",
    role: "Infrastructure Stability",
    tags: ["MEMBER", "RESTRICTED_ACCESS"],
    tone: "error",
  },
];

function Team() {
  return (
    <div className="rbac-page rbac-team">
      <section className="rbac-team__main">
        <header className="rbac-team__header">
          <div>
            <h1 className="rbac-team__title">TEAM_DIRECTORY</h1>
            <p className="rbac-team__subtitle">
              Total active nodes: 128 / Priority members highlighted
            </p>
          </div>
          <button type="button" className="rbac-btn rbac-btn--primary">
            Provision New Member
          </button>
        </header>

        <div className="rbac-team__grid">
          {members.map((member) => (
            <article key={member.name} className={`rbac-team__card is-${member.tone}`}>
              <div>
                <h3>{member.name}</h3>
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
            </article>
          ))}
        </div>

        <section className="rbac-team__status">
          <h2>GLOBAL_STATUS_BEACON</h2>
          <div className="rbac-team__status-grid">
            <article>
              <p>Network Integrity</p>
              <strong>99.8% NOMINAL</strong>
            </article>
            <article>
              <p>Active Protocols</p>
              <strong>42 ENFORCED</strong>
            </article>
            <article>
              <p>System Alerts</p>
              <strong>02 PENDING</strong>
            </article>
          </div>
        </section>
      </section>

      <aside className="rbac-team__editor">
        <header className="rbac-team__editor-head">
          <h2>PERM_EDITOR_V2</h2>
          <span aria-hidden>◈</span>
        </header>

        <section className="rbac-team__selected">
          <h3>ELARA_VANCE</h3>
          <p>Selected unit</p>
          <div className="rbac-team__auth-track">
            <span />
          </div>
          <small>Authority Level: 85%</small>
        </section>

        <section className="rbac-team__toggle-group">
          <h4>Architecture_Access</h4>
          <div className="rbac-team__toggle-row">
            <span>Modify_Core_Grid</span>
            <span className="rbac-team__toggle is-on" />
          </div>
          <div className="rbac-team__toggle-row">
            <span>Override_Safety_Sync</span>
            <span className="rbac-team__toggle" />
          </div>
          <div className="rbac-team__toggle-row">
            <span>Deploy_Protocol_Z</span>
            <span className="rbac-team__toggle is-on" />
          </div>
        </section>

        <section className="rbac-team__toggle-group">
          <h4>User_Authority</h4>
          <div className="rbac-team__toggle-row">
            <span>Provision_Nodes</span>
            <span className="rbac-team__toggle is-on is-secondary" />
          </div>
          <div className="rbac-team__toggle-row">
            <span>Wipe_Unit_Memory</span>
            <span className="rbac-team__toggle" />
          </div>
        </section>

        <div className="rbac-team__editor-actions">
          <button type="button" className="rbac-team__action rbac-team__action--primary">
            COMMIT_CHANGES
          </button>
          <button type="button" className="rbac-team__action">
            REVERT_TO_DEFAULT
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Team;
