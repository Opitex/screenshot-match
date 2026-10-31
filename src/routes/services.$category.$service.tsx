import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Cta } from "@/components/site/Cta";
import { getCategory, getService, PROCESS } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/$category/$service")({
  loader: ({ params }) => {
    if (!getService(params.category, params.service)) throw notFound();
    return { c: params.category, s: params.service };
  },
  head: ({ loaderData }) => {
    const s = loaderData && getService(loaderData.c, loaderData.s);
    return s ? seo(s.name, s.description) : { meta: [{ title: "Service not found | Opitex Agency" }, { name: "robots", content: "noindex" }] };
  },
  component: ServicePage,
});

function ServicePage() {
  const { c: cs, s: ss } = Route.useLoaderData();
  const c = getCategory(cs)!;
  const s = getService(cs, ss)!;
  const related = c.services.filter((x) => x.slug !== s.slug).slice(0, 4);
  return (
    <>
      <PageHero eyebrow={c.name} title={s.name} intro={s.description}
        crumbs={[{ label: "Services", to: "/services" }, { label: c.name, to: "/services/$category", params: { category: c.slug } }, { label: s.name }]}>
        <div className="flex flex-wrap gap-4"><Cta to="/start-a-project">Start a Project</Cta><Cta to="/contact" variant="outline">Ask a question</Cta></div>
      </PageHero>
      <section className="section-paper py-24">
        <div className="container-x grid gap-16 lg:grid-cols-3">
          <Reveal><p className="eyebrow !text-primary">The problem it solves</p><p className="mt-4 text-xl leading-relaxed">{c.problem}</p></Reveal>
          <Reveal delay={0.08}><p className="eyebrow !text-primary">What's included</p>
            <ul className="mt-4 space-y-3">{c.included.map((i) => <li key={i} className="border-b border-border pb-3">{i}</li>)}</ul></Reveal>
          <Reveal delay={0.16}><p className="eyebrow !text-primary">How to get started</p>
            <p className="mt-4 text-muted-foreground">Tell us about your goals through the project form, email or WhatsApp. We'll reply to arrange a short call, then send a clear proposal with scope, timeline and cost.</p></Reveal>
        </div>
      </section>
      <section className="py-24">
        <div className="container-x">
          <h2 className="text-4xl">Our process for {s.name.split(" — ")[0]}</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="bg-background p-6"><span className="font-display text-sm text-cyan">0{i + 1}</span><h3 className="mt-4 text-xl">{p.title}</h3><p className="mt-2 text-sm text-muted-foreground">{p.desc}</p></li>
            ))}
          </ol>
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl">Related services</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {related.map((r) => (
                  <Link key={r.slug} to="/services/$category/$service" params={{ category: c.slug, service: r.slug }} className="rounded-lg border border-border p-5 transition-all hover:-translate-y-1 hover:border-primary">
                    <h3 className="text-lg leading-snug">{r.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
