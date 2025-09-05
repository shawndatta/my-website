import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Hero from "@/components/Hero"; // client component for the animated hero
import BackgroundGradient from "@/components/BackgroundGradient";
import GridBackground from "@/components/GridBackground";
import NumbersOverlay from "@/components/NumbersOverlay";

export default function Home() {
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
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              className="rounded-lg border border-white/10 p-4 hover:bg-white/5"
              href="#"
              target="_blank"
            >
              <h4 className="font-medium text-white">Eye Gaze Tracking</h4>
              <p className="text-sm text-zinc-400">
                OpenCV-based prototype; tracks eye movement and logs drift.
              </p>
            </a>
            <a
              className="rounded-lg border border-white/10 p-4 hover:bg-white/5"
              href="#"
              target="_blank"
            >
              <h4 className="font-medium text-white">Outlier Nutrition App</h4>
              <p className="text-sm text-zinc-400">
                Search foods, plot nutrients, and suggest alternatives.
              </p>
            </a>
          </div>
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
