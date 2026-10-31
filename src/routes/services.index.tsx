import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { CATEGORIES } from "@/lib/content";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => seo("All Services", "Explore over seventy Opitex services across design, development, mobile, e-commerce, 3D, marketing, content and AI."),
  component: ServicesPage,
});

export function filterServices(query: string, category: string | null) {
  const q = query.trim().toLowerCase();
  return CATEGORIES.filter((c) => !category || c.slug === category)
    .map((c) => ({ ...c, services: c.services.filter((s) => !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) }))
    .filter((c) => c.services.length > 0);
}

function ServicesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const results = useMemo(() => filterServices(q, cat), [q, cat]);
  const total = results.reduce((n, c) => n + c.services.length, 0);

  return (
    <>
      <PageHero eyebrow="Services catalogue" title={<>Everything we do, <span className="text-gradient">in one place.</span></>}
        intro="Nine divisions, one coordinated team. Search for what you need, or browse by category." crumbs={[{ label: "Services" }]} />
      <section className="pb-28">
        <div className="container-x">
          <div className="sticky top-[72px] z-30 -mx-2 border-b border-border bg-background/90 px-2 py-5 backdrop-blur-xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <label htmlFor="svc-search" className="sr-only">Search services</label>
              <input id="svc-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, e.g. Shopify, SEO, chatbot…"
                className="w-full rounded-full border border-input bg-card/60 py-4 pr-4 pl-12 text-foreground transition-all focus:border-primary focus:outline-none" />
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
              <button onClick={() => setCat(null)} aria-pressed={!cat} className={cn("shrink-0 rounded-full border px-4 py-2 text-sm transition-all", !cat ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground")}>All</button>
              {CATEGORIES.map((c) => (
                <button key={c.slug} onClick={() => setCat(cat === c.slug ? null : c.slug)} aria-pressed={cat === c.slug}
                  className={cn("shrink-0 rounded-full border px-4 py-2 text-sm transition-all", cat === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
                  {c.name}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span aria-live="polite">{total} service{total === 1 ? "" : "s"}</span>
              {(q || cat) && <button onClick={() => { setQ(""); setCat(null); }} className="flex items-center gap-1 text-cyan hover:underline"><X className="h-3.5 w-3.5" />Clear all filters</button>}
            </div>
          </div>

          {results.length === 0 && <p className="py-24 text-center text-muted-foreground">No services match "{q}". Try another keyword or <Link to="/contact" className="text-cyan underline">ask us directly</Link>.</p>}

          <motion.div layout className="mt-6">
            <AnimatePresence mode="popLayout">
              {results.map((c) => {
                const isCollapsed = collapsed[c.slug] && !q;
                return (
                  <motion.section key={c.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-b border-border py-10">
                    <div className="flex items-start justify-between gap-6">
                      <button onClick={() => setCollapsed({ ...collapsed, [c.slug]: !collapsed[c.slug] })} aria-expanded={!isCollapsed} className="flex items-baseline gap-5 text-left">
                        <span className="font-display text-sm text-cyan">0{c.index}</span>
                        <h2 className="text-3xl md:text-4xl">{c.name}</h2>
                        <ChevronDown className={cn("h-5 w-5 self-center transition-transform", !isCollapsed && "rotate-180")} />
                      </button>
                      <Link to="/services/$category" params={{ category: c.slug }} className="hidden shrink-0 text-sm text-muted-foreground hover:text-cyan md:block">Category overview →</Link>
                    </div>
                    <AnimatePresence initial={false}>
                      {!isCollapsed && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {c.services.map((s) => (
                              <Link key={s.slug} to="/services/$category/$service" params={{ category: c.slug, service: s.slug }}
                                className="group relative rounded-lg border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-card">
                                <h3 className="pr-8 text-lg leading-snug">{s.name}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                                <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-cyan" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.section>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
