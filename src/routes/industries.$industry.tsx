import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Cta } from "@/components/site/Cta";
import { INDUSTRIES } from "@/lib/content";
import { seo } from "@/lib/seo";

const get = (s: string) => INDUSTRIES.find((i) => i.slug === s);

export const Route = createFileRoute("/industries/$industry")({
  loader: ({ params }) => { if (!get(params.industry)) throw notFound(); return { slug: params.industry }; },
  head: ({ loaderData }) => {
    const i = loaderData && get(loaderData.slug);
    return i ? seo(`${i.name} Digital Solutions`, i.desc) : { meta: [{ title: "Industry not found | Opitex Agency" }, { name: "robots", content: "noindex" }] };
  },
  component: Industry,
});

function Industry() {
  const i = get(Route.useLoaderData().slug)!;
  return (
    <>
      <PageHero eyebrow="Industry" title={i.name} intro={i.desc} crumbs={[{ label: "Industries", to: "/industries" }, { label: i.name }]}>
        <Cta to="/start-a-project">Start a Project</Cta>
      </PageHero>
      <section className="section-paper py-24">
        <div className="container-x">
          <h2 className="text-4xl">How we help</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {i.needs.map((n, k) => <Reveal key={n} delay={k * 0.05} className="bg-paper p-8"><span className="font-display text-sm text-primary">0{k + 1}</span><p className="mt-3 text-2xl">{n}</p></Reveal>)}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
