import { motion } from "motion/react";
import Container from "./Container";
import { Github } from "./icons";
import HeroTypewriter from "./HeroTypewriter";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  buttonHover,
  buttonTap,
  hoverTransition,
  pressTransition,
} from "../motion/transitions";

function CtaLink({ href, children, variant = "primary", className = "", ...props }) {
  const reducedMotion = usePrefersReducedMotion();

  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const styles =
    variant === "primary"
      ? "bg-accent text-background"
      : "border border-border text-foreground";

  if (reducedMotion) {
    return (
      <a
        href={href}
        className={`transition-hover ${base} ${styles} ${variant === "primary" ? "hover:brightness-110" : "hover:border-accent hover:text-accent"} ${className}`.trim()}
        data-cursor="hover"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      className={`${base} ${styles} ${className}`.trim()}
      data-cursor="hover"
      whileHover={{
        ...buttonHover,
        ...(variant === "primary"
          ? { filter: "brightness(1.08)" }
          : {
              borderColor: "var(--color-accent)",
              color: "var(--color-accent)",
            }),
      }}
      whileTap={{ ...buttonTap, transition: pressTransition }}
      transition={hoverTransition}
      {...props}
    >
      {children}
    </motion.a>
  );
}

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

          <HeroTypewriter className="hero-enter-item mt-3 text-lg text-muted md:mt-4 md:text-xl" />

          <p className="hero-enter-item mt-5 max-w-xl text-base leading-relaxed text-muted md:mt-6">
            Building responsive, user-focused web applications with React,
            Node.js and modern backend technologies — currently deepening my
            backend and system design skills.
          </p>

          <div className="hero-enter-item mt-8 flex flex-wrap items-center gap-3">
            <CtaLink href="#work" variant="primary">
              View Work
            </CtaLink>
            <CtaLink
              href="https://github.com/Sambhav-Gupta12"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} aria-hidden="true" className="shrink-0" />
              GitHub
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
