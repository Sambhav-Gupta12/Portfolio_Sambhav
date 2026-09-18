import Container from "./Container";

function ProjectVisual({ title }) {
  return (
    <div className="group overflow-hidden rounded border border-border transition-[border-color] duration-200 hover:border-muted">
      <div
        className="flex aspect-[16/10] w-full items-center justify-center bg-[#141414] px-3 transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transform-none"
        role="img"
        aria-label={`${title} screenshot placeholder`}
      >
        <span className="text-center font-mono text-[0.65rem] uppercase tracking-wider text-muted sm:text-xs sm:tracking-widest">
          Screenshot placeholder
        </span>
      </div>
    </div>
  );
}

function ProjectEntry({ project }) {
  const {
    number,
    title,
    primary,
    valueProposition,
    tech,
    description,
    liveUrl,
    githubUrl,
  } = project;

  return (
    <article className="border-t border-border py-10 md:py-12 lg:py-14">
      {/* Stacked until lg (1024px); editorial side-by-side from 1024 up */}
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-sm text-muted">{number}</span>
            {primary && (
              <span className="text-xs font-medium uppercase tracking-wide text-accent">
                Primary
              </span>
            )}
          </div>

          <h3 className="mt-3 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {title}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-muted">
            {valueProposition}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {tech.map((label) => (
              <li
                key={label}
                className="rounded border border-border px-3 py-1.5 font-mono text-xs text-muted"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <ProjectVisual title={title} />

          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
            <a
              href={liveUrl}
              className="inline-flex min-h-11 items-center px-1 text-sm font-medium text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Live Demo
            </a>
            <a
              href={githubUrl}
              className="inline-flex min-h-11 items-center px-1 text-sm font-medium text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SelectedWork({ projects }) {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-12 border-b border-border"
    >
      <Container className="py-12 md:py-16 lg:py-20">
        <header className="max-w-xl">
          <h2
            id="work-heading"
            className="text-2xl font-medium tracking-tight text-foreground md:text-3xl"
          >
            Selected Work
          </h2>
          <p className="mt-3 text-base text-muted">
            Projects that show how I build and ship real applications.
          </p>
        </header>

        <div className="mt-4 md:mt-6">
          {projects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
