import { useEffect, useRef } from "react";

// Uses your two accent colors so the particles read as part of the
// same system as everything else, not a random effect bolted on.
const COLORS = ["#38bdf8", "#818cf8"];
const CONNECTION_DISTANCE = 130;

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles, rafId, running = true;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticles() {
      // Scale count to screen area so it stays light on small screens.
      const count = Math.min(90, Math.max(30, Math.floor((width * height) / 15000)));
      particles = Array.from({ length: count }, () => ({
        // Each particle has a fixed "home" point and drifts in a small
        // loop around it — a few pixels, not across the viewport.
        ox: Math.random() * width,
        oy: Math.random() * height,
        radius: Math.random() * 1.8 + 1,
        amp: Math.random() * 20 + 10,
        speed: Math.random() * 0.4 + 0.15,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        baseOpacity: Math.random() * 0.35 + 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        x: 0,
        y: 0,
      }));
    }

    function draw(time) {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;

      // First pass: update positions.
      for (const p of particles) {
        p.x = p.ox + Math.cos(t * p.speed + p.phaseX) * p.amp;
        p.y = p.oy + Math.sin(t * p.speed + p.phaseY) * p.amp;
      }

      // Second pass: draw connecting lines between nearby particles.
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "#38bdf8";
            ctx.globalAlpha = opacity;
            ctx.stroke();
          }
        }
      }

      // Third pass: draw the particles themselves, on top of the lines.
      for (const p of particles) {
        const twinkle = (Math.sin(t * p.speed * 1.6 + p.phaseX) + 1) / 2;
        const opacity = p.baseOpacity * (0.6 + twinkle * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 9;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    function handleResize() {
      resize();
      createParticles();
    }

    function handleVisibility() {
      running = !document.hidden;
      if (running) rafId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[15]"
    />
  );
}