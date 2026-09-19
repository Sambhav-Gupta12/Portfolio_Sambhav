import { motion } from "motion/react";
import { Github } from "./icons";
import Container from "./Container";
import { RevealItem, RevealSection, RevealStagger } from "./Reveal";
import WordReveal from "./WordReveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  chipHoverStagger,
  hoverTransition,
} from "../motion/transitions";

/** Parent hover state — staggers tech chips (see chipItem). */
const projectHover = {
  rest: {},
  hover: {
    transition: { staggerChildren: chipHoverStagger },
  },
};

/** Slight lift on card hover only — chips stay fully visible at rest. */
const chipItem = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: hoverTransition,
  },
};

function ProjectVisual({ title, imageSrc, imageAlt }) {
  const alt = imageAlt || `${title} project screenshot`;

  return (
    <figure className="relative m-0 overflow-hidden rounded border border-border bg-[#141414] transition-hover group-hover/project:border-accent">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0.5 origin-top scale-y-0 bg-accent transition-hover group-hover/project:scale-y-100"
      />
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition-hover motion-safe:group-hover/project:scale-[1.02] motion-reduce:transform-none"
        />
      ) : (
        <div
          className="flex min-h-[12rem] w-full items-center justify-center px-3"
          role="img"
          aria-label={`${alt} (placeholder — screenshot pending)`}
        >
          <span className="text-center font-mono text-[0.65rem] uppercase tracking-wider text-muted sm:text-xs sm:tracking-widest">
            Screenshot placeholder
          </span>
        </div>
      )}
    </figure>
  );
}

function TechChips({ tech, animated }) {
  if (!animated) {
    return (
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
        {tech.map((label) => (
          <li key={label} className="tech-chip">
            {label}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
      {tech.map((label) => (
        <motion.li key={label} className="tech-chip" variants={chipItem}>
          {label}
        </motion.li>
      ))}
    </ul>
  );
}

function ProjectEntry({ project }) {
  const reducedMotion = usePrefersReducedMotion();
  const {
    number,
    title,
    primary,
    valueProposition,
    tech,
    description,
    imageSrc,
    imageAlt,
    liveUrl,
    githubUrl,
  } = project;

  const body = (
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

        <WordReveal className="mt-3 text-base leading-relaxed text-muted">
          {valueProposition}
        </WordReveal>

        <TechChips tech={tech} animated={!reducedMotion} />
      </div>

      <div className="lg:col-span-7">
        <ProjectVisual
          title={title}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
        />

        <WordReveal className="mt-5 text-sm leading-relaxed text-muted md:text-base">
          {description}
        </WordReveal>

        <div className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-hover inline-flex min-h-11 items-center px-1 text-sm font-medium text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            data-cursor="hover"
          >
            Live Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-hover inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            data-cursor="hover"
          >
            <Github
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="shrink-0"
            />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <RevealItem
      as="article"
      className="border-t border-border py-10 md:py-12 lg:py-14"
    >
      {reducedMotion ? (
        <div className="group/project" data-cursor="hover">
          {body}
        </div>
      ) : (
        <motion.div
          className="group/project"
          data-cursor="hover"
          variants={projectHover}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {body}
        </motion.div>
      )}
    </RevealItem>
  );
}

export default function SelectedWork({ projects }) {
  return (
    <RevealSection
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

        <RevealStagger className="mt-4 md:mt-6" stagger={0.08}>
          {projects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </RevealStagger>
      </Container>
    </RevealSection>
  );
}
