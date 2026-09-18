import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SIZE = 8; // px at rest
const HOVER_SCALE = 2.25; // ~2–2.5x

/** Light spring — laggy, not floaty */
const SPRING = { stiffness: 380, damping: 30, mass: 0.4 };

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return fineHover && !reduced;
}

/**
 * Shared custom cursor. Interactive targets opt in with data-cursor="hover".
 * Disabled on touch / coarse pointers and when prefers-reduced-motion is set.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    const sync = () => setEnabled(canUseCustomCursor());
    sync();

    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    hoverMq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);
    return () => {
      hoverMq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("cursor-custom");
      return undefined;
    }

    document.body.classList.add("cursor-custom");

    function onPointerMove(event) {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);
    }

    function onPointerOver(event) {
      const target = event.target;
      if (!(target instanceof Element)) {
        setHovering(false);
        return;
      }
      setHovering(Boolean(target.closest('[data-cursor="hover"]')));
    }

    function onPointerLeaveDocument() {
      setVisible(false);
      setHovering(false);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.documentElement.addEventListener(
      "mouseleave",
      onPointerLeaveDocument,
    );

    return () => {
      document.body.classList.remove("cursor-custom");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        onPointerLeaveDocument,
      );
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-accent"
      style={{
        x,
        y,
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
        opacity: visible ? 1 : 0,
      }}
      animate={{
        scale: hovering ? HOVER_SCALE : 1,
        backgroundColor: hovering
          ? "rgba(232, 168, 85, 0)"
          : "rgba(232, 168, 85, 0.35)",
        borderColor: "rgba(232, 168, 85, 0.9)",
      }}
      transition={{
        scale: { type: "spring", stiffness: 420, damping: 28, mass: 0.35 },
        backgroundColor: { duration: 0.2, ease: "easeOut" },
        borderColor: { duration: 0.2, ease: "easeOut" },
        opacity: { duration: 0.15 },
      }}
    />
  );
}
