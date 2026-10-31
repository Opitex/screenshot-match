import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Cta } from "./Cta";
import { CursorTrail } from "./CursorTrail";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"none" | "full" | "lite">("none");
  useEffect(() => {
    if (!hasWebGL()) return;
    setMode(window.matchMedia("(max-width: 768px), (pointer: coarse)").matches ? "lite" : "full");
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const up = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} aria-hidden />
      <motion.div style={{ scale, opacity }} className="absolute inset-0 md:left-[30%]" aria-hidden>
        <motion.div className="h-full w-full" initial={reduce ? false : { opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, delay: 0.2, ease }}>
          {mode !== "none" && !reduce ? (
            <Suspense fallback={null}><HeroScene lite={mode === "lite"} /></Suspense>
          ) : (
            <div className="flex h-full items-center justify-center"><div className="h-80 w-80 rounded-full border border-primary/40 bg-primary/10 blur-sm" /></div>
          )}
        </motion.div>
      </motion.div>
      <CursorTrail />
      <motion.div style={{ y: yText }} className="container-x relative z-20 pt-24">
        <motion.p {...up(0.1)} className="eyebrow">Creative Technology. Digital Excellence.</motion.p>
        <h1 className="mt-6 max-w-5xl text-[clamp(3.25rem,10vw,9.5rem)] leading-[0.88] font-medium">
          <span className="block overflow-hidden"><motion.span className="block" {...(reduce ? {} : { initial: { y: "110%" }, animate: { y: 0 }, transition: { duration: 1, delay: 0.35, ease } })}>We Build</motion.span></span>
          <span className="block overflow-hidden"><motion.span className="text-gradient block" {...(reduce ? {} : { initial: { y: "110%" }, animate: { y: 0 }, transition: { duration: 1, delay: 0.47, ease } })}>What's Next.</motion.span></span>
        </h1>
        <motion.p {...up(0.75)} className="mt-8 font-display text-lg md:text-xl">Design. Development. Intelligence. Growth.</motion.p>
        <motion.p {...up(0.85)} className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          From ambitious ideas to exceptional digital experiences, Opitex brings design, technology, and strategy together to create solutions that move businesses forward.
        </motion.p>
        <div className="mt-10 flex flex-wrap gap-4">
          <motion.div {...up(1)}><Cta to="/start-a-project">Start a Project</Cta></motion.div>
          <motion.div {...up(1.1)}><Cta to="/work" variant="outline">Explore Our Work</Cta></motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 text-xs tracking-[0.3em] text-muted-foreground uppercase md:block">Scroll</div>
    </section>
  );
}
