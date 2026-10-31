import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { FAQS } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQ", "Answers to common questions about working with Opitex Agency: pricing, timelines, ownership and support."),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered." crumbs={[{ label: "FAQ" }]} />
      <section className="pb-28">
        <div className="container-x max-w-4xl">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-border py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-xl md:text-2xl">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45 group-open:text-cyan" />
              </summary>
              <p className="animate-in fade-in slide-in-from-top-1 mt-4 max-w-3xl text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
