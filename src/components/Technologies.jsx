import Container from "./Container";

const GROUPS = [
  {
    title: "Frontend",
    items: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "JWT"],
  },
  {
    title: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQL", "Prisma ORM"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "Vercel", "Cloudinary"],
  },
];

export default function Technologies() {
  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="scroll-mt-12 border-b border-border"
      data-reveal
    >
      <Container className="py-12 md:py-16 lg:py-20">
        <header className="max-w-xl">
          <h2
            id="technologies-heading"
            className="text-2xl font-medium tracking-tight text-foreground md:text-3xl"
          >
            Technologies
          </h2>
          <p className="mt-3 text-base text-muted">
            Tools and stacks I use across projects—not proficiency scores.
          </p>
        </header>

        {/* 360: 1 col · 768: 2 cols · 1024+: 4 cols */}
        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
          {GROUPS.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                {group.title}
              </h3>
              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label={group.title}
              >
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-border px-3 py-1.5 font-mono text-xs leading-snug text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
