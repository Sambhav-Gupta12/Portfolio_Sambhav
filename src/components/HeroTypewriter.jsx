import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const PHRASES = [
  "Full-Stack Web Developer",
  "React & Node.js",
  "Learning Backend & System Design",
  "Building Real Applications",
];

const MS_PER_CHAR = 50; // 40–60ms range
const HOLD_MS = 1800;
const DELETE_MS_PER_CHAR = 32;
const PAUSE_BETWEEN_MS = 400;

/**
 * Hero-only typewriter rotation driven by Motion's `animate`.
 * Reduced motion: first phrase only, no typing.
 */
export default function HeroTypewriter({ className = "" }) {
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(PHRASES[0]);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(PHRASES[0]);
      return undefined;
    }

    let cancelled = false;
    let controls = null;
    let timeoutId = null;

    const wait = (ms) =>
      new Promise((resolve) => {
        timeoutId = window.setTimeout(resolve, ms);
      });

    async function typePhrase(phrase) {
      controls = animate(0, phrase.length, {
        duration: (phrase.length * MS_PER_CHAR) / 1000,
        ease: "linear",
        onUpdate: (latest) => {
          if (!cancelled) {
            setDisplay(phrase.slice(0, Math.floor(latest)));
          }
        },
      });
      await controls;
    }

    async function deletePhrase(phrase) {
      controls = animate(phrase.length, 0, {
        duration: (phrase.length * DELETE_MS_PER_CHAR) / 1000,
        ease: "linear",
        onUpdate: (latest) => {
          if (!cancelled) {
            setDisplay(phrase.slice(0, Math.max(0, Math.ceil(latest))));
          }
        },
      });
      await controls;
    }

    async function loop() {
      let index = 0;
      while (!cancelled) {
        const phrase = PHRASES[index];
        await typePhrase(phrase);
        if (cancelled) break;
        await wait(HOLD_MS);
        if (cancelled) break;
        await deletePhrase(phrase);
        if (cancelled) break;
        await wait(PAUSE_BETWEEN_MS);
        index = (index + 1) % PHRASES.length;
      }
    }

    loop();

    return () => {
      cancelled = true;
      controls?.stop();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <p className={className}>
        <span>{PHRASES[0]}</span>
      </p>
    );
  }

  return (
    <p className={className} aria-live="polite" aria-atomic="true">
      <span>{display}</span>
      <motion.span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.1em] bg-accent align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
    </p>
  );
}
