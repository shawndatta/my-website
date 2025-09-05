'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fadeRise, staggerUp } from '@/Components/motionPresets';

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.section
      className="min-h-[80vh] grid place-items-center"
      variants={prefersReduced ? undefined : staggerUp}
      initial={prefersReduced ? undefined : 'hidden'}
      animate={prefersReduced ? undefined : 'visible'}
    >
      <div className="text-center max-w-2xl px-4">
        <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight" variants={fadeRise}>
          Building AI &amp; Data experiences
        </motion.h1>

        <motion.p className="mt-4 text-zinc-400" variants={fadeRise}>
          I design and build intelligent systems, visualize data, and care about clarity and performance.
        </motion.p>

        <motion.a
          href="#projects"
          className="inline-block mt-8 rounded-lg bg-white/10 px-5 py-2 text-white hover:bg-white/20"
          variants={fadeRise}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          See Projects
        </motion.a>
      </div>
    </motion.section>
  );
}
