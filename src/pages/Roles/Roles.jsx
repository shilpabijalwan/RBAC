import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Shield, Sparkles } from "lucide-react";
import AddRoleSideSheet from "../../components/AddRoleSideSheet";
import RbacTable from "../../components/RbacTable";
import { useCreateRoleMutation } from "../../store/services/api";
import "../Shared/shared.css";
import "./Roles.css";

/** Replace with API rows when `getRoles` (or equivalent) is available. */
const ROLE_ROWS = [];

function Roles() {
  const [addRoleSheetOpen, setAddRoleSheetOpen] = useState(false);
  const [createRole] = useCreateRoleMutation();
  const rows = ROLE_ROWS;

  const handleAddRoleSubmit = async (payload) => {
    try {
      await createRole(payload).unwrap();
      toast.success("Role created");
    } catch (error) {
      console.log("create role error", error);
      toast.error(error?.data?.message || "Failed to create role");
    }
  };

  const roleColumns = useMemo(
    () => [
      { id: "name", header: "Role name", accessor: "name" },
      { id: "description", header: "Description", accessor: "description" },
      {
        id: "permissions",
        header: "Permissions",
        render: (row) => (
          <div className="rbac-table__role-pills rbac-roles__pills">
            {(row.permissions ?? []).length ? (
              (row.permissions ?? []).map((permission) => (
                <span key={permission} className="rbac-table__role-pill rbac-roles__pill">
                  {permission}
                </span>
              ))
            ) : (
              <span className="rbac-roles__pill rbac-roles__pill--muted">None</span>
            )}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        render: () => (
          <div className="rbac-roles__row-actions">
            <span className="rbac-roles__action-chip" title="Coming soon">
              Edit
            </span>
          </div>
        ),
      },
    ],
    [],
  );

  const roleCount = rows.length;
  const permissionSlots = rows.reduce(
    (acc, row) => acc + (Array.isArray(row.permissions) ? row.permissions.length : 0),
    0,
  );

  return (
    <div className="rbac-page rbac-roles">
      <header className="rbac-page-hero__header rbac-roles__header">
        <div>
          <h1 className="rbac-page-hero__title">Role catalog</h1>
          <p className="rbac-page-hero__subtitle">
            Bundle permissions; assign roles to users
          </p>
        </div>
      </header>

      <div className="rbac-roles__stats" role="list">
        <div className="rbac-roles__stat" role="listitem">
          <span className="rbac-roles__stat-label">Defined roles</span>
          <strong className="rbac-roles__stat-value">{roleCount}</strong>
          <span className="rbac-roles__stat-hint">Organization-wide</span>
        </div>
        <div className="rbac-roles__stat" role="listitem">
          <span className="rbac-roles__stat-label">Permission slots</span>
          <strong className="rbac-roles__stat-value">{permissionSlots}</strong>
          <span className="rbac-roles__stat-hint">Across all roles</span>
        </div>
        <div className="rbac-roles__stat rbac-roles__stat--accent" role="listitem">
          <span className="rbac-roles__stat-label">Next step</span>
          <p className="rbac-roles__stat-copy">
            Create permissions first, then wire them into each role.
          </p>
          <Link to="/permissions/new" className="rbac-roles__stat-link">
            Open permission editor →
          </Link>
        </div>
      </div>

      <div className="rbac-roles__toolbar">
        <div className="rbac-roles__toolbar-copy">
          <Sparkles className="rbac-roles__toolbar-icon" aria-hidden />
          <div>
            <p className="rbac-roles__toolbar-title">Roles in this workspace</p>
            <p className="rbac-roles__toolbar-sub">Add a role, then attach permissions from your catalog.</p>
          </div>
        </div>
        <button
          type="button"
          className="rbac-btn rbac-btn--primary rbac-roles__cta"
          onClick={() => setAddRoleSheetOpen(true)}
        >
          Add role
        </button>
      </div>

      <section className="rbac-roles__surface" aria-labelledby="roles-surface-heading">
        <h2 id="roles-surface-heading" className="rbac-roles__surface-heading">
          Directory
        </h2>

        {rows.length > 0 ? (
          <RbacTable
            columns={roleColumns}
            data={rows}
            wrapperClassName="rbac-roles__table-wrap"
            emptyMessage="No roles yet. Add a role to get started."
          />
        ) : (
          <div className="rbac-roles__empty">
            <div className="rbac-roles__empty-glow" aria-hidden />
            <div className="rbac-roles__empty-icon-wrap">
              <Shield className="rbac-roles__empty-icon" aria-hidden />
            </div>
            <h3 className="rbac-roles__empty-title">Start your role model</h3>
            <p className="rbac-roles__empty-text">
              You have not defined any roles yet. Create a role to group permissions, then assign that
              role to users from the Users area.
            </p>
            <div className="rbac-roles__empty-actions">
              <button
                type="button"
                className="rbac-btn rbac-btn--primary rbac-roles__empty-btn"
                onClick={() => setAddRoleSheetOpen(true)}
              >
                Add your first role
              </button>
              <Link to="/permissions/new" className="rbac-roles__empty-link">
                Or create permissions first
              </Link>
            </div>
          </div>
        )}
      </section>

      <AddRoleSideSheet
        open={addRoleSheetOpen}
        onClose={() => setAddRoleSheetOpen(false)}
        onSubmit={handleAddRoleSubmit}
      />
    </div>
  );
}

export default Roles;
