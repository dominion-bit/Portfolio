import { useReveal } from "../hooks/useReveal";

/**
 * Wrap any block of content in <Reveal> to fade + lift it in once it
 * scrolls into view. Use `delay` (ms) to stagger a couple of related
 * blocks — keep stagger counts small (2-3), this isn't meant for
 * per-line or per-card animation.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}