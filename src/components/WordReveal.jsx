import { Fragment } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const WORD_STAGGER = 0.02; // 20ms — within 15–25ms
const WORD_DURATION = 0.32;
const Y_OFFSET = 4;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: WORD_STAGGER,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0.15, y: Y_OFFSET },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: WORD_DURATION, ease: "easeOut" },
  },
};

function extractText(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node.props?.children != null) {
    return extractText(node.props.children);
  }
  return "";
}

/**
 * One-time scroll word-reveal for body paragraphs.
 * Reduced motion: full text immediately, no animation.
 */
export default function WordReveal({
  as = "p",
  children,
  className = "",
  ...props
}) {
  const reducedMotion = usePrefersReducedMotion();
  const text = extractText(children).replace(/\s+/g, " ").trim();
  const words = text.split(" ").filter(Boolean);
  const Tag = as;

  if (reducedMotion || words.length === 0) {
    return (
      <Tag className={className} {...props}>
        {text}
      </Tag>
    );
  }

  const MotionTag = motion[as] ?? motion.p;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -5% 0px" }}
      variants={containerVariants}
      {...props}
    >
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          <motion.span
            className="inline-block will-change-transform"
            variants={wordVariants}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
