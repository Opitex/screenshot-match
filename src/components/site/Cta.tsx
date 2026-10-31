import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand animate-shift text-primary-foreground shadow-glow hover:shadow-[0_14px_50px_-8px_var(--primary)]",
  outline:
    "border border-foreground/25 text-foreground before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-primary/15 before:transition-transform before:duration-500 hover:border-primary hover:before:scale-x-100",
  ring: "border-spin border border-border bg-card/40 text-foreground hover:bg-card",
  dark: "bg-paper-foreground text-paper hover:bg-indigo",
};

type Props = {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: "md" | "lg";
  className?: string;
  magnetic?: boolean;
};

/** Animated CTA link: magnetic on fine pointers, arrow slides on hover, press scale. */
export function Cta({ to, params, children, variant = "primary", size = "md", className, magnetic = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className="inline-block" whileTap={{ scale: 0.96 }}>
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={to as any}
        params={params as never}
        className={cn(
          "group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full font-display font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          size === "lg" ? "px-9 py-5 text-lg" : "px-6 py-3.5 text-sm",
          variants[variant],
          className,
        )}
      >
        <span>{children}</span>
        <span className="relative flex h-5 w-5 overflow-hidden">
          <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-full" />
          <ArrowRight className="absolute h-5 w-5 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
        </span>
      </Link>
    </motion.div>
  );
}
