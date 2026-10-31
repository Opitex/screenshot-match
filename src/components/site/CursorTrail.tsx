import { useEffect, useRef } from "react";

type P = { x: number; y: number; life: number; vx: number; vy: number };

/** Electric-blue geometric trail that only appears while the pointer moves. */
export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ctx = canvas.getContext("2d")!;
    let pts: P[] = [];
    let raf = 0;
    let lx = 0, ly = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (y < 0 || y > r.height) return;
      const speed = Math.hypot(x - lx, y - ly);
      lx = x; ly = y;
      const count = Math.min(3, 1 + Math.floor(speed / 25));
      for (let i = 0; i < count; i++) {
        pts.push({ x: x + (Math.random() - 0.5) * speed, y: y + (Math.random() - 0.5) * speed, life: 1, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6 });
      }
      if (pts.length > 70) pts = pts.slice(-70);
    };
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) { p.life -= 0.012; p.x += p.vx; p.y += p.vy; }
      pts = pts.filter((p) => p.life > 0);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            const alpha = Math.min(a.life, b.life) * (1 - d / 120);
            ctx.strokeStyle = `rgba(36, 91, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const p = pts[i];
        ctx.fillStyle = `rgba(99, 230, 255, ${p.life})`;
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full" />;
}
