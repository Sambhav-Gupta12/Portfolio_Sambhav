import Container from "./Container";
import SocialLink from "./SocialLink";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="scroll-mt-12 border-b border-border"
    >
      <Container className="flex min-h-[calc(100svh-3rem)] flex-col justify-center py-12 md:py-16 lg:py-20">
        <div className="hero-enter max-w-2xl">
          <h1
            id="hero-name"
            className="hero-enter-item text-3xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            SAMBHAV GUPTA
          </h1>

          <p className="hero-enter-item mt-3 text-lg text-muted md:mt-4 md:text-xl">
            Full-Stack Web Developer
          </p>

          <p className="hero-enter-item mt-5 max-w-xl text-base leading-relaxed text-muted md:mt-6">
            Building responsive, user-focused web applications with React,
            Node.js and modern backend technologies — currently deepening my
            backend and system design skills.
          </p>

          <div className="hero-enter-item mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex min-h-11 items-center justify-center rounded bg-accent px-5 text-sm font-medium text-background hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View Work
            </a>
            <SocialLink
              id="github"
              href="https://github.com/Sambhav-Gupta12"
              label="GitHub"
              iconSize="md"
              className="min-h-11 justify-center rounded border border-border px-5 text-sm font-medium text-foreground hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
