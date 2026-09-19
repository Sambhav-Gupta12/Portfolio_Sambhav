import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Container from "./Container";
import { RevealSection } from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

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

const CHIP_STAGGER = 0.025; // 25ms — within 20–30ms
const CHIP_DURATION = 0.28;

export default function Technologies() {
  const gridRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInView(gridRef, { once: true, amount: 0.2 });
  const reveal = reducedMotion || inView;

  let chipIndex = 0;

  return (
    <RevealSection
      id="technologies"
      aria-labelledby="technologies-heading"
      className="scroll-mt-12 border-b border-border"
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

        <div
          ref={gridRef}
          className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4"
        >
          {GROUPS.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                {group.title}
              </h3>
              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label={group.title}
              >
                {group.items.map((item) => {
                  const index = chipIndex;
                  chipIndex += 1;

                  if (reducedMotion) {
                    return (
                      <li key={item} className="tech-chip cursor-default">
                        {item}
                      </li>
                    );
                  }

                  return (
                    <motion.li
                      key={item}
                      className="tech-chip cursor-default"
                      initial={{ opacity: 0, scale: 0.95, y: 6 }}
                      animate={
                        reveal
                          ? { opacity: 1, scale: 1, y: 0 }
                          : { opacity: 0, scale: 0.95, y: 6 }
                      }
                      transition={{
                        duration: CHIP_DURATION,
                        ease: "easeOut",
                        delay: reveal ? index * CHIP_STAGGER : 0,
                      }}
                    >
                      {item}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
}
