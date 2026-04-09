import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials } from "../store/slices/authSlice";
import {
  useGetAvailableRolesQuery,
  useUpdateProfileMutation,
  useUpdateProfileRolesMutation,
} from "../store/services/AuthServices";
import "./Profile.css";

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

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [selectedRoles, setSelectedRoles] = useState(() => getInitialRoleIds(currentUser));

  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfileRoles] = useUpdateProfileRolesMutation();
  const { data: rolesResponse } = useGetAvailableRolesQuery();

  const resolvedRoles = useMemo(() => {
    const source = rolesResponse?.roles ?? rolesResponse?.data ?? ["Admin", "Editor", "Viewer"];
    return source.map((role) =>
      typeof role === "string" ? { id: role, label: role } : { id: role.id ?? role.name, label: role.name ?? role.id },
    );
  }, [rolesResponse]);

  const handleProfileSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const payload = {
        name: formData.get("name") ?? "",
        email: formData.get("email") ?? "",
        phone: formData.get("phone") ?? "",
      };

      try {
        const response = await updateProfile(payload).unwrap();
        const updatedUser = response?.user ?? response?.data?.user;
        if (updatedUser) {
          dispatch(setCredentials({ user: updatedUser }));
        }
      } catch (error) {
        console.log("profile update error", error);
      }
    },
    [dispatch, updateProfile],
  );

  const handleToggleRole = useCallback((roleId) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId],
    );
  }, []);

  const handleRolesSave = useCallback(async () => {
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
    } catch (error) {
      console.log("roles update error", error);
    }
  }, [currentUser, dispatch, selectedRoles, updateProfileRoles]);

  const userName = currentUser?.name || currentUser?.fullName || "System Operator";
  const userRole = currentUser?.role || "Lead Systems Architect";
  const userEmail = currentUser?.email || "operator@neon-architect.tech";

  return (
    <section className="profile-page">
      <form id="profile-form" onSubmit={handleProfileSubmit} className="profile-page__body">
        <section className="profile-page__hero">
          <div className="profile-page__avatar-wrap">
            <div className="profile-page__avatar">{getInitials(currentUser)}</div>
            <span className="profile-page__beacon" aria-hidden>
              <span />
            </span>
          </div>

          <div className="profile-page__meta">
            <p className="profile-page__phase">PHASE_V4_CORE_ARCHITECT</p>
            <h1 className="profile-page__name">{userName.replace(/\s+/g, "_")}</h1>
            <p className="profile-page__desc">
              Redefining spatial compute paradigms through kinetic synchronicity. Senior Lead at Kinetic Sync Operations.
            </p>
          </div>
        </section>

        <div className="profile-page__grid">
          <section className="profile-page__main">
            <div className="profile-page__section">
              <h2 className="profile-page__title profile-page__title--primary">IDENTITY_RECORDS</h2>
              <div className="profile-page__fields">
                <label className="profile-page__field">
                  <span>Full Name</span>
                  <input name="name" type="text" defaultValue={userName} />
                </label>
                <label className="profile-page__field">
                  <span>Professional Role</span>
                  <input type="text" value={userRole} readOnly />
                </label>
                <label className="profile-page__field profile-page__field--full">
                  <span>Communication Endpoint (Email)</span>
                  <input name="email" type="email" defaultValue={userEmail} />
                </label>
                <label className="profile-page__field profile-page__field--full">
                  <span>Secure Contact Channel</span>
                  <input name="phone" type="text" defaultValue={currentUser?.phone || ""} placeholder="+1 555 123 4567" />
                </label>
              </div>
            </div>

            <div className="profile-page__section">
              <h2 className="profile-page__title profile-page__title--secondary">CORE_COMPETENCIES</h2>
              <div className="profile-page__skills">
                {["Neural Interface Design", "Rust Performance", "Distributed Systems", "Kinetic UX"].map((skill) => (
                  <span key={skill} className="profile-page__skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <aside className="profile-page__side">
            <div className="profile-page__panel profile-page__panel--tertiary">
              <h3>Signal_Filters</h3>
              <div className="profile-page__toggles">
                <div className="profile-page__toggle-row">
                  <div>
                    <strong>Email Dispatch</strong>
                    <small>Critical updates only</small>
                  </div>
                  <span className="profile-page__toggle is-on" aria-hidden />
                </div>
                <div className="profile-page__toggle-row">
                  <div>
                    <strong>HUD Notifications</strong>
                    <small>Desktop alert overlays</small>
                  </div>
                  <span className="profile-page__toggle is-on" aria-hidden />
                </div>
              </div>
            </div>

            <div className="profile-page__panel">
              <h3>Security_Protocols</h3>
              <button type="button" className="profile-page__action-btn">Update_Access_Key</button>
              <button type="button" className="profile-page__action-btn">Configure_2FA</button>
            </div>

            <div className="profile-page__panel">
              <h3>Access_Roles</h3>
              <div className="profile-page__roles">
                {resolvedRoles.map((role) => (
                  <label key={role.id} className="profile-page__role-item">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.id)}
                      onChange={() => handleToggleRole(role.id)}
                    />
                    <span>{role.label}</span>
                  </label>
                ))}
              </div>
              <button type="button" className="profile-page__save-roles" onClick={handleRolesSave}>
                SAVE_ACCESS
              </button>
            </div>

            <div className="profile-page__health">
              <div>
                <span>SYNC_INTEGRITY</span>
                <strong>99.8%</strong>
              </div>
              <div className="profile-page__health-bar">
                <span />
              </div>
            </div>
          </aside>
        </div>
      </form>

      <footer className="profile-page__footer">
        <div className="profile-page__status">
          <span className="profile-page__dot" aria-hidden />
          SYSTEM_STABLE: READY_FOR_COMMIT
        </div>
        <div className="profile-page__actions">
          <button type="button" className="profile-page__btn profile-page__btn--ghost" onClick={() => navigate(-1)}>
            Discard_Changes
          </button>
          <button type="submit" form="profile-form" className="profile-page__btn profile-page__btn--primary">
            COMMIT_CHANGES
          </button>
        </div>
      </footer>
    </section>
  );
}

export default Profile;
