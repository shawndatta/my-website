'use client';

import Link from "next/link";
import DigitalClock from "./DigitalClock";
import { useActiveSection } from "@/hooks/useActiveSection";

const items = [
  { href: "#about", id: "about", label: "About" },
  { href: "#education", id: "education", label: "Education" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Nav() {
  const active = useActiveSection("about", items.map((i) => i.id));

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10
                       backdrop-blur-md
                       bg-gradient-to-r from-fuchsia-500/10 via-sky-400/10 to-pink-500/10">
      <div className="mx-auto max-w-5xl h-14 px-4 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-6 w-6" />
          <span className="font-semibold">Shawn Datta</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {items.map((i) => {
            const isActive = active === i.id;
            return (
              <a
  key={i.href}
  href={i.href}
  className={[
    "relative inline-block px-1 text-sm text-zinc-300 hover:text-white transition-colors",
    // underline bar (hidden by default)
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-200",
    // interaction / active styles
    isActive ? "after:w-full text-white" : "hover:after:w-full",
  ].join(" ")}
>
                {i.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-4">
          <DigitalClock twelveHour={false} />
        </div>
      </div>
    </header>
  );
}
