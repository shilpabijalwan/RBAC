import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectCurrentUser, setCredentials } from "../../store/slices/authSlice";
import {
  useGetAvailableRolesQuery,
  useUpdateProfileRolesMutation,
} from "../../store/services/AuthServices";
import "../Shared/shared.css";
import "./Settings.css";

function getInitialRoleIds(user) {
  if (!user) return [];
  const roles = user?.roles || user?.role || [];
  if (Array.isArray(roles)) {
    return roles.map((r) => (typeof r === "string" ? r : r.id ?? r.name)).filter(Boolean);
  }
  return typeof roles === "string" ? [roles] : [];
}

function Settings() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [selectedRoles, setSelectedRoles] = useState(() => getInitialRoleIds(currentUser));

  const { data: rolesResponse, isLoading: rolesLoading, isError: rolesError } =
    useGetAvailableRolesQuery();
  const [updateProfileRoles, { isLoading: savingRoles }] = useUpdateProfileRolesMutation();

  useEffect(() => {
    setSelectedRoles(getInitialRoleIds(currentUser));
  }, [currentUser]);

  const resolvedRoles = useMemo(() => {
    const source = rolesResponse?.roles ?? rolesResponse?.data ?? ["Admin", "Editor", "Viewer"];
    return source.map((role) =>
      typeof role === "string"
        ? { id: role, label: role }
        : { id: role.id ?? role.name, label: role.name ?? role.id },
    );
  }, [rolesResponse]);

  const allRoleIds = useMemo(() => resolvedRoles.map((r) => r.id).filter(Boolean), [resolvedRoles]);

  const handleToggleRole = useCallback((roleId) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId],
    );
  }, []);

  const handleSelectAllRoles = useCallback(() => {
    setSelectedRoles((prev) => (prev.length === allRoleIds.length ? [] : [...allRoleIds]));
  }, [allRoleIds]);

  const handleCancel = useCallback(() => {
    setSelectedRoles(getInitialRoleIds(currentUser));
  }, [currentUser]);

  const handleSaveRoles = useCallback(async () => {
    try {
      const response = await updateProfileRoles({ roles: selectedRoles }).unwrap();
      const updatedUser = response?.user ?? response?.data?.user;
      if (updatedUser) {
        dispatch(setCredentials({ user: updatedUser }));
      } else {
        dispatch(
          setCredentials({
            user: {
              ...currentUser,
              roles: selectedRoles,
            },
          }),
        );
      }
      toast.success("Your roles were updated");
    } catch (error) {
      console.log("settings roles update error", error);
      toast.error(error?.data?.message || "Could not update your roles");
    }
  }, [currentUser, dispatch, selectedRoles, updateProfileRoles]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await handleSaveRoles();
    },
    [handleSaveRoles],
  );

  const displayName = currentUser?.name || currentUser?.fullName || "—";
  const displayEmail = currentUser?.email || "—";

  return (
    <div className="rbac-page rbac-settings">
      <header className="rbac-page-hero__header">
        <div>
          <h1 className="rbac-page-hero__title">Your roles</h1>
          <p className="rbac-page-hero__subtitle">Your account; this session only</p>
        </div>
      </header>
      <p className="rbac-settings__lede">
        Choose which roles apply to <strong>your signed-in account</strong> only. This does not
        create or edit organization-wide role definitions.
      </p>
      <p className="rbac-settings__hint">
        To manage role definitions for everyone, go to{" "}
        <Link to="/roles" className="rbac-settings__hint-link">
          Roles
        </Link>
        .
      </p>

      <form className="rbac-settings__layout" onSubmit={handleSubmit}>
        <section className="rbac-settings__identity">
          <div className="rbac-settings__field rbac-settings__field--readonly">
            <span>Signed in as</span>
            <p>{displayName}</p>
          </div>

          <div className="rbac-settings__field rbac-settings__field--readonly">
            <span>Email</span>
            <p>{displayEmail}</p>
          </div>

          <article className="rbac-settings__integrity">
            <h3>Scope</h3>
            <p>
              Changes here update role assignments for your user only. Other accounts and global
              role templates are unchanged.
            </p>
            <small>Current session</small>
          </article>
        </section>

        <section className="rbac-settings__permissions">
          <div className="rbac-settings__permissions-head">
            <h2>Roles for your account</h2>
            <button type="button" onClick={handleSelectAllRoles}>
              {selectedRoles.length === allRoleIds.length && allRoleIds.length > 0
                ? "Clear all"
                : "Select all"}
            </button>
          </div>

          <div className="rbac-settings__group rbac-settings__group--roles">
            {rolesLoading ? (
              <p className="rbac-settings__roles-status">Loading roles…</p>
            ) : rolesError ? (
              <p className="rbac-settings__roles-status rbac-settings__roles-status--error">
                Could not load roles. Try again later.
              </p>
            ) : (
              <div className="rbac-settings__roles">
                {resolvedRoles.map((role) => (
                  <label key={role.id} className="rbac-settings__role-row">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.id)}
                      onChange={() => handleToggleRole(role.id)}
                    />
                    <span>{role.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <footer className="rbac-settings__actions">
            <button type="button" className="rbac-settings__cancel" onClick={handleCancel}>
              Reset
            </button>
            <button type="submit" className="rbac-settings__save" disabled={savingRoles || rolesLoading}>
              {savingRoles ? "Saving…" : "Save your roles"}
            </button>
          </footer>
        </section>
      </form>
    </div>
  );
}

export default Settings;
