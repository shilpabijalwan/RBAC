import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getTeamMemberBySlug } from "../../data/teamDirectory";
import "./TeamMemberProfile.css";

function IconArchitecture({ className }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L2 9l10 6 10-6-10-6zM2 15l10 6 10-6M7 12l5 3 5-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function IconBolt({ className }) {
  return (
    <svg className={className} width="96" height="96" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}

function IconTaskAlt({ className }) {
  return (
    <svg className={className} width="96" height="96" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

function IconHub({ className }) {
  return (
    <svg className={className} width="96" height="96" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="5" cy="8" r="2" fill="currentColor" />
      <circle cx="19" cy="8" r="2" fill="currentColor" />
      <circle cx="5" cy="16" r="2" fill="currentColor" />
      <circle cx="19" cy="16" r="2" fill="currentColor" />
      <path
        d="M7 8h2M15 8h2M7 16h2M15 16h2M12 9v3M9 12h6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function IconCheckCircle({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

function IconLock({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  );
}

function initialsFromName(displayName) {
  const parts = displayName.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return `${a}${b}`.toUpperCase() || "?";
}

function TeamMemberProfile() {
  const { memberSlug } = useParams();
  const member = memberSlug ? getTeamMemberBySlug(memberSlug) : undefined;

  useEffect(() => {
    if (member) {
      document.title = `METRIC_ARCHITECT | ${member.displayName} Profile`;
    }
    return () => {
      document.title = "rbac";
    };
  }, [member]);

  if (!memberSlug || !member) {
    return <Navigate to="/team" replace />;
  }

  return (
    <div className="tm-profile rbac-page">
      <nav className="tm-profile__back" aria-label="Breadcrumb">
        <Link to="/team" className="tm-profile__back-link">
          ← TEAM_DIRECTORY
        </Link>
      </nav>

      <header className="tm-profile__header">
        <div className="tm-profile__avatar-wrap">
          <div className="tm-profile__avatar-glow" aria-hidden />
          <div className="tm-profile__avatar" aria-hidden>
            {initialsFromName(member.displayName)}
          </div>
          <span className="tm-profile__status-badge">{member.statusLabel}</span>
        </div>
        <div className="tm-profile__intro">
          <div className="tm-profile__name-row">
            <h1 className="tm-profile__name">{member.displayName}</h1>
            <span className="tm-profile__level-pill">{member.levelLabel}</span>
          </div>
          <p className="tm-profile__lead">
            <IconArchitecture className="tm-profile__lead-icon" />
            {member.leadTitle}
          </p>
          <div className="tm-profile__actions">
            <button type="button" className="tm-profile__btn tm-profile__btn--primary">
              Direct Message
            </button>
            <button type="button" className="tm-profile__btn tm-profile__btn--ghost">
              Assign Task
            </button>
          </div>
        </div>
      </header>

      <section className="tm-profile__bento" aria-label="Performance metrics">
        <article className="tm-profile__metric">
          <div className="tm-profile__metric-deco" aria-hidden>
            <IconBolt />
          </div>
          <p className="tm-profile__metric-label">Velocity Score</p>
          <div className="tm-profile__metric-value-row">
            <span className="tm-profile__metric-num tm-profile__metric-num--primary">{member.velocityScore}</span>
            <span className="tm-profile__metric-delta">{member.velocityDelta}</span>
          </div>
          <div className="tm-profile__metric-bar-track">
            <div
              className="tm-profile__metric-bar-fill tm-profile__metric-bar-fill--primary"
              style={{ width: `${Math.min(100, Math.max(0, member.velocityBarPct))}%` }}
            />
            <div
              className="tm-profile__metric-bar-glow tm-profile__metric-bar-glow--primary"
              style={{ width: `${Math.min(100, Math.max(0, member.velocityBarPct))}%` }}
            />
          </div>
        </article>
        <article className="tm-profile__metric">
          <div className="tm-profile__metric-deco" aria-hidden>
            <IconTaskAlt />
          </div>
          <p className="tm-profile__metric-label">Task Completion Rate</p>
          <div className="tm-profile__metric-value-row">
            <span className="tm-profile__metric-num tm-profile__metric-num--secondary">{member.taskCompletion}</span>
          </div>
          <div className="tm-profile__task-bars" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`tm-profile__task-bar ${i < member.taskBarsFilled ? "is-on" : ""}`}
              />
            ))}
          </div>
        </article>
        <article className="tm-profile__metric">
          <div className="tm-profile__metric-deco" aria-hidden>
            <IconHub />
          </div>
          <p className="tm-profile__metric-label">Technical Index</p>
          <div className="tm-profile__metric-value-row">
            <span className="tm-profile__metric-num tm-profile__metric-num--tertiary">{member.technicalIndex}</span>
          </div>
          <p className="tm-profile__metric-footnote">{member.technicalSubtitle}</p>
        </article>
      </section>

      <div className="tm-profile__split">
        <div className="tm-profile__main-col">
          <section className="tm-profile__section">
            <div className="tm-profile__section-head">
              <h2 className="tm-profile__section-title">Active Assignments</h2>
              <span className="tm-profile__section-meta">
                {member.assignmentsActiveCount} In Progress
              </span>
            </div>
            <div className="tm-profile__assignments">
              {member.assignments.map((a) => (
                <div
                  key={a.id}
                  className={`tm-profile__assignment tm-profile__assignment--${a.priorityTone}`}
                >
                  <div className="tm-profile__assignment-top">
                    <span className="tm-profile__assignment-priority">{a.priorityLabel}</span>
                    <span className="tm-profile__assignment-id">ID: {a.id}</span>
                  </div>
                  <h3 className="tm-profile__assignment-title">{a.title}</h3>
                  <p className="tm-profile__assignment-desc">{a.description}</p>
                  <div className="tm-profile__assignment-progress">
                    <div className="tm-profile__collab" aria-hidden>
                      {Array.from({ length: a.collaboratorCount }).map((_, i) => (
                        <span key={i} className="tm-profile__collab-dot" />
                      ))}
                    </div>
                    <div className="tm-profile__progress-track">
                      <div
                        className={`tm-profile__progress-fill tm-profile__progress-fill--${a.priorityTone}`}
                        style={{ width: `${a.progressPct}%` }}
                      />
                    </div>
                    <span className="tm-profile__progress-pct">{a.progressPct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="tm-profile__section">
            <div className="tm-profile__section-head">
              <h2 className="tm-profile__section-title">Development Velocity</h2>
              <div className="tm-profile__heatmap-legend">
                <span>Less</span>
                <span className="tm-profile__heat-swatch tm-profile__heat-swatch--0" />
                <span className="tm-profile__heat-swatch tm-profile__heat-swatch--2" />
                <span className="tm-profile__heat-swatch tm-profile__heat-swatch--3" />
                <span className="tm-profile__heat-swatch tm-profile__heat-swatch--4" />
                <span>More</span>
              </div>
            </div>
            <div className="tm-profile__heatmap-scroll">
              <div className="tm-profile__heatmap-grid">
                {member.heatmap.map((level, idx) => (
                  <span key={idx} className={`tm-profile__heat-cell tm-profile__heat-cell--${level}`} />
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="tm-profile__side-col">
          <section className="tm-profile__rbac">
            <h2 className="tm-profile__rbac-title">RBAC Permissions</h2>
            <ul className="tm-profile__rbac-list">
              {member.rbac.map((row) => (
                <li
                  key={row.title}
                  className={`tm-profile__rbac-item ${row.locked ? "is-locked" : ""}`}
                >
                  {row.locked ? (
                    <IconLock className="tm-profile__rbac-icon tm-profile__rbac-icon--muted" />
                  ) : (
                    <IconCheckCircle className="tm-profile__rbac-icon tm-profile__rbac-icon--ok" />
                  )}
                  <div>
                    <p className="tm-profile__rbac-item-title">{row.title}</p>
                    <p className="tm-profile__rbac-item-desc">{row.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="tm-profile__rbac-audit">{member.auditLabel}</p>
          </section>

          <section className="tm-profile__skills">
            <h2 className="tm-profile__skills-title">Core Skills</h2>
            <div className="tm-profile__skills-tags">
              {member.skills.map((s) => (
                <span key={s} className="tm-profile__skill-tag">
                  {s}
                </span>
              ))}
            </div>
          </section>

          <div className="tm-profile__beacon">
            <div>
              <p className="tm-profile__beacon-label">Architecture Health</p>
              <p className="tm-profile__beacon-value">Stable Node Connected</p>
            </div>
            <div className="tm-profile__beacon-dot-wrap" aria-hidden>
              <span className="tm-profile__beacon-ping" />
              <span className="tm-profile__beacon-dot" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default TeamMemberProfile;
