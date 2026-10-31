import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { PROJECTS, WORK_FILTERS } from "@/lib/content";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/")({
  head: () => seo("Work", "Concept studies and selected projects across websites, e-commerce, mobile apps, UI/UX, branding, 3D and AI."),
  component: WorkPage,
});

function WorkPage() {
  const [f, setF] = useState("All");
  const list = PROJECTS.filter((p) => f === "All" || p.categories.includes(f));
  return (
    <>
      <PageHero eyebrow="Work" title={<>Ideas, <span className="text-gradient">made real.</span></>} crumbs={[{ label: "Work" }]}
        intro="The projects below are labelled concept studies — exploratory work that shows our approach. Client case studies are added with permission." />
      <section className="pb-28">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {WORK_FILTERS.map((x) => (
              <button key={x} onClick={() => setF(x)} aria-pressed={f === x} className={cn("relative rounded-full px-5 py-2.5 text-sm transition-colors", f === x ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                {f === x && <motion.span layoutId="wf" className="absolute inset-0 -z-10 rounded-full bg-primary" />}
                {x}
              </button>
            ))}
          </div>
          <motion.div layout className="mt-12 grid gap-10 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
                  <Link to="/work/$project" params={{ project: p.slug }} className="group block">
                    <div className="overflow-hidden rounded-lg"><img src={p.image} alt={p.summary} loading="lazy" width={1600} height={1008} className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" /></div>
                    <p className="mt-5 text-xs text-cyan">{p.type}</p>
                    <h2 className="mt-2 text-3xl transition-transform group-hover:translate-x-2">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.industry} · {p.services.join(", ")}</p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No projects in this category yet.</p>}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
