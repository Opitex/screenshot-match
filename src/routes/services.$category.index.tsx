import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Cta } from "@/components/site/Cta";
import { getCategory } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/$category/")({
  loader: ({ params }) => {
    const c = getCategory(params.category);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData && getCategory(loaderData.slug);
    return c ? seo(`${c.name} Services`, c.short) : { meta: [{ title: "Service not found | Opitex Agency" }, { name: "robots", content: "noindex" }] };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const c = getCategory(Route.useLoaderData().slug)!;
  return (
    <>
      <PageHero eyebrow={`Division 0${c.index}`} title={c.name} intro={c.intro} crumbs={[{ label: "Services", to: "/services" }, { label: c.name }]}>
        <Cta to="/start-a-project">Start a Project</Cta>
      </PageHero>
      <section className="section-paper py-24">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <Reveal><p className="eyebrow !text-primary">The problem</p><p className="mt-4 text-2xl leading-snug">{c.problem}</p></Reveal>
          <Reveal delay={0.1}><p className="eyebrow !text-primary">Typically included</p>
            <ul className="mt-4 space-y-3">{c.included.map((i) => <li key={i} className="border-b border-border pb-3 text-lg">{i}</li>)}</ul></Reveal>
        </div>
      </section>
      <section className="py-24">
        <div className="container-x">
          <h2 className="text-4xl">Services</h2>
          <ul className="mt-10">
            {c.services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.03}>
                <li className="border-b border-border">
                  <Link to="/services/$category/$service" params={{ category: c.slug, service: s.slug }} className="group grid gap-2 py-7 md:grid-cols-12 md:items-center">
                    <span className="font-display text-2xl transition-all group-hover:translate-x-2 group-hover:text-cyan md:col-span-5">{s.name}</span>
                    <span className="text-muted-foreground md:col-span-6">{s.description}</span>
                    <ArrowUpRight className="hidden h-5 w-5 justify-self-end transition-transform group-hover:rotate-45 md:block" />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
