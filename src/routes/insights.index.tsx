import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ARTICLES } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  head: () => seo("Insights", "Practical guides and perspectives on design, engineering, AI and digital growth from Opitex."),
  component: Insights,
});

function Insights() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Notes from the studio." crumbs={[{ label: "Insights" }]} intro="Practical guides on building, designing and growing digital products." />
      <section className="pb-28">
        <div className="container-x">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.05}>
              <Link to="/insights/$article" params={{ article: a.slug }} className="group grid gap-3 border-t border-border py-10 md:grid-cols-12">
                <p className="text-sm text-cyan md:col-span-3">{a.category} · {a.readTime}</p>
                <h2 className="text-3xl transition-all group-hover:translate-x-2 group-hover:text-cyan md:col-span-5">{a.title}</h2>
                <p className="text-muted-foreground md:col-span-4">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
