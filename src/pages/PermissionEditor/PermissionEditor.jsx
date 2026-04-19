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
  const [selectedActions, setSelectedActions] = useState(
    PERMISSION_ACTIONS[0]?.value ? [PERMISSION_ACTIONS[0].value] : [],
  );

  const generatedKey = useMemo(() => {
    if (!selectedActions.length) return "";

    return selectedActions
      .map((action) => `${selectedModule}:${action}`)
      .join(", ");
  }, [selectedActions, selectedModule]);

  const handleActionToggle = (actionValue) => {
    setSelectedActions((prevActions) => {
      if (prevActions.includes(actionValue)) {
        // Keep at least one action selected for predictable payload shape.
        if (prevActions.length === 1) return prevActions;
        return prevActions.filter((item) => item !== actionValue);
      }

      return [...prevActions, actionValue];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const moduleName = String(formData.get("module") ?? "").trim();
    const actionNames = formData
      .getAll("action")
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
    const baseKeys = actionNames.map((actionName) => `${moduleName}:${actionName}`);
    const primaryAction = actionNames[0] ?? "";
    const primaryKey = baseKeys[0] ?? "";
    const extraPermissionsRaw = String(formData.get("extraKeys") ?? "");
    const extraPermissions = extraPermissionsRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const mergedPermissions = [...new Set([...baseKeys, ...extraPermissions])];

    if (isUpdateRoute) {
      toast.success(
        "Update permission screen is ready. Connect update API to save changes.",
      );
      return;
    }

    try {
      await createPermission({
        name: mergedPermissions,
        // key: primaryKey,
        module: moduleName,
        // action: primaryAction,
        // keys: mergedPermissions,
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

          <div className="permission-editor__field">
            <span>Action</span>
            <div className="permission-editor__checkbox-group" role="group" aria-label="Action">
              {PERMISSION_ACTIONS.map((action) => (
                <label key={action.value} className="permission-editor__checkbox-item">
                  <input
                    type="checkbox"
                    name="action"
                    value={action.value}
                    checked={selectedActions.includes(action.value)}
                    onChange={() => handleActionToggle(action.value)}
                  />
                  <span>{action.label}</span>
                </label>
              ))}
            </div>
          </div>
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
