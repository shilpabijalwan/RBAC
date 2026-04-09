import { useCallback, useState } from "react";
import CloseButton from "./CloseButton";
import Button from "./Button";

const inputClass =
  "w-full border-0 border-b-2 border-[rgba(65,71,91,0.3)] bg-(--kp-surface-low) px-0 py-3 text-(--kp-on-surface) placeholder-[var(--kp-on-surface-variant)] focus:border-(--kp-secondary) focus:outline-none focus:ring-0";

const teamOptions = [
  "FRONTEND_PLATFORM",
  "BACKEND_SERVICES",
  "FULLSTACK_CORE",
  "DEVOPS_INFRA",
  "DATA_ENGINEERING",
];

function AddUserSideSheet({ open, onClose, onSubmit }) {
  const [selectedRole, setSelectedRole] = useState("System Admin");
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);

      onSubmit({
        name: formData.get("name") ?? "",
        email: formData.get("email") ?? "",
        role: selectedRole ? [selectedRole] : [],
        team: selectedTeams,
        password: formData.get("password") ?? "",
      });
      form.reset();
      setSelectedTeams([]);
      // onClose();
    },
    [onSubmit, selectedRole, selectedTeams],
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
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[980px] flex-col bg-(--kp-surface) shadow-[0_0_32px_rgba(186,158,255,0.2)] outline-[rgba(65,71,91,0.2)] transition-transform duration-300 ease-out ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[rgba(65,71,91,0.2)] px-8 py-4">
          <h2
            id="add-user-sheet-title"
            className="font-['Space_Grotesk'] text-lg font-bold uppercase tracking-[0.24em] text-(--kp-primary)"
          >
            Create User
          </h2>
          <CloseButton onClick={onClose} ariaLabel="Close" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="max-w-lg text-md leading-relaxed text-(--kp-on-surface-variant)">
                  Create a new user profile in the Progesso system. Verify all
                  identity details through the central node before activation.
                </p>
              </div>
              {/* <span className="font-['Space_Grotesk'] text-3xl tracking-[0.2em] text-[rgba(32,42,70,0.9)]">
                EST.2026
              </span> */}
            </div>

            <div className="grid grid-cols-1 overflow-hidden border border-[rgba(65,71,91,0.2)] shadow-[0_30px_40px_rgba(0,0,0,0.45)] md:grid-cols-12">
              <div className="space-y-8 bg-(--kp-surface-high) p-8 md:col-span-7">
                <div className="grid gap-6">
                  <div>
                    <label
                      htmlFor="add-user-name"
                      className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-(--kp-secondary)"
                    >
                      Full Name
                    </label>
                    <input
                      id="add-user-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter Full Name"
                      className={`${inputClass} font-['Space_Grotesk'] text-sm uppercase tracking-tight pl-1`}
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="add-user-email"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-(--kp-secondary)"
                      >
                        Email Address
                      </label>
                      <input
                        id="add-user-email"
                        name="email"
                        type="email"
                        required
                        placeholder="vance.a@kinetic.io"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="add-user-password"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-(--kp-secondary)"
                      >
                        Password
                      </label>
                      <input
                        id="add-user-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[rgba(65,71,91,0.2)] pt-6">
                  <p className="text-md font-bold uppercase tracking-[0.2em] text-(--kp-primary)">
                    Team Assignment
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {teamOptions.map((team) => (
                      <label
                        key={team}
                        className={`inline-flex cursor-pointer items-center gap-2 border px-3 py-2 text-xs font-bold tracking-tight ${selectedTeams.includes(team) ? "border-(--kp-secondary) bg-[rgba(98,250,227,0.08)] text-(--kp-secondary)" : "border-[rgba(65,71,91,0.35)] text-(--kp-on-surface-variant) hover:border-(--kp-primary) hover:text-(--kp-primary)"}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTeams.includes(team)}
                          onChange={() =>
                            setSelectedTeams((prev) =>
                              prev.includes(team)
                                ? prev.filter((t) => t !== team)
                                : [...prev, team],
                            )
                          }
                          className="h-3.5 w-3.5 rounded-none border-[rgba(65,71,91,0.4)] bg-(--kp-surface-low)"
                        />
                        {team}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-(--kp-surface-highest) p-8 md:col-span-5">
                <div className="space-y-8">
                  <div>
                    <p className="mb-4 text-md font-bold uppercase tracking-[0.2em] text-(--kp-tertiary)">
                      Assign Structural Role
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          label: "System Admin",
                          desc: "Full Architectural Control",
                        },
                        {
                          label: "Project Manager",
                          desc: "Vertical Team Oversight",
                        },
                        {
                          label: "Team Lead",
                          desc: "Vertical Team Oversight",
                        },
                        {
                          label: "Team Member",
                          desc: "Standard Operational Access for Team Members",
                        },
                      ].map((role) => (
                        <label
                          key={role.label}
                          className={`flex cursor-pointer items-center justify-between border-l-4 p-4 ${selectedRole === role.label ? "border-(--kp-primary) bg-(--kp-surface-lowest)" : "border-transparent bg-(--kp-surface-low) hover:bg-(--kp-surface-high)"}`}
                        >
                          <span>
                            <span className="block text-sm font-bold text-(--kp-on-surface)">
                              {role.label}
                            </span>
                            <span className="block text-[10px] text-(--kp-on-surface-variant)">
                              {role.desc}
                            </span>
                          </span>
                          <input
                            type="radio"
                            name="role"
                            value={role.label}
                            checked={selectedRole === role.label}
                            onChange={() => setSelectedRole(role.label)}
                            className="h-4 w-4 border-[rgba(65,71,91,0.5)] bg-(--kp-surface-lowest) text-(--kp-primary) focus:ring-(--kp-secondary)"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* <div>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--kp-secondary)">
                        Access Level Matrix
                      </p>
                      <span className="font-['Space_Grotesk'] font-bold text-(--kp-secondary)">
                        LVL 08
                      </span>
                    </div>
                    <div className="h-2 bg-(--kp-surface-lowest)">
                      <div className="h-full w-4/5 bg-(--kp-secondary) shadow-[0_0_15px_rgba(98,250,227,0.4)]" />
                    </div>
                    <div className="mt-3 flex justify-between text-[8px] font-bold uppercase tracking-widest text-(--kp-on-surface-variant)">
                      <span>Restricted</span>
                      <span>Elevated</span>
                      <span>Universal</span>
                    </div>
                  </div> */}
                </div>

                <div className="pt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-4 font-['Space_Grotesk'] text-sm font-black uppercase tracking-[0.2em]"
                  >
                    Create User
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUserSideSheet;
