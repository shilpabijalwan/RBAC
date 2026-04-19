import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  PERMISSION_ACTIONS,
  PERMISSION_MODULES,
} from "../../constants/constants";
import { useCreatePermissionMutation } from "../../store/services/api";
import "./PermissionEditor.css";
import { ArrowLeft } from "lucide-react";

function PermissionEditor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [createPermission] = useCreatePermissionMutation();

  const isCreateRoute = pathname.endsWith("/permissions/new");
  const isUpdateRoute = pathname.endsWith("/permissions/manage");

  const [selectedModule, setSelectedModule] = useState(
    PERMISSION_MODULES[0]?.value ?? "",
  );
  const [selectedAction, setSelectedAction] = useState(
    PERMISSION_ACTIONS[0]?.value ?? "",
  );

  const generatedKey = useMemo(
    () => `${selectedModule}:${selectedAction}`,
    [selectedAction, selectedModule],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const moduleName = String(formData.get("module") ?? "").trim();
    const actionName = String(formData.get("action") ?? "").trim();
    const baseKey = `${moduleName}:${actionName}`;
    const extraPermissionsRaw = String(formData.get("extraKeys") ?? "");
    const extraPermissions = extraPermissionsRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const mergedPermissions = [...new Set([baseKey, ...extraPermissions])];

    if (isUpdateRoute) {
      toast.success(
        "Update permission screen is ready. Connect update API to save changes.",
      );
      return;
    }

    try {
      await createPermission({
        name: mergedPermissions,
        key: baseKey,
        module: moduleName,
        action: actionName,
        keys: mergedPermissions,
        description: formData.get("description") ?? "",
      }).unwrap();

      toast.success("Permission created");
      navigate("/permissions");
    } catch (error) {
      console.log("create permission error", error);
      toast.error(error?.data?.message || "Failed to create permission");
    }
  };

  const pageTitle = isCreateRoute ? "Create permission" : "Update permission";
  const pageSubtitle = isCreateRoute
    ? "Define a permission key from module, action, and scope, then save it to your catalog."
    : "Adjust module, action, scope, or description for an existing permission. Wire your PATCH API here when ready.";

  return (
    <section className="rbac-page permission-editor">
      <div className="permission-editor__top">
        <button
          type="button"
          className="permission-editor__back"
          onClick={() => navigate("/permissions")}
        >
          <ArrowLeft size={16}/> Permissions
        </button>
      </div>
      <header className="rbac-page__header">
        <h1 className="rbac-page__title">{pageTitle}</h1>
        <p className="rbac-page__subtitle">{pageSubtitle}</p>
      </header>

      <form className="permission-editor__form" onSubmit={handleSubmit}>
        <div className="permission-editor__grid">
          <label
            className="permission-editor__field"
            htmlFor="permission-editor-module"
          >
            <span>Module</span>
            <select
              id="permission-editor-module"
              name="module"
              value={selectedModule}
              onChange={(event) => setSelectedModule(event.target.value)}
            >
              {PERMISSION_MODULES.map((module) => (
                <option key={module.value} value={module.value}>
                  {module.label}
                </option>
              ))}
            </select>
          </label>

          <label
            className="permission-editor__field"
            htmlFor="permission-editor-action"
          >
            <span>Action</span>
            <select
              id="permission-editor-action"
              name="action"
              value={selectedAction}
              onChange={(event) => setSelectedAction(event.target.value)}
            >
              {PERMISSION_ACTIONS.map((action) => (
                <option key={action.value} value={action.value}>
                  {action.label}
                </option>
              ))}
            </select>
          </label>

          {/* <label
            className="permission-editor__field"
            htmlFor="permission-editor-scope"
          >
            <span>Scope</span>
            <select
              id="permission-editor-scope"
              name="scope"
              value={selectedScope}
              onChange={(event) => setSelectedScope(event.target.value)}
            >
              {PERMISSION_SCOPES.map((scopeName) => (
                <option key={scopeName} value={scopeName}>
                  {scopeName}
                </option>
              ))}
            </select>
          </label> */}

          <label
            className="permission-editor__field permission-editor__field--full"
            htmlFor="permission-editor-key"
          >
            <span>Permission Key</span>
            <input
              id="permission-editor-key"
              type="text"
              value={generatedKey}
              readOnly
            />
          </label>

          {/* <label
            className="permission-editor__field permission-editor__field--full"
            htmlFor="permission-editor-description"
          >
            <span>Description</span>
            <textarea
              id="permission-editor-description"
              name="description"
              rows={4}
              placeholder="What this permission allows..."
            />
          </label> */}

          {/* <label
            className="permission-editor__field permission-editor__field--full"
            htmlFor="permission-editor-extra-keys"
          >
            <span>Other Permission Keys</span>
            <input
              id="permission-editor-extra-keys"
              name="extraKeys"
              type="text"
              placeholder="Add extra keys, comma separated"
            />
            <small>Example: user.read.all, audit.manage.org</small>
          </label> */}
        </div>

        <footer className="permission-editor__actions">
          <button
            type="button"
            className="rbac-btn"
            onClick={() => navigate("/permissions")}
          >
            Cancel
          </button>
          <button type="submit" className="rbac-btn rbac-btn--primary">
            {isCreateRoute ? "Create permission" : "Save changes"}
          </button>
        </footer>
      </form>
    </section>
  );
}

export default PermissionEditor;
