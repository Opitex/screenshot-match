import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS } from "@/lib/content";
import { seo } from "@/lib/seo";

const get = (s: string) => PROJECTS.find((p) => p.slug === s);

export const Route = createFileRoute("/work/$project")({
  loader: ({ params }) => { if (!get(params.project)) throw notFound(); return { slug: params.project }; },
  head: ({ loaderData }) => {
    const p = loaderData && get(loaderData.slug);
    return p ? seo(`${p.title} — Concept Study`, p.summary, "article") : { meta: [{ title: "Project not found | Opitex Agency" }, { name: "robots", content: "noindex" }] };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const p = get(Route.useLoaderData().slug)!;
  const idx = PROJECTS.indexOf(p);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const blocks = [["Challenge", p.challenge], ["Strategy", p.strategy], ["Design approach", p.design], ["Development approach", p.development]];
  return (
    <>
      <PageHero eyebrow={p.type} title={p.title} intro={p.summary} crumbs={[{ label: "Work", to: "/work" }, { label: p.title }]} />
      <div className="container-x"><Reveal><img src={p.image} alt={p.summary} width={1600} height={1008} className="w-full rounded-xl" /></Reveal></div>
      <section className="py-24">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <aside className="space-y-8 lg:col-span-4">
            <div><p className="eyebrow">Project type</p><p className="mt-2">{p.type}</p></div>
            <div><p className="eyebrow">Industry</p><p className="mt-2">{p.industry}</p></div>
            <div><p className="eyebrow">Deliverables</p><ul className="mt-2 space-y-1">{p.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></div>
            <p className="rounded-lg border border-border p-4 text-sm text-muted-foreground">This is a self-initiated concept study. No client results are claimed.</p>
          </aside>
          <div className="space-y-14 lg:col-span-8">
            {blocks.map(([h, t]) => <Reveal key={h}><h2 className="text-3xl">{h}</h2><p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t}</p></Reveal>)}
          </div>
        </div>
      </section>
      <section className="border-t border-border py-16">
        <div className="container-x">
          <Link to="/work/$project" params={{ project: next.slug }} className="group block">
            <p className="eyebrow">Next project</p>
            <p className="mt-3 font-display text-5xl transition-all group-hover:translate-x-3 group-hover:text-cyan md:text-7xl">{next.title} →</p>
          </Link>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
