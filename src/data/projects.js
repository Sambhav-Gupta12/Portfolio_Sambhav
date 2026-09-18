import spendwiseImg from "../assets/projects/spendwise.png";
import todoImg from "../assets/projects/todo.png";
import spotifyImg from "../assets/projects/spotify-clone.jpg";

/** Hand-authored project entries — real Live Demo / GitHub URLs + screenshots. */
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
    imageSrc: spendwiseImg,
    imageAlt:
      "SpendWise dashboard showing total spent, remaining budget, spending by date bar chart, and category donut chart",
    liveUrl: "https://expense-tracker-fullstack-flame.vercel.app",
    githubUrl: "https://github.com/Sambhav-Gupta12/Expense-Tracker-Fullstack",
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
    imageSrc: todoImg,
    imageAlt:
      "Todo List app with task input, All Active Completed filters, and task cards with edit and delete actions",
    liveUrl: "https://to-do-list-react-weld-nine.vercel.app",
    githubUrl: "https://github.com/Sambhav-Gupta12/To_do_list_React",
  },
  {
    id: "spotify-clone",
    number: "03",
    title: "Spotify Clone UI",
    primary: false,
    valueProposition:
      "Recreate a music player layout with playlists, now-playing, and responsive navigation chrome.",
    tech: ["HTML", "CSS", "JavaScript"],
    description:
      "Structured a multi-panel layout (sidebar, main content, player bar) with reusable UI pieces. Focused on visual hierarchy and responsive stacking rather than streaming APIs.",
    imageSrc: spotifyImg,
    imageAlt:
      "Spotify Clone UI with library sidebar, trending songs grid, popular artists, and preview signup banner",
    liveUrl: "https://spotify-clone-tawny-phi.vercel.app",
    githubUrl: "https://github.com/Sambhav-Gupta12/Spotify-Clone",
  },
];
