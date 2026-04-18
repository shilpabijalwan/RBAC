import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Sparkles, UsersRound } from "lucide-react";
import AddUserSideSheet from "../../components/AddUserSideSheet";
import RbacRowActionsMenu from "../../components/RbacRowActionsMenu";
import RbacTable from "../../components/RbacTable";
import { useCreateUserMutation, useGetUsersQuery } from "../../store/services/api";
import "../Shared/shared.css";
import "./Users.css";

function normalizeUserRoles(row) {
  const roles = row?.roles ?? row?.role ?? [];
  if (Array.isArray(roles)) {
    return roles
      .map((r) => (typeof r === "string" ? r : r?.name ?? r?.id ?? String(r)))
      .filter(Boolean);
  }
  if (roles) {
    return [typeof roles === "string" ? roles : roles?.name ?? roles?.id].filter(Boolean);
  }
  return [];
}

function Users() {
  const [addUserSheetOpen, setAddUserSheetOpen] = useState(false);
  const [createUser] = useCreateUserMutation();
  const { data: usersResponse, isLoading } = useGetUsersQuery();

  const rows = useMemo(() => {
    const raw =
      usersResponse?.users ??
      usersResponse?.data?.users ??
      usersResponse?.data ??
      (Array.isArray(usersResponse) ? usersResponse : null);
    if (Array.isArray(raw)) return raw;
    return [];
  }, [usersResponse]);

  const handleAddUserSubmit = async (data) => {
    try {
      await createUser(data).unwrap();
      toast.success("User created successfully");
      setAddUserSheetOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create user");
    }
  };

  const handleEditUser = useCallback(() => {}, []);

  const handleDeleteUser = useCallback(() => {}, []);

  const userColumns = useMemo(
    () => [
      { id: "name", header: "User", accessor: "name" },
      { id: "email", header: "Email", accessor: "email" },
      {
        id: "roles",
        header: "Roles",
        render: (row) => {
          const labels = normalizeUserRoles(row);
          if (!labels.length) {
            return (
              <span className="rbac-users__pill rbac-users__pill--muted">None</span>
            );
          }
          return (
            <div className="rbac-table__role-pills rbac-users__pills">
              {labels.map((role) => (
                <span key={role} className="rbac-table__role-pill rbac-users__pill">
                  {role}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        render: (row) => (
          <RbacRowActionsMenu row={row} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        ),
      },
    ],
    [handleDeleteUser, handleEditUser],
  );

  const userCount = rows.length;
  const withRoles = rows.filter((r) => normalizeUserRoles(r).length > 0).length;
  const roleAssignmentCount = rows.reduce((acc, r) => acc + normalizeUserRoles(r).length, 0);

  const showEmptyState = !isLoading && rows.length === 0;

  return (
    <div className="rbac-page rbac-users">
      <header className="rbac-page-hero__header rbac-users__header">
        <div>
          <h1 className="rbac-page-hero__title">User directory</h1>
          <p className="rbac-page-hero__subtitle">
            Invite members; wire roles to your catalog
          </p>
        </div>
      </header>

      <div className="rbac-users__stats" role="list">
        <div className="rbac-users__stat" role="listitem">
          <span className="rbac-users__stat-label">Total users</span>
          <strong className="rbac-users__stat-value">{userCount}</strong>
          <span className="rbac-users__stat-hint">In this workspace</span>
        </div>
        <div className="rbac-users__stat" role="listitem">
          <span className="rbac-users__stat-label">With roles</span>
          <strong className="rbac-users__stat-value">{withRoles}</strong>
          <span className="rbac-users__stat-hint">At least one role assigned</span>
        </div>
        <div className="rbac-users__stat" role="listitem">
          <span className="rbac-users__stat-label">Role links</span>
          <strong className="rbac-users__stat-value">{roleAssignmentCount}</strong>
          <span className="rbac-users__stat-hint">Sum of role rows per user</span>
        </div>
        <div className="rbac-users__stat rbac-users__stat--accent" role="listitem">
          <span className="rbac-users__stat-label">Roles catalog</span>
          <p className="rbac-users__stat-copy">
            Keep role definitions aligned before bulk-assigning users.
          </p>
          <Link to="/roles" className="rbac-users__stat-link">
            Open roles →
          </Link>
        </div>
      </div>

      <div className="rbac-users__toolbar">
        <div className="rbac-users__toolbar-copy">
          <Sparkles className="rbac-users__toolbar-icon" aria-hidden />
          <div>
            <p className="rbac-users__toolbar-title">Members in this workspace</p>
            <p className="rbac-users__toolbar-sub">Add users, then refine roles from the Roles page or profile.</p>
          </div>
        </div>
        <button
          type="button"
          className="rbac-btn rbac-btn--primary rbac-users__cta"
          onClick={() => setAddUserSheetOpen(true)}
        >
          Add user
        </button>
      </div>

      <section className="rbac-users__surface" aria-labelledby="users-surface-heading">
        <h2 id="users-surface-heading" className="rbac-users__surface-heading">
          Directory
        </h2>

        {showEmptyState ? (
          <div className="rbac-users__empty">
            <div className="rbac-users__empty-glow" aria-hidden />
            <div className="rbac-users__empty-icon-wrap">
              <UsersRound className="rbac-users__empty-icon" aria-hidden />
            </div>
            <h3 className="rbac-users__empty-title">No users yet</h3>
            <p className="rbac-users__empty-text">
              Add your first teammate to this workspace. You can assign roles during invite or adjust
              them later from each profile.
            </p>
            <div className="rbac-users__empty-actions">
              <button
                type="button"
                className="rbac-btn rbac-btn--primary rbac-users__empty-btn"
                onClick={() => setAddUserSheetOpen(true)}
              >
                Add your first user
              </button>
              <Link to="/roles" className="rbac-users__empty-link">
                Review roles catalog first
              </Link>
            </div>
          </div>
        ) : (
          <RbacTable
            columns={userColumns}
            data={rows}
            getRowKey={(row) => row.id ?? row.uuid ?? row.email}
            isLoading={isLoading}
            emptyMessage="No users yet. Add a user and assign roles."
            loadingMessage="Loading users…"
            wrapperClassName="rbac-users__table-wrap"
          />
        )}
      </section>

      <AddUserSideSheet
        open={addUserSheetOpen}
        onClose={() => setAddUserSheetOpen(false)}
        onSubmit={handleAddUserSubmit}
      />
    </div>
  );
}

export default Users;
