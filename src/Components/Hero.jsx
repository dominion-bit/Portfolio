import { useState } from "react";
import Reveal from "./Reveal";
import SectionNumber from "./Sectionnumber";

const STACK = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Git",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-grid relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-primary)] px-4 pt-28 pb-20 md:px-8 md:pt-32"
    >
      <SectionNumber value="00" className="bottom-4 left-4 md:bottom-8 md:left-8" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        {/* Left: intro */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface-card)] px-4 py-1.5 text-sm text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-primary)]" />
            200-level student, building for the web
          </span>

          <h1 className="mt-6 font-['Space_Grotesk'] text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
            Hi, I'm Dominion.
            <br />
            I build things for the web.
          </h1>

          <p className="mt-5 max-w-md text-[var(--text-secondary)]">
            I'm studying at Elizade University and spending most of my time
            learning web development. Lately I've also been exploring video
            editing and content creation on the side.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#skills"
              className="rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-medium text-[var(--bg-primary)] transition-all duration-200 hover:scale-[1.03] hover:bg-[var(--accent-secondary)]"
            >
              View my skills
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-[var(--border-color)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-[1.03] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-10">
            <p className="text-sm text-[var(--text-muted)]">
              Technologies I work with
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[var(--border-color)] bg-[var(--surface-card)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right: photo + floating code card */}
        <Reveal delay={120}>
          <div className="relative mx-auto max-w-sm md:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-full blur-3xl"
              style={{ background: "var(--accent-glow)" }}
            />

            <PhotoFrame />

            {/* Floating code card: stacks below the photo on mobile,
                overlaps its corner on md+ screens. */}
            <div className="animate-float relative mt-6 w-full md:absolute md:-bottom-8 md:-right-8 md:mt-0 md:w-64">
              <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--code-bg)] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-1.5 border-b border-[var(--border-color)] bg-[var(--surface-card)] px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#f87171]" />
                  <span className="h-2 w-2 rounded-full bg-[#fbbf24]" />
                  <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
                  <span className="ml-1 font-mono text-[10px] text-[var(--text-muted)]">
                    dominion.js
                  </span>
                </div>

                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
                  <code>
                    <span className="text-[var(--accent-secondary)]">const</span>{" "}
                    <span className="text-[var(--text-primary)]">dominion</span>{" "}
                    <span className="text-[var(--text-secondary)]">=</span>{" "}
                    <span className="text-[var(--text-secondary)]">{"{"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-[var(--text-primary)]">role</span>
                    <span className="text-[var(--text-secondary)]">:</span>{" "}
                    <span className="text-[var(--accent-primary)]">
                      "Web Developer"
                    </span>
                    <span className="text-[var(--text-secondary)]">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-[var(--text-primary)]">status</span>
                    <span className="text-[var(--text-secondary)]">:</span>{" "}
                    <span className="text-[var(--accent-primary)]">
                      "200L @ Elizade Uni"
                    </span>
                    <span className="text-[var(--text-secondary)]">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-[var(--text-primary)]">
                      currentlyLearning
                    </span>
                    <span className="text-[var(--text-secondary)]">:</span>{" "}
                    <span className="text-[var(--accent-primary)]">
                      "video editing"
                    </span>
                    <span className="text-[var(--text-secondary)]">,</span>
                    {"\n"}
                    <span className="text-[var(--text-secondary)]">{"};"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

/**
 * Shows /profile.jpg from the public folder. Falls back to a set of
 * initials on a gradient background if the file isn't there yet — so
 * the page still looks intentional before you've added a real photo.
 */
function PhotoFrame() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--surface-card)]">
      {!imgFailed ? (
        <img
          src="/profile.jpg"
          alt="Dominion Amachree"
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, var(--surface-card), var(--bg-secondary))",
          }}
        >
          <span className="font-['Space_Grotesk'] text-6xl font-semibold text-[var(--text-muted)]">
            DA
          </span>
        </div>
      )}
    </div>
  );
}