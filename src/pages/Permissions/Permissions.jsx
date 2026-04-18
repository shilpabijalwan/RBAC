import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, Sparkles } from "lucide-react";
import RbacTable from "../../components/RbacTable";
import "../Shared/shared.css";
import "./Permissions.css";

/** Replace with API rows when a list-permissions endpoint is wired. */
const PERMISSION_ROWS = [];

function Permissions() {
  const navigate = useNavigate();
  const rows = PERMISSION_ROWS;

  const uniqueScopes = useMemo(() => {
    const set = new Set(
      rows
        .map((r) =>
          r.scope != null && r.scope !== "" ? String(r.scope) : null,
        )
        .filter(Boolean),
    );
    return set.size;
  }, [rows]);

  const permissionColumns = useMemo(
    () => [
      {
        id: "permission",
        header: "Permission",
        render: (row) => {
          const key = row.key ?? row.name ?? "—";
          return <span className="rbac-permissions__key">{key}</span>;
        },
      },
      {
        id: "scope",
        header: "Scope",
        render: (row) => (
          <span className="rbac-permissions__scope">
            {row.scope != null && row.scope !== "" ? String(row.scope) : "—"}
          </span>
        ),
      },
      { id: "description", header: "Description", accessor: "description" },
      {
        id: "actions",
        header: "Actions",
        render: () => (
          <div className="rbac-permissions__row-actions">
            <span className="rbac-permissions__action-chip" title="Coming soon">
              Edit
            </span>
          </div>
        ),
      },
    ],
    [],
  );

  const permissionCount = rows.length;

  return (
    <div className="rbac-page rbac-permissions">
      <header className="rbac-page-hero__header rbac-permissions__header">
        <div>
          <h1 className="rbac-page-hero__title">Permission catalog</h1>
          <p className="rbac-page-hero__subtitle">
            Model keys and scopes; attach to roles
          </p>
        </div>
      </header>

      <div className="rbac-permissions__stats" role="list">
        <div className="rbac-permissions__stat" role="listitem">
          <span className="rbac-permissions__stat-label">
            Defined permissions
          </span>
          <strong className="rbac-permissions__stat-value">
            {permissionCount}
          </strong>
          <span className="rbac-permissions__stat-hint">Organization-wide</span>
        </div>
        <div className="rbac-permissions__stat" role="listitem">
          <span className="rbac-permissions__stat-label">Distinct scopes</span>
          <strong className="rbac-permissions__stat-value">
            {uniqueScopes}
          </strong>
          <span className="rbac-permissions__stat-hint">
            Across listed permissions
          </span>
        </div>
        <div
          className="rbac-permissions__stat rbac-permissions__stat--accent"
          role="listitem"
        >
          <span className="rbac-permissions__stat-label">Next step</span>
          <p className="rbac-permissions__stat-copy">
            Bundle permissions into roles so assignments stay maintainable.
          </p>
          <Link to="/roles" className="rbac-permissions__stat-link">
            Open role catalog →
          </Link>
        </div>
      </div>

      <div className="rbac-permissions__toolbar">
        <div className="rbac-permissions__toolbar-copy">
          <Sparkles className="rbac-permissions__toolbar-icon" aria-hidden />
          <div>
            <p className="rbac-permissions__toolbar-title">
              Permissions in this workspace
            </p>
            <p className="rbac-permissions__toolbar-sub">
              Create keys from module, action, and scope, then reference them on
              roles.
            </p>
          </div>
        </div>
        <div className="rbac-permissions__toolbar-actions">
          <button
            type="button"
            className="rbac-btn rbac-btn--primary rbac-permissions__cta"
            onClick={() => navigate("/permissions/new")}
          >
            Create permission
          </button>
          {/* <button
            type="button"
            className="rbac-btn rbac-permissions__cta-secondary"
            onClick={() => navigate("/permissions/manage")}
          >
            Update permission
          </button> */}
        </div>
      </div>

      <section
        className="rbac-permissions__surface"
        aria-labelledby="permissions-surface-heading"
      >
        <h2
          id="permissions-surface-heading"
          className="rbac-permissions__surface-heading"
        >
          Directory
        </h2>

        {rows.length > 0 ? (
          <RbacTable
            columns={permissionColumns}
            data={rows}
            getRowKey={(row) => row.id ?? row.key}
            wrapperClassName="rbac-permissions__table-wrap"
            emptyMessage="No permissions yet. Add a permission to get started."
          />
        ) : (
          <div className="rbac-permissions__empty">
            <div className="rbac-permissions__empty-glow" aria-hidden />
            <div className="rbac-permissions__empty-icon-wrap">
              <KeyRound className="rbac-permissions__empty-icon" aria-hidden />
            </div>
            <h3 className="rbac-permissions__empty-title">
              Start your permission catalog
            </h3>
            <p className="rbac-permissions__empty-text">
              You have not defined any permissions yet. Create keys that
              describe what actors may do, then map them to roles from the Roles
              area.
            </p>
            <div className="rbac-permissions__empty-actions">
              <button
                type="button"
                className="rbac-btn rbac-btn--primary rbac-permissions__empty-btn"
                onClick={() => navigate("/permissions/new")}
              >
                Create your first permission
              </button>
              <Link to="/roles" className="rbac-permissions__empty-link">
                Or review roles catalog first
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Permissions;
