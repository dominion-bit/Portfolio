import { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import SectionNumber from "./Sectionnumber";

// Drop your downloaded SVG files into your project's `public/icons/`
// folder using these exact filenames, and they'll show up automatically.
// If a file is missing, the badge falls back to the skill's initials
// instead of showing a broken image icon.
const SKILLS = [
  { name: "HTML", percent: 79, color: "#f97316", icon: "/icons/html5.svg" },
  { name: "CSS", percent: 75, color: "#38bdf8", icon: "/icons/css3.svg" },
  { name: "JavaScript", percent: 62, color: "#facc15", icon: "/icons/javascript.svg" },
  { name: "TypeScript", percent: 60, color: "#60a5fa", icon: "/icons/typescript.svg" },
  { name: "Tailwind CSS", percent: 70, color: "#2dd4bf", icon: "/icons/tailwind.svg" },
  { name: "Node.js", percent: 70, color: "#4ade80", icon: "/icons/nodejs.svg" },
  { name: "Git", percent: 70, color: "#fb7185", icon: "/icons/git.svg" },
  { name: "Excel", percent: 75, color: "#22c55e", icon: "/icons/excel.svg" },
  { name: "DaVinci Resolve", percent: 59, color: "#818cf8", icon: "/icons/davinci-resolve.svg" },
];

export default function Skills() {
  const [ref, visible] = useReveal(0.2);

  return (
    <section
      id="skills"
      className="bg-grid relative overflow-hidden bg-[var(--bg-primary)] px-4 py-24 md:px-8"
    >
      <SectionNumber value="02" className="left-6 top-6 md:left-10 md:top-10" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "var(--accent-glow)" }}
      />

      <div ref={ref} className="relative mx-auto max-w-5xl">
        <div
          className={`transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
            Skills
          </h2>
          <p className="mt-4 max-w-md text-[var(--text-secondary)]">
            Where I'm at with each of these right now — still climbing on
            all of them.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
        .bar-shimmer { animation: shimmer 2.4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

function SkillCard({ skill, index, visible }) {
  const delay = index * 80;
  const percent = useCountUp(skill.percent, visible, { delay: delay + 150 });

  return (
    <div
      className="group rounded-xl border border-[var(--border-color)] bg-[var(--surface-card)] p-5 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(16px) scale(0.96)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge skill={skill} />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {skill.name}
          </span>
        </div>
        <span className="font-mono text-sm text-[var(--text-muted)]">
          {percent}%
        </span>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-hover)]">
        <div
          className="relative h-full overflow-hidden rounded-full transition-[width] duration-1000 ease-out"
          style={{
            width: visible ? `${skill.percent}%` : "0%",
            backgroundColor: skill.color,
            transitionDelay: `${delay}ms`,
          }}
        >
          <span
            className="bar-shimmer absolute inset-y-0 left-0 w-1/3"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function IconBadge({ skill }) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
      style={{ backgroundColor: `${skill.color}22` }}
    >
      {!failed ? (
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          onError={() => setFailed(true)}
          className="h-5 w-5 object-contain"
        />
      ) : (
        <span
          className="font-mono text-[10px] font-bold"
          style={{ color: skill.color }}
        >
          {skill.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}

//  0 t0 number animation
function useCountUp(target, start, { duration = 1000, delay = 0 } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf;
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [start, target, duration, delay]);

  return value;
}