import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { ARTICLES } from "@/lib/content";
import { seo } from "@/lib/seo";

const get = (s: string) => ARTICLES.find((a) => a.slug === s);

export const Route = createFileRoute("/insights/$article")({
  loader: ({ params }) => { if (!get(params.article)) throw notFound(); return { slug: params.article }; },
  head: ({ loaderData }) => {
    const a = loaderData && get(loaderData.slug);
    return a ? seo(a.title, a.excerpt, "article") : { meta: [{ title: "Article not found | Opitex Agency" }, { name: "robots", content: "noindex" }] };
  },
  component: Article,
});

function Article() {
  const a = get(Route.useLoaderData().slug)!;
  return (
    <>
      <PageHero eyebrow={`${a.category} · ${a.readTime}`} title={a.title} intro={a.excerpt} crumbs={[{ label: "Insights", to: "/insights" }, { label: a.title }]} />
      <article className="container-x pb-28">
        <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          {a.body.map((p, i) => <p key={i} className={i === 0 ? "text-xl text-foreground" : ""}>{p}</p>)}
        </div>
      </article>
      <FinalCta />
    </>
  );
}
