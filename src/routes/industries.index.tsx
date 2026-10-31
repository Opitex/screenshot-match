import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRIES } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/industries/")({
  head: () => seo("Industries", "Digital solutions for startups, e-commerce, real estate, professional services, education and technology companies."),
  component: Industries,
});

function Industries() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Sectors we serve." crumbs={[{ label: "Industries" }]} intro="Different industries face different digital challenges. Here's where our work fits." />
      <section className="pb-28">
        <div className="container-x grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i, n) => (
            <Reveal key={i.slug} delay={(n % 3) * 0.06}>
              <Link to="/industries/$industry" params={{ industry: i.slug }} className="group flex h-full min-h-64 flex-col rounded-lg border border-border p-8 transition-all hover:-translate-y-1 hover:border-primary hover:bg-card">
                <ArrowUpRight className="h-5 w-5 self-end transition-transform group-hover:rotate-45" />
                <h2 className="mt-auto text-2xl">{i.name}</h2>
                <p className="mt-2 text-muted-foreground">{i.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
