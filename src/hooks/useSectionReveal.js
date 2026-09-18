import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Adds .is-revealed to [data-reveal] elements when they enter the viewport.
 * Skips animation when prefers-reduced-motion is set.
 * Only enables hidden-until-revealed styles after JS boots (html.reveal-js).
 */
export function useSectionReveal(selector = "[data-reveal]") {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (nodes.length === 0) return undefined;

    if (reducedMotion) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return undefined;
    }

    document.documentElement.classList.add("reveal-js");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-js");
    };
  }, [reducedMotion, selector]);
}
