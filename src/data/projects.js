/** Static placeholder project data — replace links/screenshots with real assets later. */
export const projects = [
  {
    id: "spendwise",
    number: "01",
    title: "SpendWise",
    primary: true,
    valueProposition:
      "Track spending across categories with a full-stack expense workflow from entry to overview.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Prisma"],
    description:
      "Built authenticated expense CRUD with category grouping and summary views. API and database layer handle persistence; the React client focuses on clear forms and readable totals.",
    imageSrc: null,
    imageAlt:
      "SpendWise expense management app interface showing categorized spending and overview totals",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "todo",
    number: "02",
    title: "Interactive To-Do List",
    primary: false,
    valueProposition:
      "Manage daily tasks with create, complete, and filter flows in a focused single-page UI.",
    tech: ["React", "JavaScript", "CSS"],
    description:
      "Implemented local state for task lifecycle (add, toggle, filter) with a compact interface. Emphasis on predictable interactions and clear completed vs active states.",
    imageSrc: null,
    imageAlt:
      "Interactive to-do list interface with task items, completion states, and filters",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "spotify-clone",
    number: "03",
    title: "Spotify Clone UI",
    primary: false,
    valueProposition:
      "Recreate a music player layout with playlists, now-playing, and responsive navigation chrome.",
    tech: ["React", "HTML", "CSS", "JavaScript"],
    description:
      "Structured a multi-panel layout (sidebar, main content, player bar) with reusable UI pieces. Focused on visual hierarchy and responsive stacking rather than streaming APIs.",
    imageSrc: null,
    imageAlt:
      "Spotify-style music player UI with sidebar playlists, main content area, and player bar",
    liveUrl: "#",
    githubUrl: "#",
  },
];
