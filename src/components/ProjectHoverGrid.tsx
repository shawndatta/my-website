'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export default function ProjectHoverGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, idx) => (
        <motion.div
          key={p.title + idx}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Card project={p} />
        </motion.div>
      ))}
    </div>
  );
}

function Card({ project }: { project: Project }) {
  const { title, blurb, href, tags, image } = project;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ y: -1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="relative"
    >
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
          style={{
            background:
              'radial-gradient(600px 200px at 50% 0%, rgba(99,102,241,0.18), transparent 60%)',
          }}
        />

        {/* Image (optional) */}
        {image ? (
          <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-lg border border-white/10">
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rotate-45 bg-gradient-to-br from-fuchsia-500/20 via-sky-400/20 to-pink-500/20 blur-xl"
              aria-hidden
            />
          </div>
        ) : null}

        {/* Title + blurb */}
        <div className="relative">
          <h4 className="text-white font-medium">{title}</h4>
          <p className="mt-1 text-sm text-zinc-400 line-clamp-3">{blurb}</p>
        </div>

        {/* Footer: tags + arrow */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {(tags ?? []).map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
          <div
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02]
                       transition-all duration-300 group-hover:translate-x-1 group-hover:border-white/30 group-hover:bg-white/[0.06]"
            aria-hidden
          >
            <svg
              className="h-4 w-4 text-zinc-300 group-hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 12h12m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Shadow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}
