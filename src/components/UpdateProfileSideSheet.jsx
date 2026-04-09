import { useCallback, useMemo, useState } from "react";
import "./UpdateProfileSideSheet.css";

function getInitialRoleIds(user) {
  if (!user) return [];
  const roles = user?.roles || user?.role || [];
  if (Array.isArray(roles)) {
    return roles.map((r) => (typeof r === "string" ? r : r.id ?? r.name)).filter(Boolean);
  }
  return typeof roles === "string" ? [roles] : [];
}

function getInitials(user) {
  const name = user?.name || user?.fullName || "System Operator";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "OP";
}

function UpdateProfileSideSheet({
  open,
  onClose,
  currentUser,
  availableRoles = [],
  onSubmitProfile,
  onSubmitRoles,
}) {
  const [selectedRoles, setSelectedRoles] = useState(() => getInitialRoleIds(currentUser));

  const resolvedRoles = useMemo(() => {
    const source = availableRoles?.length ? availableRoles : ["Admin", "Editor", "Viewer"];
    return source.map((role) =>
      typeof role === "string" ? { id: role, label: role } : { id: role.id ?? role.name, label: role.name ?? role.id },
    );
  }, [availableRoles]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleProfileSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const payload = {
        name: formData.get("name") ?? "",
        email: formData.get("email") ?? "",
        phone: formData.get("phone") ?? "",
      };
      onSubmitProfile?.(payload);
      handleClose();
    },
    [handleClose, onSubmitProfile],
  );

  const handleToggleRole = useCallback((roleId) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId],
    );
  }, []);

  const handleRolesSave = useCallback(() => {
    onSubmitRoles?.({ roles: selectedRoles });
    handleClose();
  }, [handleClose, onSubmitRoles, selectedRoles]);

  const userName = currentUser?.name || currentUser?.fullName || "System Operator";
  const userRole = currentUser?.role || "Lead Systems Architect";
  const userEmail = currentUser?.email || "operator@neon-architect.tech";

  return (
    <>
      <div
        role="presentation"
        className={`profile-mask ${open ? "" : "profile-mask--hidden"}`}
        aria-hidden={!open}
        onClick={handleClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby="update-profile-sheet-title"
        className={`profile-sheet ${open ? "" : "profile-sheet--hidden"}`}
      >
        <header className="profile-sheet__topbar">
          <div className="profile-sheet__search-wrap">
            <span className="profile-sheet__search-icon" aria-hidden>
              ⌕
            </span>
            <input className="profile-sheet__search" placeholder="COMMAND_SEARCH..." type="text" />
          </div>

          <div className="profile-sheet__top-actions">
            <button type="button" className="profile-sheet__icon-btn" aria-label="Notifications">
              ◉
            </button>
            <button type="button" className="profile-sheet__icon-btn" aria-label="Command panel">
              ⌘
            </button>
            <button type="button" className="profile-sheet__close-btn" onClick={handleClose} aria-label="Close">
              ✕
            </button>
          </div>
        </header>

        <form id="profile-form" onSubmit={handleProfileSubmit} className="profile-sheet__body">
          <section className="profile-hero">
            <div className="profile-hero__avatar-wrap">
              <div className="profile-hero__avatar">{getInitials(currentUser)}</div>
              <span className="profile-hero__beacon" aria-hidden>
                <span />
              </span>
            </div>

            <div className="profile-hero__meta">
              <p className="profile-hero__phase">PHASE_V4_CORE_ARCHITECT</p>
              <h2 id="update-profile-sheet-title" className="profile-hero__name">
                {userName.replace(/\s+/g, "_")}
              </h2>
              <p className="profile-hero__desc">
                Redefining spatial compute paradigms through kinetic synchronicity. Senior Lead at Kinetic Sync Operations.
              </p>
            </div>
          </section>

          <div className="profile-grid">
            <section className="profile-main">
              <div className="profile-section">
                <h3 className="profile-section__title profile-section__title--primary">IDENTITY_RECORDS</h3>
                <div className="profile-fields">
                  <label className="profile-field">
                    <span>Full Name</span>
                    <input name="name" type="text" defaultValue={userName} />
                  </label>
                  <label className="profile-field">
                    <span>Professional Role</span>
                    <input type="text" value={userRole} readOnly />
                  </label>
                  <label className="profile-field profile-field--full">
                    <span>Communication Endpoint (Email)</span>
                    <input name="email" type="email" defaultValue={userEmail} />
                  </label>
                  <label className="profile-field profile-field--full">
                    <span>Secure Contact Channel</span>
                    <input name="phone" type="text" defaultValue={currentUser?.phone || ""} placeholder="+1 555 123 4567" />
                  </label>
                </div>
              </div>

              <div className="profile-section">
                <h3 className="profile-section__title profile-section__title--secondary">CORE_COMPETENCIES</h3>
                <div className="profile-skills">
                  {["Neural Interface Design", "Rust Performance", "Distributed Systems", "Kinetic UX"].map((skill) => (
                    <span key={skill} className="profile-skill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <aside className="profile-side">
              <div className="profile-panel profile-panel--tertiary">
                <h4>Signal_Filters</h4>
                <div className="profile-toggles">
                  <div className="profile-toggle-row">
                    <div>
                      <strong>Email Dispatch</strong>
                      <small>Critical updates only</small>
                    </div>
                    <span className="profile-toggle is-on" aria-hidden />
                  </div>
                  <div className="profile-toggle-row">
                    <div>
                      <strong>HUD Notifications</strong>
                      <small>Desktop alert overlays</small>
                    </div>
                    <span className="profile-toggle is-on" aria-hidden />
                  </div>
                </div>
              </div>

              <div className="profile-panel">
                <h4>Security_Protocols</h4>
                <button type="button" className="profile-action-btn">Update_Access_Key</button>
                <button type="button" className="profile-action-btn">Configure_2FA</button>
              </div>

              <div className="profile-panel">
                <h4>Access_Roles</h4>
                <div className="profile-roles">
                  {resolvedRoles.map((role) => (
                    <label key={role.id} className="profile-role-item">
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role.id)}
                        onChange={() => handleToggleRole(role.id)}
                      />
                      <span>{role.label}</span>
                    </label>
                  ))}
                </div>
                <button type="button" className="profile-save-roles" onClick={handleRolesSave}>
                  SAVE_ACCESS
                </button>
              </div>

              <div className="profile-health">
                <div>
                  <span>SYNC_INTEGRITY</span>
                  <strong>99.8%</strong>
                </div>
                <div className="profile-health__bar">
                  <span />
                </div>
              </div>
            </aside>
          </div>
        </form>

        <footer className="profile-footer">
          <div className="profile-footer__status">
            <span className="profile-footer__dot" aria-hidden />
            SYSTEM_STABLE: READY_FOR_COMMIT
          </div>
          <div className="profile-footer__actions">
            <button type="button" className="profile-btn profile-btn--ghost" onClick={handleClose}>
              Discard_Changes
            </button>
            <button type="submit" form="profile-form" className="profile-btn profile-btn--primary">
              COMMIT_CHANGES
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}

export default UpdateProfileSideSheet;
