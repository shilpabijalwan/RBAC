import "./Settings.css";

const permissionGroups = [
  {
    title: "Interface Control",
    items: [
      {
        name: "Dashboard Access",
        description: "View global performance metrics and system health.",
        enabled: true,
      },
      {
        name: "Advanced Analytics",
        description: "Access raw data export and historical trend logs.",
        enabled: false,
      },
    ],
  },
  {
    title: "Asset Architecture",
    items: [
      {
        name: "Project Modification",
        description: "Alter project scope, timelines, and technical requirements.",
        enabled: true,
      },
      {
        name: "Team Provisioning",
        description: "Add, remove, or modify team member access levels.",
        enabled: false,
      },
    ],
  },
  {
    title: "Protocol & Oversight",
    items: [
      {
        name: "Audit Log Access",
        description: "Inspect immutable logs of all system transactions.",
        enabled: true,
      },
      {
        name: "Security Override",
        description: "Bypass standard protocols in case of critical alert.",
        enabled: false,
      },
    ],
  },
];

function Settings() {
  return (
    <div className="rbac-page rbac-settings">
      <header className="rbac-settings__hero">
        <div className="rbac-settings__kicker">
          <span className="rbac-settings__dot" />
          <span>Configuration Protocol</span>
        </div>
        <h1>Create/Update Role</h1>
        <p>
          Define access parameters and architectural permissions for system entities. Roles
          dictate the structural boundaries of the Kinetic environment.
        </p>
      </header>

      <form className="rbac-settings__layout">
        <section className="rbac-settings__identity">
          <div className="rbac-settings__field">
            <label htmlFor="role-designation">Role Designation</label>
            <input id="role-designation" type="text" placeholder="e.g. Lead Architect" />
          </div>

          <div className="rbac-settings__field">
            <label htmlFor="role-description">Technical Description</label>
            <textarea
              id="role-description"
              rows="6"
              placeholder="Define the scope and responsibilities of this role..."
            />
          </div>

          <article className="rbac-settings__integrity">
            <h3>Role Integrity</h3>
            <p>
              All changes are logged within the secure audit trail. Provisioning new roles may
              affect active system accounts.
            </p>
            <small>System synchronized</small>
          </article>
        </section>

        <section className="rbac-settings__permissions">
          <div className="rbac-settings__permissions-head">
            <h2>Permission Checklist</h2>
            <button type="button">Select All</button>
          </div>

          {permissionGroups.map((group) => (
            <div key={group.title} className="rbac-settings__group">
              <h3>{group.title}</h3>
              <div className="rbac-settings__items">
                {group.items.map((item) => (
                  <label key={item.name} className="rbac-settings__item">
                    <div>
                      <span>{item.name}</span>
                      <p>{item.description}</p>
                    </div>
                    <span className={`rbac-settings__toggle ${item.enabled ? "is-on" : ""}`}>
                      <span />
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <footer className="rbac-settings__actions">
            <button type="button" className="rbac-settings__cancel">
              Cancel Change
            </button>
            <button type="submit" className="rbac-settings__save">
              Save Role Architecture
            </button>
          </footer>
        </section>
      </form>
    </div>
  );
}

export default Settings;
