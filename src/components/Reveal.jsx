import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const EASE_OUT = "easeOut";
const DURATION = 0.4; // 400ms — within 300–450ms
const Y_OFFSET = 12; // 12px — within 8–16px

const fadeUp = {
  hidden: { opacity: 0, y: Y_OFFSET },
  visible: { opacity: 1, y: 0 },
};

/**
 * Section-level fade + translate-up on first enter.
 * With reduced motion: renders a plain element, fully visible.
 */
export function RevealSection({
  as = "section",
  children,
  className = "",
  ...props
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Tag = as;

  if (reducedMotion) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] ?? motion.section;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -5% 0px" }}
      variants={fadeUp}
      transition={{ duration: DURATION, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent for staggered children (e.g. Selected Work list).
 * Uses whileInView once; children use RevealItem / fadeUpItem variants.
 */
export function RevealStagger({
  as = "div",
  children,
  className = "",
  stagger = 0.08,
  ...props
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Tag = as;

  if (reducedMotion) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -5% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Child of RevealStagger — fade + translate-up with inherited stagger delay */
export function RevealItem({
  as = "div",
  children,
  className = "",
  ...props
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Tag = as;

  if (reducedMotion) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: Y_OFFSET },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION, ease: EASE_OUT },
        },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
