// components/motionPresets.ts
import { Variants } from "framer-motion";

/** Subtle fade + rise used everywhere */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.24, ease: "easeOut" } },
};

/** Stagger children entrance (hero) */
export const staggerUp: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};
