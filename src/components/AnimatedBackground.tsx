import { useEffect, useRef } from "react";

const BUBBLE_COUNT = 18;
const SPARKLE_COUNT = 22;
const ICON_COUNT = 10;

const bubbles = Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
  id: i,
  size: 8 + Math.random() * 28,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 10,
  opacity: 0.12 + Math.random() * 0.22,
}));

const sparkles = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
  id: i,
  size: 3 + Math.random() * 7,
  top: Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 3,
}));

// SVG paths for cleaning/water icons
const svgIcons = [
  // Water drop
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>`,
  // Spray bottle (custom)
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8l1 3H7L8 3z"/><rect x="7" y="6" width="10" height="14" rx="2"/><path d="M10 10h4M10 13h4M10 16h4"/></svg>`,
  // Brush
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2.5-2-3"/><path d="M9 21c0 0 4-1 4-8V5c0-1.25.75-2.5 2-3"/><path d="M13 13c0 5 3 8 7 8"/></svg>`,
  // Droplet
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  // Sparkle
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>`,
];

const floatingIcons = Array.from({ length: ICON_COUNT }, (_, i) => ({
  id: i,
  iconIdx: i % svgIcons.length,
  size: 18 + Math.random() * 26,
  top: Math.random() * 90,
  left: Math.random() * 90,
  delay: Math.random() * 8,
  duration: 10 + Math.random() * 8,
  rotateDir: Math.random() > 0.5 ? 1 : -1,
  isGreen: Math.random() > 0.5,
}));

export default function AnimatedBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const colors = ["rgba(34,197,94,", "rgba(14,165,233,", "rgba(16,185,129,", "rgba(6,182,212,"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.5 + Math.random() * 2.5,
        alpha: 0.15 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      });

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34,197,94,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <style>{`
        @keyframes bubble-rise {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          10% { opacity: var(--bub-op); }
          90% { opacity: var(--bub-op); }
          100% { transform: translateY(-120px) scale(1.1); opacity: 0; }
        }
        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(var(--rot-deg)); }
          66% { transform: translateY(8px) rotate(calc(var(--rot-deg) * -0.5)); }
        }
        @keyframes wave-move {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-25%) scaleY(0.9); }
          100% { transform: translateX(-50%) scaleY(1); }
        }
        @keyframes wave-move-slow {
          0% { transform: translateX(0) scaleY(1.05); }
          100% { transform: translateX(-50%) scaleY(0.95); }
        }
        @keyframes ripple {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.12; }
        }
      `}</style>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      {/* Bubbles rising */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full border"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: "-60px",
            borderColor: b.id % 2 === 0 ? `rgba(34,197,94,${b.opacity * 1.4})` : `rgba(14,165,233,${b.opacity * 1.4})`,
            background: b.id % 3 === 0
              ? `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(34,197,94,${b.opacity * 0.6}))`
              : `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(14,165,233,${b.opacity * 0.6}))`,
            ["--bub-op" as string]: b.opacity,
            animation: `bubble-rise ${b.duration}s ${b.delay}s ease-in-out infinite`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animation: `sparkle-pulse ${s.duration}s ${s.delay}s ease-in-out infinite`,
            zIndex: 3,
          }}
        >
          <svg viewBox="0 0 24 24" fill={s.id % 2 === 0 ? "#22c55e" : "#0ea5e9"} style={{ width: "100%", height: "100%", opacity: 0.7 }}>
            <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
          </svg>
        </div>
      ))}

      {/* Floating cleaning icons */}
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute"
          style={{
            width: icon.size,
            height: icon.size,
            top: `${icon.top}%`,
            left: `${icon.left}%`,
            color: icon.isGreen ? "rgba(34,197,94,0.18)" : "rgba(14,165,233,0.18)",
            ["--rot-deg" as string]: `${icon.rotateDir * (15 + Math.random() * 20)}deg`,
            animation: `float-icon ${icon.duration}s ${icon.delay}s ease-in-out infinite`,
            zIndex: 2,
          }}
          dangerouslySetInnerHTML={{ __html: svgIcons[icon.iconIdx] }}
        />
      ))}

      {/* Ripple rings */}
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="absolute rounded-full border border-green-300/20"
          style={{
            width: 160 + n * 80,
            height: 160 + n * 80,
            top: `${20 + n * 15}%`,
            left: `${60 + n * 5}%`,
            animation: `ripple ${3 + n}s ${n * 0.8}s ease-out infinite`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ zIndex: 2, height: 120 }}>
        <div style={{ width: "200%", animation: "wave-move 12s linear infinite" }}>
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "50%", display: "inline-block" }}>
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="rgba(34,197,94,0.05)" />
          </svg>
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "50%", display: "inline-block" }}>
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="rgba(34,197,94,0.05)" />
          </svg>
        </div>
        <div style={{ width: "200%", position: "absolute", bottom: 0, animation: "wave-move-slow 18s linear infinite" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "50%", display: "inline-block" }}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="rgba(14,165,233,0.07)" />
          </svg>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "50%", display: "inline-block" }}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="rgba(14,165,233,0.07)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
