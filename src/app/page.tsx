import Nav from "@/Components/Nav";
import Section from "@/Components/Section";
import Hero from "@/Components/Hero"; // client component for the animated hero
import BackgroundGradient from "@/Components/BackgroundGradient";
import GridBackground from "@/Components/GridBackground";
import NumbersOverlay from "@/Components/NumbersOverlay";
import ProjectHoverGrid from "@/Components/ProjectHoverGrid";

import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types";


export default function Home() {
  const projects = projectsData as Project[];

  return (
    <>
      <Nav />
      <BackgroundGradient />   {/* dark multicolor glow base */}
      <GridBackground />
      <NumbersOverlay />
      <main className="pt-16">
        {/* HERO */}
        <Hero />

        {/* ABOUT */}
        <Section id="about" title="About">
          <p className="text-zinc-300">
            I’m Shawn, a CS undergrad majoring in AI &amp; Data Science. 
            I love
            turning complex ideas into clear, interactive experiences—on the web
            and in code.
          </p>
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education">
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li>
              Griffith University — B.CompSci (Advanced) — AI &amp; Data Science
              major
            </li>
            <li>
              Relevant coursework: Statistics, ML, Distributed Systems, ROS
            </li>
          </ul>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience">
          <div className="space-y-4 text-zinc-300">
            <div>
              <h3 className="font-medium text-white">ICT Peer Mentor</h3>
              <p className="text-sm text-zinc-400">
                Guided first-year students; ran workshops; built resources.
              </p>
            </div>
            {/* Add more roles here */}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <ProjectHoverGrid items={projects} />
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact">
          <p className="text-zinc-300">
            Email me at{" "}
            <a
              className="underline decoration-dotted hover:decoration-solid"
              href="mailto:shawndatta01@gmail.com"
            >
              shawndatta01@gmail.com
            </a>{" "}
            or find me on{" "}
            <a
              className="underline decoration-dotted hover:decoration-solid"
              href="#"
              target="_blank"
            >
              LinkedIn
            </a>
            .
          </p>
        </Section>
      </main>
    </>
  );
}
