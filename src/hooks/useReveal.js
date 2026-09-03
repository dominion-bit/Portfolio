import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element has scrolled into view, once.
 * Respects prefers-reduced-motion by revealing immediately.
 */
export function useReveal(threshold = 0.2) {
  const ref = useRef(null);

  // Compute this up front instead of inside the effect, so we never need
  // a synchronous setState call in the effect body for this branch.
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    // Already visible (reduced motion, or revealed on a previous mount) —
    // nothing to observe.
    if (visible) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, threshold]);

  return [ref, visible];
}