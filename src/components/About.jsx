import Container from "./Container";
import { RevealSection } from "./Reveal";

export default function About() {
  return (
    <RevealSection
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-12 border-b border-border"
    >
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2
              id="about-heading"
              className="text-2xl font-medium tracking-tight text-foreground md:text-3xl"
            >
              About
            </h2>
          </div>

          <div className="max-w-2xl space-y-4 lg:col-span-8">
            <p className="text-base leading-relaxed text-muted">
              I&apos;m a Computer Science student at JSS Academy of Technical
              Education, Noida (2025–2029), learning by building real web
              applications end to end.
            </p>
            <p className="text-base leading-relaxed text-muted">
              I started with frontend fundamentals—HTML, CSS, and
              JavaScript—then moved into React for structured UI work. From
              there I expanded into full-stack development with Node.js and
              Express, connecting clients to APIs and databases.
            </p>
            <p className="text-base leading-relaxed text-muted">
              Right now I&apos;m focused on databases, backend patterns, and
              system design fundamentals so I can design clearer data models and
              more reliable server-side systems.
            </p>
          </div>
        </div>
      </Container>
    </RevealSection>
  );
}
