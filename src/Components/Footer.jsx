import Reveal from "./Reveal";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-grid border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-10 md:px-8">
      <Reveal>
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <button
            onClick={scrollToTop}
            className="flex items-baseline gap-0.5 text-sm font-semibold text-[var(--text-primary)]"
          >
            Dominion Amachree
            <span className="ml-0.5 h-[1em] w-[2px] translate-y-[1px] bg-[var(--accent-primary)]" />
          </button>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-block text-sm text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="font-mono text-xs text-[var(--text-muted)]">
            © {year} · built with React &amp; Tailwind
          </p>
        </div>
      </Reveal>
    </footer>
  );
}