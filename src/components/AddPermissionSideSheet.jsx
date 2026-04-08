import { useCallback, useMemo, useState } from "react";
import Button from "./Button";
import CloseButton from "./CloseButton";
import {
  PERMISSION_ACTIONS,
  PERMISSION_MODULES,
  PERMISSION_SCOPES,
} from "../constants/constants";

function AddPermissionSideSheet({ open, onClose, onSubmit }) {
  const [selectedModule, setSelectedModule] = useState(PERMISSION_MODULES[0]);
  const [selectedAction, setSelectedAction] = useState(PERMISSION_ACTIONS[0]);
  const [selectedScope, setSelectedScope] = useState(PERMISSION_SCOPES[3]);

  const generatedKey = useMemo(
    () => `${selectedModule}.${selectedAction}.${selectedScope}`,
    [selectedAction, selectedModule, selectedScope],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const moduleName = String(formData.get("module") ?? "").trim();
      const actionName = String(formData.get("action") ?? "").trim();
      const scopeName = String(formData.get("scope") ?? "").trim();
      const baseKey = `${moduleName}.${actionName}.${scopeName}`;

      const extraPermissionsRaw = String(formData.get("extraKeys") ?? "");
      const extraPermissions = extraPermissionsRaw
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const mergedPermissions = [...new Set([baseKey, ...extraPermissions])];

      onSubmit?.({
        // Backward compatibility for current API payload
        name: mergedPermissions,
        // Structured permission model
        key: baseKey,
        module: moduleName,
        action: actionName,
        scope: scopeName,
        keys: mergedPermissions,
        description: formData.get("description") ?? "",
      });
      form.reset();
      onClose();
    },
    [onClose, onSubmit],
  );

  return (
    <>
      <div
        role="presentation"
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-200 ease-out ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby="add-permission-sheet-title"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[500px] flex-col bg-white shadow-xl transition-transform duration-200 ease-out dark:bg-zinc-900 ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
          <h2
            id="add-permission-sheet-title"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Add permission
          </h2>
          <CloseButton onClick={onClose} ariaLabel="Close add permission side sheet" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="add-permission-module"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Module
                </label>
                <select
                  id="add-permission-module"
                  name="module"
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  {PERMISSION_MODULES.map((moduleName) => (
                    <option key={moduleName} value={moduleName}>
                      {moduleName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="add-permission-action"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Action
                </label>
                <select
                  id="add-permission-action"
                  name="action"
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  {PERMISSION_ACTIONS.map((actionName) => (
                    <option key={actionName} value={actionName}>
                      {actionName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="add-permission-scope"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Scope
                </label>
                <select
                  id="add-permission-scope"
                  name="scope"
                  value={selectedScope}
                  onChange={(e) => setSelectedScope(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  {PERMISSION_SCOPES.map((scopeName) => (
                    <option key={scopeName} value={scopeName}>
                      {scopeName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="add-permission-key-preview"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Permission key
                </label>
                <input
                  id="add-permission-key-preview"
                  type="text"
                  value={generatedKey}
                  readOnly
                  className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-700 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-200"
                />
              </div>

              <div>
                <label
                  htmlFor="add-permission-description"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Description
                </label>
                <textarea
                  id="add-permission-description"
                  name="description"
                  rows={3}
                  placeholder="What this permission allows..."
                  className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label
                  htmlFor="add-permission-extra-keys"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Other permission keys
                </label>
                <input
                  id="add-permission-extra-keys"
                  name="extraKeys"
                  type="text"
                  placeholder="Add extra keys, comma separated"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Example: user.read.all, audit.manage.org
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save permission
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPermissionSideSheet;
