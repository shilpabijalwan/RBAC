import { useCallback, useMemo, useState } from "react";
import Button from "./Button";
import CloseButton from "./CloseButton";

function getInitialRoleIds(user) {
  if (!user) return [];
  const roles = user?.roles || user?.role || [];
  if (Array.isArray(roles)) {
    return roles.map((r) => (typeof r === "string" ? r : r.id ?? r.name)).filter(Boolean);
  }
  return typeof roles === "string" ? [roles] : [];
}

function UpdateProfileSideSheet({
  open,
  onClose,
  currentUser,
  availableRoles = [],
  onSubmitProfile,
  onSubmitRoles,
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedRoles, setSelectedRoles] = useState(() => getInitialRoleIds(currentUser));

  const resolvedRoles = useMemo(() => {
    const source = availableRoles?.length ? availableRoles : ["Admin", "Editor", "Viewer"];
    return source.map((role) =>
      typeof role === "string" ? { id: role, label: role } : { id: role.id ?? role.name, label: role.name ?? role.id },
    );
  }, [availableRoles]);

  const handleClose = useCallback(() => {
    onClose();
    setActiveTab("profile");
  }, [onClose]);

  const handleProfileSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
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

  return (
    <>
      <div
        role="presentation"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ease-out ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
        onClick={handleClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby="update-profile-sheet-title"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[600px] flex-col bg-white shadow-xl transition-transform duration-200 ease-out dark:bg-zinc-900 ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
          <h2
            id="update-profile-sheet-title"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Update profile
          </h2>
          <CloseButton onClick={handleClose} ariaLabel="Close update profile sheet" />
        </div>

        <div className="border-b border-zinc-200 px-6 py-3 dark:border-zinc-700">
          <div className="flex gap-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
              type="button"
              className={`rounded-md px-3 py-1.5 text-sm ${activeTab === "profile" ? "bg-white text-zinc-900 shadow dark:bg-zinc-700 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-300"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              type="button"
              className={`rounded-md px-3 py-1.5 text-sm ${activeTab === "access" ? "bg-white text-zinc-900 shadow dark:bg-zinc-700 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-300"}`}
              onClick={() => setActiveTab("access")}
            >
              Access
            </button>
          </div>
        </div>

        {activeTab === "profile" ? (
          <form onSubmit={handleProfileSubmit} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Name
                  </label>
                  <input
                    id="profile-name"
                    name="name"
                    type="text"
                    defaultValue={currentUser?.name || currentUser?.fullName || ""}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Email
                  </label>
                  <input
                    id="profile-email"
                    name="email"
                    type="email"
                    defaultValue={currentUser?.email || ""}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="profile-phone"
                    className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Phone
                  </label>
                  <input
                    id="profile-phone"
                    name="phone"
                    type="text"
                    defaultValue={currentUser?.phone || ""}
                    placeholder="e.g. +1 555 123 4567"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save profile
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
                Update roles and access permissions for this account.
              </p>
              <div className="space-y-2 rounded-lg border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-600 dark:bg-zinc-800/50">
                {resolvedRoles.map((role) => (
                  <label key={role.id} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.id)}
                      onChange={() => handleToggleRole(role.id)}
                      className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{role.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleRolesSave}>
                Save access
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateProfileSideSheet;
