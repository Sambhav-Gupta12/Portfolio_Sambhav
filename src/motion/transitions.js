/**
 * Shared hover / press motion timings — one system site-wide.
 * Duration range: 150–250ms (hover), slightly quicker for press.
 */
export const HOVER_DURATION = 0.2; // 200ms
export const PRESS_DURATION = 0.12; // 120ms
export const HOVER_EASE = "easeOut";

/** Default Motion transition for hover interactions */
export const hoverTransition = {
  duration: HOVER_DURATION,
  ease: HOVER_EASE,
};

/** Quicker press / tap feedback */
export const pressTransition = {
  duration: PRESS_DURATION,
  ease: HOVER_EASE,
};

/** CTA / button scale on hover + press */
export const buttonHover = { scale: 1.025 };
export const buttonTap = { scale: 0.98 };

/** Project visual / card image scale */
export const imageHoverScale = 1.02;

/** Stagger between tech chips on project-card hover */
export const chipHoverStagger = 0.05; // 50ms
