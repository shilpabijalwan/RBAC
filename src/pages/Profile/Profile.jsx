import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials } from "../../store/slices/authSlice";
import {
  useGetAvailableRolesQuery,
  useUpdateProfileMutation,
  useUpdateProfileRolesMutation,
} from "../../store/services/AuthServices";
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
  const name = user?.name || user?.fullName || "User";
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

  const userName = currentUser?.name || currentUser?.fullName || "User";
  const userRole = currentUser?.role || "Software Engineer";
  const userEmail = currentUser?.email || "user@company.com";

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
            <p className="profile-page__phase">PROFILE SETTINGS</p>
            <h1 className="profile-page__name">{userName}</h1>
            <p className="profile-page__desc">
              Manage your account details, notifications, and access preferences.
            </p>
          </div>
        </section>

        <div className="profile-page__grid">
          <section className="profile-page__main">
            <div className="profile-page__section">
              <h2 className="profile-page__title profile-page__title--primary">Profile Information</h2>
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
                  <span>Email Address</span>
                  <input name="email" type="email" defaultValue={userEmail} />
                </label>
                <label className="profile-page__field profile-page__field--full">
                  <span>Phone Number</span>
                  <input name="phone" type="text" defaultValue={currentUser?.phone || ""} placeholder="+1 555 123 4567" />
                </label>
              </div>
            </div>

            <div className="profile-page__section">
              <h2 className="profile-page__title profile-page__title--secondary">Core Skills</h2>
              <div className="profile-page__skills">
                {["React", "TypeScript", "Distributed Systems", "UI/UX"].map((skill) => (
                  <span key={skill} className="profile-page__skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <aside className="profile-page__side">
            <div className="profile-page__panel profile-page__panel--tertiary">
              <h3>Notification Settings</h3>
              <div className="profile-page__toggles">
                <div className="profile-page__toggle-row">
                  <div>
                    <strong>Email Alerts</strong>
                    <small>Only important updates</small>
                  </div>
                  <span className="profile-page__toggle is-on" aria-hidden />
                </div>
                <div className="profile-page__toggle-row">
                  <div>
                    <strong>Desktop Notifications</strong>
                    <small>Browser notification popups</small>
                  </div>
                  <span className="profile-page__toggle is-on" aria-hidden />
                </div>
              </div>
            </div>

            <div className="profile-page__panel">
              <h3>Security</h3>
              <button type="button" className="profile-page__action-btn">Update Password</button>
              <button type="button" className="profile-page__action-btn">Configure Two-Factor Auth</button>
            </div>

            <div className="profile-page__panel">
              <h3>Access Roles</h3>
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
                Save Access
              </button>
            </div>

            <div className="profile-page__health">
              <div>
                <span>Account Health</span>
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
          Ready to save profile changes
        </div>
        <div className="profile-page__actions">
          <button type="button" className="profile-page__btn profile-page__btn--ghost" onClick={() => navigate(-1)}>
            Discard Changes
          </button>
          <button type="submit" form="profile-form" className="profile-page__btn profile-page__btn--primary">
            Save Changes
          </button>
        </div>
      </footer>
    </section>
  );
}

export default Profile;
