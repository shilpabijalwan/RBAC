/**
 * @typedef {Object} TeamAssignment
 * @property {string} id
 * @property {string} priorityLabel
 * @property {'secondary' | 'primary' | 'muted'} priorityTone
 * @property {string} title
 * @property {string} description
 * @property {number} progressPct
 * @property {number} collaboratorCount
 */

/**
 * @typedef {Object} TeamRbacRow
 * @property {string} title
 * @property {string} description
 * @property {boolean} [locked]
 */

/**
 * @typedef {Object} TeamMemberProfile
 * @property {string} slug
 * @property {string} codename
 * @property {string} role
 * @property {string[]} tags
 * @property {'secondary' | 'primary' | 'muted' | 'error'} tone
 * @property {string} displayName
 * @property {string} levelLabel
 * @property {string} leadTitle
 * @property {string} statusLabel
 * @property {string} velocityScore
 * @property {string} velocityDelta
 * @property {number} velocityBarPct
 * @property {string} taskCompletion
 * @property {number} taskBarsFilled
 * @property {string} technicalIndex
 * @property {string} technicalSubtitle
 * @property {TeamAssignment[]} assignments
 * @property {number} assignmentsActiveCount
 * @property {TeamRbacRow[]} rbac
 * @property {string[]} skills
 * @property {string} auditLabel
 * @property {number[]} heatmap
 */

/** 7 rows × 26 columns, column-major (grid-flow-column + grid-template-rows: repeat(7,...)) */
function makeHeatmap(seed) {
  const cols = 26;
  const rows = 7;
  /** @type {number[]} */
  const out = [];
  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      out.push(((seed + r * 2 + c * 3) % 5) );
    }
  }
  return out;
}

/** @type {TeamMemberProfile[]} */
export const TEAM_MEMBERS = [
  {
    slug: "elara-vance",
    codename: "ELARA_VANCE",
    role: "Lead Architecture Specialist",
    tags: ["ADMIN", "SECURITY_CLEARANCE_01"],
    tone: "secondary",
    displayName: "Elara Vance",
    levelLabel: "Level 09 Authority",
    leadTitle: "Lead Architecture Specialist",
    statusLabel: "Active",
    velocityScore: "94.2",
    velocityDelta: "+2.4%",
    velocityBarPct: 94.2,
    taskCompletion: "98%",
    taskBarsFilled: 4,
    technicalIndex: "A+",
    technicalSubtitle: "Ranked in top 1% of Squad Alpha",
    assignmentsActiveCount: 4,
    assignments: [
      {
        id: "NX-4092",
        priorityLabel: "High Priority",
        priorityTone: "secondary",
        title: "Neural Link Optimization Protocol",
        description:
          "Refining latency issues in the core architect link for sub-second synchronization across all squads.",
        progressPct: 75,
        collaboratorCount: 2,
      },
      {
        id: "NX-5122",
        priorityLabel: "Ongoing",
        priorityTone: "primary",
        title: "Omni-Vault Security Audit",
        description:
          "Periodic technical validation of the primary data storage nodes and encryption handshakes.",
        progressPct: 22,
        collaboratorCount: 1,
      },
    ],
    rbac: [
      {
        title: "System Architect Access",
        description: "Full read/write capability on core architecture nodes and logic maps.",
      },
      {
        title: "Squad Management",
        description: "Authority to reassign technical tasks within the 'Alpha' and 'Gamma' squads.",
      },
      {
        title: "Encryption Override",
        description: "Level 4 bypass rights for emergency architectural maintenance.",
      },
      {
        title: "Global System Root",
        description: "Requires Level 10 Council clearance. Access currently restricted.",
        locked: true,
      },
    ],
    skills: ["React/TS Architect", "Cloud Infrastructure", "Cyber Security", "AI Orchestration", "GraphQL"],
    auditLabel: "Last Audit: 12h ago",
    heatmap: makeHeatmap(2),
  },
  {
    slug: "kai-shelby",
    codename: "KAI_SHELBY",
    role: "Logic Operations Manager",
    tags: ["MANAGER", "CORE_ENGINE"],
    tone: "primary",
    displayName: "Kai Shelby",
    levelLabel: "Level 07 Authority",
    leadTitle: "Logic Operations Manager",
    statusLabel: "Active",
    velocityScore: "88.1",
    velocityDelta: "+0.8%",
    velocityBarPct: 88,
    taskCompletion: "92%",
    taskBarsFilled: 3,
    technicalIndex: "A",
    technicalSubtitle: "Core engine throughput above squad median",
    assignmentsActiveCount: 3,
    assignments: [
      {
        id: "NX-3301",
        priorityLabel: "High Priority",
        priorityTone: "secondary",
        title: "Event Bus Hardening",
        description: "Strengthening deduplication and replay semantics for cross-service emits.",
        progressPct: 60,
        collaboratorCount: 3,
      },
      {
        id: "NX-4010",
        priorityLabel: "Ongoing",
        priorityTone: "primary",
        title: "Runbook Automation v3",
        description: "Codifying failover paths for regional logic clusters.",
        progressPct: 40,
        collaboratorCount: 1,
      },
    ],
    rbac: [
      {
        title: "Operations Control",
        description: "Schedule and approve maintenance windows on logic plane nodes.",
      },
      {
        title: "Read-Only Audit",
        description: "View historical traces across managed squads.",
      },
      {
        title: "Emergency Page",
        description: "Trigger controlled paging for critical incidents.",
        locked: true,
      },
    ],
    skills: ["Distributed Systems", "Kafka", "SRE Practices", "Python"],
    auditLabel: "Last Audit: 1d ago",
    heatmap: makeHeatmap(5),
  },
  {
    slug: "lyra-khan",
    codename: "LYRA_KHAN",
    role: "Interface Logistics",
    tags: ["MEMBER", "VISUAL_SYS"],
    tone: "muted",
    displayName: "Lyra Khan",
    levelLabel: "Level 05 Authority",
    leadTitle: "Interface Logistics",
    statusLabel: "Active",
    velocityScore: "81.4",
    velocityDelta: "+1.1%",
    velocityBarPct: 81,
    taskCompletion: "89%",
    taskBarsFilled: 3,
    technicalIndex: "B+",
    technicalSubtitle: "Design-system contribution streak: 6 weeks",
    assignmentsActiveCount: 2,
    assignments: [
      {
        id: "NX-2204",
        priorityLabel: "Normal",
        priorityTone: "muted",
        title: "Design Token Migration",
        description: "Aligning kinetic UI tokens with the shared variable pipeline.",
        progressPct: 55,
        collaboratorCount: 2,
      },
    ],
    rbac: [
      {
        title: "Component Library",
        description: "Publish updates to the shared interface kit within scope.",
      },
      {
        title: "Preview Deploys",
        description: "Spin up ephemeral previews for review threads.",
      },
    ],
    skills: ["Design Systems", "Figma", "Accessibility", "CSS Architecture"],
    auditLabel: "Last Audit: 3d ago",
    heatmap: makeHeatmap(11),
  },
  {
    slug: "jax-thorne",
    codename: "JAX_THORNE",
    role: "Infrastructure Stability",
    tags: ["MEMBER", "RESTRICTED_ACCESS"],
    tone: "error",
    displayName: "Jax Thorne",
    levelLabel: "Level 04 Authority",
    leadTitle: "Infrastructure Stability",
    statusLabel: "Limited",
    velocityScore: "76.0",
    velocityDelta: "—",
    velocityBarPct: 76,
    taskCompletion: "85%",
    taskBarsFilled: 2,
    technicalIndex: "B",
    technicalSubtitle: "Escalation required for production-adjacent changes",
    assignmentsActiveCount: 2,
    assignments: [
      {
        id: "NX-1188",
        priorityLabel: "Restricted",
        priorityTone: "muted",
        title: "Certificate Rotation Sweep",
        description: "Coordinated rotation across edge nodes with compliance logging.",
        progressPct: 33,
        collaboratorCount: 1,
      },
    ],
    rbac: [
      {
        title: "Staging Access",
        description: "Deploy and verify changes in non-production tiers only.",
      },
      {
        title: "Observability Views",
        description: "Read metrics and logs for assigned services.",
      },
      {
        title: "Production Change",
        description: "Requires secondary approver for any prod mutation.",
        locked: true,
      },
    ],
    skills: ["Kubernetes", "Terraform", "Networking", "Incident Response"],
    auditLabel: "Last Audit: 6h ago",
    heatmap: makeHeatmap(17),
  },
];

/**
 * @param {string} slug
 * @returns {TeamMemberProfile | undefined}
 */
export function getTeamMemberBySlug(slug) {
  return TEAM_MEMBERS.find((m) => m.slug === slug);
}
