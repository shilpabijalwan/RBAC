import { useCallback } from "react";
import Button from "./Button";
import CloseButton from "./CloseButton";

function AddRoleSideSheet({ open, onClose, onSubmit }) {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      onSubmit?.({
        name: formData.get("name") ?? "",
        description: formData.get("description") ?? "",
        permissions: formData.getAll("permissions"),
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
        aria-labelledby="add-role-sheet-title"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[500px] flex-col bg-white shadow-xl transition-transform duration-200 ease-out dark:bg-zinc-900 ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
          <h2
            id="add-role-sheet-title"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Add role
          </h2>
          <CloseButton onClick={onClose} ariaLabel="Close add role side sheet" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="add-role-name"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Role name
                </label>
                <input
                  id="add-role-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Manager"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label
                  htmlFor="add-role-description"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Description
                </label>
                <textarea
                  id="add-role-description"
                  name="description"
                  rows={3}
                  placeholder="What this role can do..."
                  className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Permissions
                </span>
                <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Select one or more permissions for this role.
                </p>
                <div className="space-y-2 rounded-lg border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-600 dark:bg-zinc-800/50">
                  {["create_user", "update_user", "delete_user", "view_reports"].map((permission) => (
                    <label key={permission} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permission}
                        className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save role
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddRoleSideSheet;
