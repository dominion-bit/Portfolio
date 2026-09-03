/**
 * Large, very faint background numeral marking a section (00, 01, 02...).
 * Purely decorative — sits behind the real content, pointer-events-none,
 * aria-hidden. Gives sections a sense of place in a sequence and adds
 * visual weight to otherwise-empty background space.
 */
export default function SectionNumber({ value, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none font-['Space_Grotesk'] font-bold text-[var(--text-primary)] opacity-[0.04] ${className}`}
      style={{ fontSize: "clamp(6rem, 16vw, 13rem)", lineHeight: 1 }}
    >
      {value}
    </span>
  );
}