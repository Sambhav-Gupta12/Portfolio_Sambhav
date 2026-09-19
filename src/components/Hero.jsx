import { motion } from "motion/react";
import Container from "./Container";
import { Github } from "./icons";
import HeroTypewriter from "./HeroTypewriter";
import WordReveal from "./WordReveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import headshot from "../assets/sambhav-headshot.jpg";
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
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Photo — above text on mobile; ~33% width on desktop */}
          <div className="hero-enter-item order-1 flex justify-center lg:order-2 lg:col-span-4 lg:justify-end">
            <img
              src={headshot}
              alt="Sambhav Gupta"
              width={640}
              height={640}
              decoding="async"
              className="aspect-square w-36 rounded border border-[rgba(232,168,85,0.35)] object-cover shadow-[0_6px_20px_rgba(0,0,0,0.28)] saturate-[0.7] sm:w-44 lg:w-full lg:max-w-[17.5rem]"
            />
          </div>

          {/* Text — primary column */}
          <div className="hero-enter order-2 max-w-2xl lg:order-1 lg:col-span-8">
            <h1
              id="hero-name"
              className="hero-enter-item text-3xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              SAMBHAV GUPTA
            </h1>

            <HeroTypewriter className="hero-enter-item mt-3 text-lg text-muted md:mt-4 md:text-xl" />

            <WordReveal className="hero-enter-item mt-5 max-w-xl text-base leading-relaxed text-muted md:mt-6">
              Building responsive, user-focused web applications with React,
              Node.js and modern backend technologies — currently deepening my
              backend and system design skills.
            </WordReveal>

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
        </div>
      </Container>
    </section>
  );
}
