import { useEffect, useState } from "react";
import MatrixLoader from "./Matrixloader";

const LINES = [
  { text: "$ whoami", speed: 22 },
  { text: "> dominion_amachree", speed: 16 },
  { text: "$ status --check", speed: 22 },
  { text: "$ ./launch_portfolio.sh", speed: 22 },
];

const SESSION_KEY = "portfolio-intro-seen";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function BootIntro() {
  // Skip entirely on repeat visits within the same tab session, and for
  // anyone who's asked their OS to reduce motion.
  const [shouldRun] = useState(() => {
    if (typeof window === "undefined") return false;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return !alreadySeen && !reducedMotion;
  });

  const [mounted, setMounted] = useState(shouldRun);
  const [leaving, setLeaving] = useState(false);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [typingText, setTypingText] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!shouldRun) return;

    let cancelled = false;
    document.body.style.overflow = "hidden";

    async function runSequence() {
      for (const line of LINES) {
        let typed = "";
        for (const char of line.text) {
          if (cancelled) return;
          typed += char;
          setTypingText(typed);
          await sleep(line.speed);
        }
        if (cancelled) return;
        setDisplayedLines((prev) => [...prev, typed]);
        setTypingText("");
        await sleep(220);
      }

      if (cancelled) return;
      await sleep(200);

      setShowLoader(true);
      await sleep(1800);

      if (cancelled) return;
      finish();
    }

    function finish() {
      if (cancelled) return;
      sessionStorage.setItem(SESSION_KEY, "true");
      setLeaving(true);
      setTimeout(() => {
        if (!cancelled) setMounted(false);
        document.body.style.overflow = "";
      }, 500);
    }

    runSequence();

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRun]);

  const handleSkip = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setLeaving(true);
    setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-[var(--bg-primary)] px-4 transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--code-bg)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] bg-[var(--surface-card)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
          <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">
            boot.sh
          </span>
        </div>

        <div className="min-h-[260px] p-5 font-mono text-sm leading-relaxed text-[var(--text-secondary)]">
          {displayedLines.map((line, i) => (
            <div key={i}>
              <Colorized text={line} />
            </div>
          ))}
          {typingText && (
            <div>
              <Colorized text={typingText} />
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-[var(--accent-primary)]" />
            </div>
          )}

          {displayedLines.length === LINES.length && !typingText && showLoader && (
            <div className="mt-5 flex flex-col items-center gap-3">
              <MatrixLoader />
              <p className="font-mono text-xs text-[var(--text-muted)]">
                loading portfolio…
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="absolute bottom-8 font-mono text-xs text-[var(--text-muted)]">
        click anywhere to skip
      </p>
    </div>
  );
}

/** Tints "$ " prompts one color and "> " output lines another. */
function Colorized({ text }) {
  if (text.startsWith("$ ")) {
    return (
      <span>
        <span className="text-[var(--accent-secondary)]">$</span>
        <span className="text-[var(--text-primary)]">{text.slice(1)}</span>
      </span>
    );
  }
  if (text.startsWith("> ")) {
    return (
      <span>
        <span className="text-[var(--accent-primary)]">&gt;</span>
        <span className="text-[var(--text-secondary)]">{text.slice(1)}</span>
      </span>
    );
  }
  return <span className="text-[var(--text-primary)]">{text}</span>;
}