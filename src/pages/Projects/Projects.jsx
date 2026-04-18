import { useCallback, useState } from "react";
import AddTaskSideSheet from "../../components/AddTaskSideSheet";
import "./Projects.css";
import "../Shared/shared.css";

const columns = [
  {
    key: "todo",
    title: "To Do",
    count: "08",
    accent: "muted",
    cards: [
      {
        tone: "urgent",
        badge: "Urgent",
        title: "Integrate SSO Authentication",
        description: "Enable secure login flow and role mapping for internal users.",
        meta: "2D",
      },
      {
        tone: "normal",
        badge: "Normal",
        title: "Dashboard Rendering Optimization",
        description: "Improve chart rendering performance for large dashboard datasets.",
        meta: "5D",
      },
    ],
  },
  {
    key: "in-progress",
    title: "In Progress",
    count: "03",
    accent: "secondary",
    cards: [
      {
        tone: "critical",
        badge: "Critical",
        title: "Network Latency Audit",
        description: "Investigate API response delays across regional environments.",
        meta: "In Progress",
      },
      {
        tone: "normal",
        badge: "Normal",
        title: "Component Library v2",
        description: "Standardize shared UI components and docs for faster development.",
        meta: "20%",
      },
    ],
  },
  {
    key: "review",
    title: "Review",
    count: "04",
    accent: "tertiary",
    cards: [
      {
        tone: "review",
        badge: "Awaiting QC",
        title: "Map View Coordinate Fix",
        description: "Resolved coordinate mismatch in the geospatial analytics module.",
        meta: "2 reviews pending",
      },
    ],
  },
  {
    key: "done",
    title: "Done",
    count: "128",
    accent: "done",
    cards: [
      {
        tone: "done",
        badge: "Validated",
        title: "Security Patch 8.1.0",
        description: "Completed by Platform Team",
        meta: "",
      },
      {
        tone: "done",
        badge: "Validated",
        title: "API Documentation",
        description: "Archived 12h ago",
        meta: "",
      },
    ],
  },
];

function Projects() {
  const [taskSheetOpen, setTaskSheetOpen] = useState(false);

  const handleTaskSubmit = useCallback((payload) => {
    // Wire to API when available
    console.info("[Projects] task draft", payload);
  }, []);

  return (
    <div className="rbac-page rbac-projects">
      <header className="rbac-projects__header rbac-page-hero__header">
        <div>
          <h1 className="rbac-page-hero__title">Project Board</h1>
          <p className="rbac-page-hero__subtitle">Track active work by status</p>
        </div>
        <div className="rbac-projects__actions">
          <button type="button" className="rbac-projects__btn rbac-projects__btn--ghost">
            Filter View
          </button>
          <button
            type="button"
            className="rbac-btn rbac-btn--primary"
            onClick={() => setTaskSheetOpen(true)}
          >
            New Task +
          </button>
        </div>
      </header>

      <AddTaskSideSheet
        open={taskSheetOpen}
        onClose={() => setTaskSheetOpen(false)}
        onSubmit={handleTaskSubmit}
      />

      <section className="rbac-projects__board">
        {columns.map((column) => (
          <article
            key={column.key}
            className={`rbac-projects__column rbac-projects__column--${column.accent}`}
          >
            <header className="rbac-projects__column-header">
              <h2>{column.title}</h2>
              <span>{column.count}</span>
            </header>
            <div className="rbac-projects__cards">
              {column.cards.map((card) => (
                <div key={`${column.key}-${card.title}`} className={`rbac-projects__card is-${card.tone}`}>
                  <p className="rbac-projects__badge">{card.badge}</p>
                  <h3>{card.title}</h3>
                  <p className="rbac-projects__desc">{card.description}</p>
                  {card.meta ? <p className="rbac-projects__meta">{card.meta}</p> : null}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Projects;
