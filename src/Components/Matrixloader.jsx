import { useEffect, useState } from "react";

const DIGIT_COUNT = 9;

function randomBit() {
  return Math.random() > 0.5 ? "1" : "0";
}

/**
 * Matrix-style falling-digits loader.
 * Adapted from a Uiverse.io loader by PriyanshuGupta28 — retinted to use
 * this site's accent colors instead of the original hardcoded green, and
 * the digits now flip randomly over time instead of staying static.
 */
export default function MatrixLoader() {
  const [digits, setDigits] = useState(() =>
    Array.from({ length: DIGIT_COUNT }, randomBit)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDigits((prev) => prev.map((d) => (Math.random() > 0.65 ? randomBit() : d)));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ai-matrix-loader">
      <div className="matrix-glow" aria-hidden="true" />
      {digits.map((digit, i) => (
        <span
          key={i}
          className="matrix-digit"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {digit}
        </span>
      ))}

      <style>{`
        .ai-matrix-loader {
          position: relative;
          width: 108px;
          height: 108px;
          margin: 0 auto;
          perspective: 800px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .matrix-digit {
          color: var(--accent-primary);
          font-family: monospace;
          font-size: 18px;
          line-height: 1;
          text-align: center;
          text-shadow: 0 0 6px var(--accent-glow), 0 0 2px var(--accent-primary);
          animation: matrix-fall 2s infinite, matrix-flicker 0.5s infinite;
          opacity: 0;
        }
        .matrix-glow {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          animation: matrix-pulse 2s infinite;
        }
        @keyframes matrix-fall {
          0% { transform: translateY(-40px) rotateX(90deg); opacity: 0; }
          20%, 80% { transform: translateY(0) rotateX(0deg); opacity: 0.9; }
          100% { transform: translateY(40px) rotateX(-90deg); opacity: 0; }
        }
        @keyframes matrix-flicker {
          0%, 19%, 21%, 100% { opacity: 0.9; }
          20% { opacity: 0.25; }
        }
        @keyframes matrix-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.65; }
        }
      `}</style>
    </div>
  );
}