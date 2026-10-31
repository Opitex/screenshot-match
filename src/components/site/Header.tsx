import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Cta } from "./Cta";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", mega: true },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/process", label: "Process" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => { setOpen(false); setMega(false); };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || mega ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent",
      )}
      onMouseLeave={() => setMega(false)}
    >
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Link to="/" onClick={close} aria-label="Opitex Agency home"><Logo /></Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <div key={n.to} onMouseEnter={() => setMega("mega" in n)}>
              <Link
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="group relative flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
                onFocus={() => setMega("mega" in n)}
              >
                {n.label}
                {"mega" in n && <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", mega && "rotate-180")} />}
                <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-cyan transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden lg:block"><Cta to="/start-a-project">Start a Project</Cta></div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="hidden border-t border-border lg:block"
          >
            <div className="container-x grid grid-cols-3 gap-x-10 gap-y-6 py-10">
              {CATEGORIES.map((c, i) => (
                <motion.div key={c.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link to="/services/$category" params={{ category: c.slug }} onClick={close} className="group block">
                    <span className="font-display text-xs text-cyan">0{c.index}</span>
                    <span className="ml-3 font-display text-base transition-colors group-hover:text-cyan">{c.name}</span>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.short}</p>
                  </Link>
                </motion.div>
              ))}
              <div className="col-span-3 flex justify-end border-t border-border pt-6">
                <Cta to="/services" variant="ring" magnetic={false}>View All Services</Cta>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-background lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col py-8">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="border-b border-border">
                  {"mega" in n ? (
                    <>
                      <button onClick={() => setSvcOpen((s) => !s)} aria-expanded={svcOpen} className="flex w-full items-center justify-between py-4 font-display text-3xl">
                        Services <ChevronDown className={cn("h-6 w-6 transition-transform", svcOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {svcOpen && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="flex flex-col gap-1 pb-4">
                              <Link to="/services" onClick={close} className="py-2 text-cyan">All services</Link>
                              {CATEGORIES.map((c) => (
                                <Link key={c.slug} to="/services/$category" params={{ category: c.slug }} onClick={close} className="py-2 text-muted-foreground">{c.name}</Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={n.to} onClick={close} className="block py-4 font-display text-3xl">{n.label}</Link>
                  )}
                </motion.div>
              ))}
              <div className="mt-8" onClick={close}><Cta to="/start-a-project" size="lg">Start a Project</Cta></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
