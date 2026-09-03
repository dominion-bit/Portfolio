import Reveal from "./Reveal";
import GlowOrb from "./GlowOrb";
import SectionNumber from "./Sectionnumber";

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-grid relative overflow-hidden bg-[var(--bg-secondary)] px-4 py-24 md:px-8"
    >
      <SectionNumber value="03" className="right-6 top-6 md:right-10 md:top-10" />
      <GlowOrb color="var(--accent-glow)" className="-top-20 -left-20" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--text-secondary)]">
            I'm currently putting together real projects to show here.
            Check back soon, or see what I'm working on today over on
            GitHub.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--code-bg)] text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] bg-[var(--surface-card)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
              <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">
                projects.sh
              </span>
            </div>

            <pre className="p-5 font-mono text-sm leading-relaxed text-[var(--text-secondary)]">
              <code>
                <span className="text-[var(--accent-primary)]">$</span> ./build_projects.sh
                {"\n"}
                {"> "}Packaging first projects
                {"\n"}
                {"> "}Uploading soon
                <span
                  className="blink-cursor ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-[var(--accent-primary)]"
                  aria-hidden="true"
                />
              </code>
            </pre>
          </div>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-lg border border-[var(--border-color)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-[1.03] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            View my GitHub
          </a>
        </Reveal>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        .blink-cursor { animation: cursor-blink 1.1s steps(1) infinite; }
      `}</style>
    </section>
  );
}