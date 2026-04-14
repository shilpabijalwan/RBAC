import { useCallback } from "react";
import Button from "./Button";

const inputClass =
  "w-full border-0 border-b-2 border-[rgba(65,71,91,0.3)] bg-(--kp-surface-low) px-0 py-3 text-(--kp-on-surface) placeholder-(--kp-on-surface-variant) focus:border-(--kp-secondary) focus:outline-none focus:ring-0";

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
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[980px] flex-col bg-(--kp-surface) shadow-[0_0_32px_rgba(186,158,255,0.2)] outline-[rgba(65,71,91,0.2)] transition-transform duration-300 ease-out ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[rgba(65,71,91,0.2)] px-8 py-4">
          <h2
            id="add-role-sheet-title"
            className="font-['Space_Grotesk'] text-lg font-bold uppercase tracking-[0.24em] text-(--kp-primary)"
          >
            Create Role
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close add role side sheet"
            className="h-10 w-10 border border-[rgba(65,71,91,0.35)] bg-(--kp-surface-low) text-(--kp-on-surface-variant) transition hover:border-(--kp-secondary) hover:text-(--kp-secondary)"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            <div className="mb-8 max-w-xl">
              <p className="text-md leading-relaxed text-(--kp-on-surface-variant)">
                Define a role and assign baseline permissions for development workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 overflow-hidden border border-[rgba(65,71,91,0.2)] shadow-[0_30px_40px_rgba(0,0,0,0.45)] md:grid-cols-12">
              <div className="space-y-8 bg-(--kp-surface-high) p-8 md:col-span-7">
              <div>
                <label
                  htmlFor="add-role-name"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-(--kp-secondary)"
                >
                  Role name
                </label>
                <input
                  id="add-role-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Manager"
                  className={`${inputClass} font-['Space_Grotesk'] text-sm uppercase tracking-tight pl-1`}
                />
              </div>

              <div>
                <label
                  htmlFor="add-role-description"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-(--kp-secondary)"
                >
                  Description
                </label>
                <textarea
                  id="add-role-description"
                  name="description"
                  rows={3}
                    placeholder="Describe responsibilities and access scope..."
                    className={`${inputClass} min-h-[120px] resize-none pl-1`}
                />
              </div>
              </div>

              <div className="bg-(--kp-surface-highest) p-8 md:col-span-5">
              <div>
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-(--kp-tertiary)">
                  Permissions
                </span>
                  <p className="mb-3 text-xs text-(--kp-on-surface-variant)">
                  Select one or more permissions for this role.
                </p>
                  <div className="space-y-2 border border-[rgba(65,71,91,0.35)] bg-(--kp-surface-low) p-3">
                  {["create_user", "update_user", "delete_user", "view_reports"].map((permission) => (
                      <label key={permission} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permission}
                          className="h-4 w-4 rounded-none border-[rgba(65,71,91,0.45)] bg-(--kp-surface) text-(--kp-primary) focus:ring-(--kp-primary)"
                      />
                        <span className="text-xs uppercase tracking-[0.14em] text-(--kp-on-surface)">
                          {permission}
                        </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 border-t border-[rgba(65,71,91,0.2)] px-8 py-5">
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
