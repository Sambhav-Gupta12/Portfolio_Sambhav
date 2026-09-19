import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Container from "./Container";
import { RevealSection } from "./Reveal";
import WordReveal from "./WordReveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const STEPS = [
  {
    title: "Frontend fundamentals",
    detail:
      "HTML, CSS, and JavaScript—building pages and learning the basics of the web.",
  },
  {
    title: "React",
    detail:
      "Component-driven UIs, state, and structuring interactive client applications.",
  },
  {
    title: "Full-stack",
    detail:
      "Node.js, Express, and MongoDB—APIs, persistence, and connecting frontend to backend.",
  },
  {
    title: "Databases & system design",
    detail:
      "Current focus—deeper database work, backend patterns, and system design fundamentals.",
    current: true,
  },
];

const ENTRY_STAGGER = 0.12; // 120ms — within 100–150ms
const ENTRY_DURATION = 0.4;
const LINE_DURATION =
  (STEPS.length - 1) * ENTRY_STAGGER + ENTRY_DURATION; // grows with entries

export default function Journey() {
  const listRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInView(listRef, { once: true, amount: 0.2 });
  const reveal = reducedMotion || inView;

  return (
    <RevealSection
      id="journey"
      aria-labelledby="journey-heading"
      className="scroll-mt-12 border-b border-border"
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

        <ol
          ref={listRef}
          className="relative mt-10 max-w-2xl pl-6 md:pl-8"
        >
          {/* Progressive timeline line */}
          {reducedMotion ? (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px bg-border"
            />
          ) : (
            <motion.span
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-border"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: reveal ? 1 : 0 }}
              transition={{
                duration: LINE_DURATION,
                ease: "easeOut",
              }}
            />
          )}

          {STEPS.map((step, index) => (
            <li key={step.title} className="relative pb-10 last:pb-0">
              {reducedMotion ? (
                <span
                  className={`absolute -left-[1.625rem] top-1.5 h-2.5 w-2.5 rounded-full border md:-left-[2.125rem] ${
                    step.current
                      ? "border-accent bg-accent"
                      : "border-border bg-background"
                  }`}
                  aria-hidden="true"
                />
              ) : (
                <motion.span
                  className={`absolute -left-[1.625rem] top-1.5 h-2.5 w-2.5 rounded-full border md:-left-[2.125rem] ${
                    step.current
                      ? "border-accent bg-accent"
                      : "border-border bg-background"
                  }`}
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    reveal
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.6 }
                  }
                  transition={{
                    duration: ENTRY_DURATION,
                    ease: "easeOut",
                    delay: index * ENTRY_STAGGER,
                  }}
                />
              )}

              <motion.div
                initial={
                  reducedMotion ? false : { opacity: 0, y: 12 }
                }
                animate={
                  reducedMotion || reveal
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        duration: ENTRY_DURATION,
                        ease: "easeOut",
                        delay: index * ENTRY_STAGGER,
                      }
                }
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-medium text-foreground">
                    {step.title}
                  </h3>
                  {step.current &&
                    (reducedMotion ? (
                      <span className="text-xs font-medium uppercase tracking-wide text-accent">
                        Current
                      </span>
                    ) : (
                      <motion.span
                        className="text-xs font-medium uppercase tracking-wide text-accent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: reveal ? 1 : 0 }}
                        transition={{
                          duration: ENTRY_DURATION,
                          ease: "easeOut",
                          delay: index * ENTRY_STAGGER,
                        }}
                      >
                        <motion.span
                          className="inline-block"
                          animate={
                            reveal
                              ? { opacity: [0.5, 1, 0.5] }
                              : { opacity: 1 }
                          }
                          transition={{
                            duration: 3.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay:
                              index * ENTRY_STAGGER + ENTRY_DURATION + 0.15,
                          }}
                        >
                          Current
                        </motion.span>
                      </motion.span>
                    ))}
                </div>
                <WordReveal className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                  {step.detail}
                </WordReveal>
              </motion.div>
            </li>
          ))}
        </ol>
      </Container>
    </RevealSection>
  );
}
