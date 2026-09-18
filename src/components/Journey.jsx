import Container from "./Container";

const STEPS = [
  {
    title: "Frontend fundamentals",
    detail: "HTML, CSS, and JavaScript—building pages and learning the basics of the web.",
  },
  {
    title: "React",
    detail: "Component-driven UIs, state, and structuring interactive client applications.",
  },
  {
    title: "Full-stack",
    detail: "Node.js, Express, and MongoDB—APIs, persistence, and connecting frontend to backend.",
  },
  {
    title: "Databases & system design",
    detail: "Current focus—deeper database work, backend patterns, and system design fundamentals.",
    current: true,
  },
];

export default function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="scroll-mt-12 border-b border-border"
      data-reveal
    >
      <Container className="py-14 md:py-20">
        <header className="max-w-xl">
          <h2
            id="journey-heading"
            className="text-2xl font-medium tracking-tight text-foreground md:text-3xl"
          >
            Journey
          </h2>
          <p className="mt-3 text-base text-muted">
            How my learning path has progressed—not a resume of job titles.
          </p>
        </header>

        <ol className="relative mt-10 max-w-2xl border-l border-border pl-6 md:pl-8">
          {STEPS.map((step) => (
            <li key={step.title} className="relative pb-10 last:pb-0">
              <span
                className={`absolute -left-[1.625rem] top-1.5 h-2.5 w-2.5 rounded-full border md:-left-[2.125rem] ${
                  step.current
                    ? "border-accent bg-accent"
                    : "border-border bg-background"
                }`}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-medium text-foreground">
                  {step.title}
                </h3>
                {step.current && (
                  <span className="text-xs font-medium uppercase tracking-wide text-accent">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
