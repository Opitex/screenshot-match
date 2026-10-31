import { createFileRoute } from "@tanstack/react-router";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About", "Opitex is a creative technology agency combining design, engineering, strategy and emerging technology."),
  component: About,
});

const VALUES = [
  ["Clarity over complexity", "We explain trade-offs plainly and recommend what genuinely fits."],
  ["Craft in the details", "Performance, accessibility and polish are part of the brief."],
  ["Honest partnership", "No inflated claims — just clear scope, communication and delivery."],
  ["Built to last", "We design systems your team can understand, maintain and grow."],
];

function About() {
  return (
    <>
      <PageHero eyebrow="About Opitex" title={<>Where creativity meets <span className="text-gradient">engineering.</span></>} crumbs={[{ label: "About" }]}
        intro="Opitex is a creative technology agency. We bring designers, developers, strategists and specialists together so the digital work a business depends on is planned, built and improved as one." />
      <section className="section-paper py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal><h2 className="text-4xl md:text-5xl">What we believe</h2></Reveal>
          <Reveal delay={0.1}><p className="text-xl leading-relaxed text-muted-foreground">Great digital work sits at the intersection of business understanding, thoughtful design and solid engineering. When those disciplines work apart, ideas get lost between them. When they work together, products become clearer, faster and more effective.</p></Reveal>
        </div>
      </section>
      <section className="py-24">
        <div className="container-x">
          <h2 className="text-4xl">Our values</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {VALUES.map(([t, d], i) => <Reveal key={t} delay={i * 0.06} className="bg-background p-10"><h3 className="text-2xl">{t}</h3><p className="mt-3 text-muted-foreground">{d}</p></Reveal>)}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
