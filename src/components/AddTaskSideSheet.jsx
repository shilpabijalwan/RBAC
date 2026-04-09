import { useCallback, useId, useState } from "react";
import "./AddTaskSideSheet.css";

const projectOptions = [
  { value: "ARCH_V1_STABLE", label: "ARCH_V1_STABLE" },
  { value: "PRECISION_v1", label: "PRECISION_v1" },
  { value: "NODE_04", label: "NODE_04" },
];

function IconClose({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

function IconDatabase({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconCalendar({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function IconPersonAdd({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20v-1a5 5 0 015-5h2M21 12v6M18 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function formatDeadlineDisplay(iso) {
  if (!iso) return "SELECT_DEADLINE";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "SELECT_DEADLINE";
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return `${String(d.getDate()).padStart(2, "0")}_${months[d.getMonth()]}_${d.getFullYear()}`;
}

function AddTaskSideSheet({ open, onClose, onSubmit }) {
  const titleId = useId();
  const formId = useId();
  const [priority, setPriority] = useState("high");
  const [project, setProject] = useState(projectOptions[0].value);
  const [deadline, setDeadline] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const payload = {
        title: String(formData.get("title") ?? "").trim(),
        project,
        deadline: deadline || null,
        description: String(formData.get("description") ?? "").trim(),
        priority,
      };
      if (typeof onSubmit === "function") {
        onSubmit(payload);
      }
      form.reset();
      setPriority("high");
      setProject(projectOptions[0].value);
      setDeadline("");
      onClose();
    },
    [onClose, onSubmit, priority, project, deadline],
  );

  const handleBackdropKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  return (
    <>
      <div
        role="presentation"
        className={`add-task-mask ${open ? "" : "add-task-mask--hidden"}`}
        aria-hidden={!open}
        onClick={onClose}
        onKeyDown={handleBackdropKey}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby={titleId}
        className={`add-task-drawer ${open ? "" : "add-task-drawer--hidden"}`}
      >
        <button type="button" className="add-task-drawer__close-outside" onClick={onClose} aria-label="Close">
          <IconClose />
        </button>
        <div className="add-task-drawer__glow" aria-hidden />

        <div className="add-task-drawer__scroll">
          <div className="add-task-breadcrumb">
            <span>Engineering</span>
            <span aria-hidden>›</span>
            <span className="add-task-breadcrumb__active">Initialize Task</span>
          </div>

          <header className="add-task-header-block">
            <h1 id={titleId} className="add-task-title">
              Create Task
            </h1>
            <div className="add-task-session">
              <span className="add-task-session__dot" aria-hidden />
              <span>Workspace active</span>
            </div>
          </header>

          <form id={formId} className="add-task-form" onSubmit={handleSubmit}>
            <div className="add-task-field-group">
              <label className="add-task-field-label" htmlFor="add-task-objective">
                Task Title
              </label>
              <input
                id="add-task-objective"
                name="title"
                className="add-task-input-title"
                placeholder="e.g. Refactor auth middleware"
                type="text"
                required
              />
              <div className="add-task-underline" aria-hidden />
            </div>

            <div className="add-task-grid-split">
              <div>
                <span className="add-task-field-label add-task-field-label--muted add-task-field-label--block">
                  Project
                </span>
                <label className="add-task-picker-wrap">
                  <select
                    name="project"
                    className="add-task-native"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    aria-label="Project node"
                  >
                    {projectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="add-task-picker">
                    <span>{project}</span>
                    <IconDatabase className="add-task-picker__icon add-task-picker__icon--project" />
                  </div>
                </label>
              </div>

              <div>
                <span className="add-task-field-label add-task-field-label--muted add-task-field-label--block">
                  Due Date
                </span>
                <label className="add-task-picker-wrap">
                  <input
                    type="date"
                    className="add-task-native"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    aria-label="Due date"
                  />
                  <div className="add-task-picker add-task-picker--date">
                    <span>{formatDeadlineDisplay(deadline)}</span>
                    <IconCalendar className="add-task-picker__icon add-task-picker__icon--date" />
                  </div>
                </label>
              </div>
            </div>

            <div>
              <div className="add-task-specs-row">
                <label className="add-task-field-label add-task-field-label--muted" htmlFor="add-task-specs">
                  Description
                </label>
                <span className="add-task-markdown-hint">Markdown supported</span>
              </div>
              <textarea
                id="add-task-specs"
                name="description"
                className="add-task-textarea"
                placeholder="Describe the task scope..."
              />
            </div>

            <div>
              <span className="add-task-field-label add-task-field-label--muted add-task-field-label--block-lg">
                Priority
              </span>
              <div className="add-task-priority-grid" role="group" aria-label="Priority">
                {[
                  { id: "urgent", label: "Urgent" },
                  { id: "high", label: "High" },
                  { id: "normal", label: "Normal" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className={`add-task-priority-btn ${id === "urgent" ? "add-task-priority-btn--urgent" : ""} ${priority === id ? "add-task-priority-btn--active" : ""}`}
                    onClick={() => setPriority(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="add-task-field-label add-task-field-label--muted add-task-field-label--block-lg">
                Assignees
              </span>
              <div className="add-task-assignees">
                <div className="add-task-avatar" title="Elara Vance">
                  EV
                </div>
                <div className="add-task-avatar" title="Kai Shelby">
                  KS
                </div>
                <button type="button" className="add-task-add-person" aria-label="Add assignee">
                  <IconPersonAdd />
                </button>
              </div>
            </div>

          </form>
        </div>

        <footer className="add-task-footer">
          <button type="submit" form={formId} className="add-task-submit">
            Create Task
          </button>
          <button type="button" className="add-task-cancel" onClick={onClose}>
            Cancel
          </button>
          <div className="add-task-footer-meta">
            <span>Draft mode</span>
            <span>Autosave enabled</span>
          </div>
        </footer>
      </aside>
    </>
  );
}

export default AddTaskSideSheet;
