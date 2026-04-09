import { useCallback, useState } from "react";
import AddTaskSideSheet from "../components/AddTaskSideSheet";
import "./Projects.css";
import "./shared.css";

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
        title: "Integrate Web3 Auth Layer",
        description: "Verification of multi-sig wallets for architect access nodes.",
        meta: "2D",
      },
      {
        tone: "normal",
        badge: "Normal",
        title: "Shader Optimization",
        description: "Refactoring vertex shaders for the main architectural render engine.",
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
        description: "Tracing packet loss across the distributed Tokyo node array.",
        meta: "ACTIVE_NOW",
      },
      {
        tone: "normal",
        badge: "Normal",
        title: "Component Library v2",
        description: "Updating the precision framework for the kinetic UI assets.",
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
        title: "Geo-Spatial Mapping Fix",
        description: "Fixed the coordinate mismatch on the lunar-base visualization module.",
        meta: "2 FEEDBACK LOOPS OPEN",
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
        description: "Completed by @SYSTEM_CORE",
        meta: "",
      },
      {
        tone: "done",
        badge: "Validated",
        title: "API Documentation",
        description: "Archived 12H ago",
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
      <header className="rbac-projects__header">
        <div>
          <h1 className="rbac-projects__title">PROJECT_KINETIC</h1>
          <p className="rbac-projects__subtitle">Team Progress Tracker // Node_04</p>
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
