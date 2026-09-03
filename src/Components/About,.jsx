import Reveal from "./Reveal";
import GlowOrb from "./Gloworb";
import SectionNumber from "./Sectionnumber";

const SKILL_GROUPS = [
  {
    label: "Web development",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "Git",
    ],
  },
  {
    label: "Everyday tools",
    tags: ["Excel", "PowerPoint"],
  },
  {
    label: "Currently exploring",
    tags: ["Video editing", "DaVinci Resolve"],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-grid relative overflow-hidden bg-[var(--bg-secondary)] px-4 py-24 md:px-8"
    >
      <SectionNumber value="01" className="right-6 top-6 md:right-10 md:top-10" />
      <GlowOrb
        color="rgba(129, 140, 248, 0.15)"
        className="-bottom-24 -left-24"
      />

      <div className="relative mx-auto grid max-w-5xl gap-14 md:grid-cols-[1fr_0.85fr] md:gap-16">
        {/* Left: narrative */}
        <Reveal>
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
            A bit more about me
          </h2>

          <div className="mt-6 flex flex-col gap-4 text-[var(--text-secondary)]">
            <p>
              I'm a 200-level student at Elizade University, currently
              putting most of my focus into web development. I started with
              the basics — HTML, CSS, and JavaScript — and I've been building
              on that with TypeScript, Tailwind, and Node.js as I get more
              comfortable working across the stack. Git keeps everything I
              build tracked and versioned along the way.
            </p>
            <p>
              Alongsid the technical work, I'm also decent with everyday
              tools like Excel and PowerPoint, which come in handy more often
              than people expect.
            </p>
            <p>
              Outside of code, I've recently started exploring video editing
              and content creation, working mainly in DaVinci Resolve. It's
              still new territory for me, but it's become something I enjoy
              picking apart in my spare time — figuring out how a good edit
              comes together, the same way I like figuring out how a good
              interface comes together.
            </p>
          </div>
        </Reveal>

        {/* Right: skills, grouped */}
        <Reveal delay={120}>
          <div className="flex flex-col gap-8">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-sm text-[var(--text-muted)]">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[var(--border-color)] bg-[var(--surface-card)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}