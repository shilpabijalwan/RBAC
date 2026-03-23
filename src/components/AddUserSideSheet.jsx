import { useCallback } from "react";
import CloseButton from "./CloseButton";
import Button from "./Button";

function AddUserSideSheet({ open, onClose, onSubmit }) {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      
      onSubmit({
        name: formData.get("name") ?? "",
        email: formData.get("email") ?? "",
        role: formData.getAll("roles"),
        password: formData.get("password") ?? "",
      });
      form.reset();
      // onClose();
    },
    [onSubmit],
  );

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-200 ease-out ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby="add-user-sheet-title"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[500px] flex-col bg-white shadow-xl transition-transform duration-200 ease-out dark:bg-zinc-900 ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
          <h2
            id="add-user-sheet-title"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Add user
          </h2>
          <CloseButton onClick={onClose} ariaLabel="Close" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="add-user-name"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Name
                </label>
                <input
                  id="add-user-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>
              <div>
                <label
                  htmlFor="add-user-email"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Email
                </label>
                <input
                  id="add-user-email"
                  name="email"
                  type="email"
                  required
                  placeholder="e.g. jane@example.com"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>
              <div>
                <label
                  htmlFor="add-user-email"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  password
                </label>
                <input
                  id="add-user-password"
                  name="password"
                  type="password"
                  // required
                  placeholder="e.g. password"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Roles
                </span>
                <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Select one or more roles for this user.
                </p>
                <div className="space-y-2 rounded-lg border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-600 dark:bg-zinc-800/50">
                  {/* Placeholder roles; replace with real data from props/context later */}
                  {["Admin", "Editor", "Viewer"].map((role) => (
                    <label
                      key={role}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        name="roles"
                        value={role}
                        className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        {role}
                      </span>
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
              Save user
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUserSideSheet;
