import { useEffect, useState } from "react";

/**
 * Tracks which section id is in view for nav active state.
 * Uses a narrow viewport band so one section is active at a time.
 */
export function useActiveSection(sectionIds, { enabled = true } = {}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return undefined;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        // Activate when a section crosses the middle band of the viewport
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled, sectionIds]);

  return activeId;
}
