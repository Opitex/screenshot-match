import { createFileRoute } from "@tanstack/react-router";
import { PageHero, FinalCta } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { PROCESS } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/process")({
  head: () => seo("Our Process", "Discover, Define, Design, Build, Launch & Improve — how Opitex takes projects from idea to impact."),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="Our process" title={<>From idea to <span className="text-gradient">impact.</span></>} crumbs={[{ label: "Process" }]}
        intro="A clear, collaborative process keeps projects on track and decisions transparent." />
      <section className="pb-28">
        <div className="container-x">
          <ol className="relative border-l border-border pl-10 md:pl-16">
            {PROCESS.map((s, i) => (
              <Reveal key={s.title}>
                <li className="relative pb-20">
                  <span className="absolute top-2 -left-[calc(2.5rem+7px)] h-3.5 w-3.5 rounded-full bg-primary shadow-glow md:-left-[calc(4rem+7px)]" />
                  <span className="font-display text-sm text-cyan">Stage 0{i + 1}</span>
                  <h2 className="mt-2 text-5xl md:text-7xl">{s.title}</h2>
                  <p className="mt-4 max-w-2xl text-xl">{s.desc}</p>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{s.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
