/**
 * A soft blurred circle of color, used to give sections a sense of light
 * and depth instead of a flat solid background. Place a couple per
 * section near its edges — with an overflow-hidden section wrapper —
 * and alternate `color` between sections so the page feels like it has
 * a continuous, drifting light source rather than repeating one blob.
 */
export default function GlowOrb({ className = "", color, size = 340 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, background: color }}
    />
  );
}