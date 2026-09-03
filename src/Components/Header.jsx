import { useState, useEffect, useRef } from "react";

// Small inline icons so the component has no external icon dependency.
function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Switch from floating pill -> fixed full-width bar
      setScrolled(currentY > 40);

      // Hide on scroll down, reveal on any scroll up, always show near top
      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastScrollY.current + 4) {
        setHidden(true);
        setMobileOpen(false);
      } else if (currentY < lastScrollY.current - 4) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Define the design system's CSS variables so the bar can reference them.
          Move this block into your global stylesheet (index.css) once this
          component lives in your actual project — no need to duplicate it here. */}
      <style>{`
        :root {
          --bg-primary: #0b0f19;
          --bg-secondary: #0f172a;
          --surface-card: #1e293b;
          --surface-hover: #334155;
          --border-color: #334155;
          --accent-primary: #38bdf8;
          --accent-secondary: #818cf8;
          --accent-glow: rgba(56, 189, 248, 0.15);
          --text-primary: #f8fafc;
          --text-secondary: #94a3b8;
          --text-muted: #64748b;
          --code-bg: #020617;
        }
        @keyframes cursor-blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        .blink-cursor { animation: cursor-blink 1.1s steps(1) infinite; }
      `}</style>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "px-0 pt-0" : "px-4 pt-4 md:px-8 md:pt-6"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <nav
          className={`mx-auto flex items-center justify-between border-[var(--border-color)] backdrop-blur-xl transition-all duration-500 ease-out ${
            scrolled
              ? "max-w-full rounded-none border-x-0 border-t-0 border-b px-6 py-4 md:px-12 bg-[var(--bg-primary)]/90 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
              : "max-w-5xl rounded-2xl border px-5 py-3 md:px-8 bg-[var(--surface-card)]/70 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          }`}
        >
          {/* Name / logo */}
          <a
            href="#home"
            className="flex items-baseline gap-0.5 text-lg font-semibold tracking-tight text-[var(--text-primary)] md:text-xl"
          >
            <span>Dominion Amachree</span>
            <span
              className="blink-cursor ml-0.5 h-[1em] w-[2px] translate-y-[1px] bg-[var(--accent-primary)]"
              aria-hidden="true"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent-primary)] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </nav>

        {/* Mobile menu panel */}
        <div
          className={`mx-auto overflow-hidden transition-all duration-300 ease-out md:hidden ${
            mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } ${scrolled ? "max-w-full px-6" : "max-w-5xl px-4"}`}
        >
          <ul
            className={`mt-2 flex flex-col gap-1 border border-[var(--border-color)] bg-[var(--surface-card)]/95 p-3 backdrop-blur-xl ${
              scrolled ? "rounded-b-xl" : "rounded-2xl"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}