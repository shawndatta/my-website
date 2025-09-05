// Template for sections
'use client';

import { motion, useReducedMotion } from "framer-motion";
import { fadeRise } from "./motionPresets";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
 const prefersReduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      data-section // <-- used by the active-link hook
      className="mx-auto max-w-5xl px-4 py-28 scroll-mt-20"
      variants={fadeRise}
      initial={prefersReduced ? false : "hidden"}
      whileInView={prefersReduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <h2 className="text-xl font-semibold text-white/90 mb-6">{title}</h2>
      {children}
    </motion.section>
  );
}

