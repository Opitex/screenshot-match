import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Boxes, Brain, Code2, Layers, Megaphone, PenTool, ShoppingBag, Smartphone } from "lucide-react";
import { useState } from "react";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { Cta } from "@/components/site/Cta";
import { FinalCta } from "@/components/site/PageHero";
import { ARTICLES, CATEGORIES, INDUSTRIES, PILLARS, PROCESS, PROJECTS } from "@/lib/content";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => seo("We Build What's Next", "Opitex brings design, technology and strategy together to create websites, apps, AI and digital experiences that move businesses forward."),
  component: Index,
});

const ICONS = [Code2, ShoppingBag, Smartphone, Brain, PenTool, Megaphone, Layers, Boxes];

function Index() {
  return (
    <>
      <Hero />
      <Intro />
      <Pillars />
      <SelectedWork />
      <Why />
      <ProcessSection />
      <Industries />
      <Capabilities />
      <Insights />
      <FinalCta />
    </>
  );
}

function Intro() {
  return (
    <section className="section-paper py-28 md:py-40">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><p className="eyebrow !text-primary">The agency</p></Reveal>
        <div className="lg:col-span-8">
          <Reveal><h2 className="text-4xl leading-[1] font-medium md:text-6xl">One Vision. Limitless Digital Possibilities.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-xl leading-relaxed text-muted-foreground">
              Most digital problems aren't purely design problems or purely technical ones. Opitex brings creative thinking, engineering, digital strategy and emerging technology into a single team — so the website, the app, the campaign and the automation behind them are planned together and work together.
            </p>
          </Reveal>
          <Reveal delay={0.2}><div className="mt-10"><Cta to="/about" variant="dark" magnetic={false}>About Opitex</Cta></div></Reveal>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal><p className="eyebrow">Featured solutions</p><h2 className="mt-4 max-w-2xl text-4xl font-medium md:text-6xl">Eight ways we move businesses forward.</h2></Reveal>
          <Reveal delay={0.1}><Cta to="/services" variant="ring" magnetic={false}>View All Services</Cta></Reveal>
        </div>
        <div className="mt-16 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={p.title} delay={(i % 4) * 0.06} className="border-r border-b border-border">
                <Link to="/services/$category" params={{ category: p.cat }} className="group relative flex h-full min-h-72 flex-col overflow-hidden p-8 transition-colors hover:bg-card">
                  <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-primary/0 blur-3xl transition-all duration-700 group-hover:bg-primary/30" />
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-cyan transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.4} />
                    <span className="font-display text-xs text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="mt-auto pt-12 text-2xl leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <ArrowUpRight className="absolute top-8 right-14 h-5 w-5 -translate-x-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-0 group-hover:opacity-100" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="container-x">
        <Reveal><p className="eyebrow">Selected work</p><h2 className="mt-4 text-4xl font-medium md:text-6xl">Concept studies.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">Exploratory projects that show how we think. Client case studies will be published here with permission.</p></Reveal>
        <div className="mt-16 grid gap-x-8 gap-y-20 md:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} className={cn(i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-40")}>
              <Link to="/work/$project" params={{ project: p.slug }} className="group block">
                <div className="overflow-hidden rounded-lg">
                  <img src={p.image} alt={`${p.title} — ${p.summary}`} loading="lazy" width={1600} height={1008} className="aspect-[16/11] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs text-cyan">{p.type}</p>
                    <h3 className="mt-2 text-3xl transition-transform duration-500 group-hover:translate-x-2">{p.title}</h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">{p.summary}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{p.services.join(" · ")}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary"><ArrowUpRight className="h-5 w-5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20 flex justify-center"><Cta to="/work" variant="outline">Explore Our Work</Cta></Reveal>
      </div>
    </section>
  );
}

function Why() {
  const items = ["Strategy-led execution", "Design and development working together", "Solutions built around business needs", "Modern technologies", "Scalable digital experiences", "Attention to detail"];
  const copy = [
    "Every project starts with what the business needs to achieve, not with a template.",
    "Designers and engineers work side by side, so ideas survive the move to production.",
    "We recommend what fits your goals and budget — even if that's the simpler option.",
    "We build on proven, well-supported tools that your team can maintain.",
    "Architecture that handles growth in users, content and features.",
    "Performance, accessibility and polish are part of the work, not extras.",
  ];
  return (
    <section className="section-paper py-28 md:py-40">
      <div className="container-x">
        <Reveal><p className="eyebrow !text-primary">Why Opitex</p><h2 className="mt-4 max-w-3xl text-4xl font-medium md:text-6xl">Creative Thinking. Technical Execution.</h2></Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t} delay={(i % 3) * 0.06} className="bg-paper p-10">
              <span className="font-display text-sm text-primary">/{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-2xl">{t}</h3>
              <p className="mt-3 text-muted-foreground">{copy[i]}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-28 md:py-40">
      <div className="container-x">
        <Reveal><p className="eyebrow">Our process</p><h2 className="mt-4 text-4xl font-medium md:text-6xl">Five stages. No surprises.</h2></Reveal>
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <ol className="lg:col-span-7">
            {PROCESS.map((s, i) => (
              <li key={s.title} className="border-b border-border">
                <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-pressed={active === i}
                  className="group flex w-full items-baseline gap-6 py-6 text-left">
                  <span className={cn("font-display text-sm transition-colors", active === i ? "text-cyan" : "text-muted-foreground")}>0{i + 1}</span>
                  <span className={cn("font-display text-3xl transition-all duration-500 md:text-5xl", active === i ? "translate-x-2 text-foreground" : "text-muted-foreground/50")}>{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="lg:col-span-5">
            <div className="sticky top-32 rounded-xl border border-border bg-card p-10">
              <div className="h-1 w-full overflow-hidden rounded bg-muted"><div className="bg-brand h-full transition-all duration-700" style={{ width: `${((active + 1) / PROCESS.length) * 100}%` }} /></div>
              <h3 key={active} className="animate-in fade-in slide-in-from-bottom-2 mt-10 text-4xl">{PROCESS[active].title}</h3>
              <p className="mt-4 text-lg">{PROCESS[active].desc}</p>
              <p className="mt-3 text-muted-foreground">{PROCESS[active].detail}</p>
              <div className="mt-10"><Cta to="/process" variant="ring" magnetic={false}>How we work</Cta></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="overflow-hidden border-y border-border py-24">
      <div className="container-x"><Reveal><p className="eyebrow">Industries</p></Reveal></div>
      <div className="mt-10 flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
          <Link key={i} to="/industries/$industry" params={{ industry: ind.slug }} className="rounded-full border border-border px-8 py-5 font-display text-2xl whitespace-nowrap transition-colors hover:border-primary hover:bg-primary/10 md:text-4xl">
            {ind.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal><p className="eyebrow">Full capabilities</p><h2 className="mt-4 text-4xl font-medium md:text-5xl">Nine divisions. One team.</h2>
            <p className="mt-6 text-muted-foreground">Over seventy services across design, engineering, media, marketing and AI.</p>
            <div className="mt-8"><Cta to="/services" variant="ring" magnetic={false}>View All Services</Cta></div></Reveal>
        </div>
        <ul className="lg:col-span-8">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.03}>
              <li className="border-b border-border">
                <Link to="/services/$category" params={{ category: c.slug }} className="group flex items-center gap-6 py-6">
                  <span className="font-display text-xs text-muted-foreground">0{c.index}</span>
                  <span className="flex-1 font-display text-2xl transition-all duration-300 group-hover:translate-x-2 group-hover:text-cyan md:text-3xl">{c.name}</span>
                  <span className="hidden text-sm text-muted-foreground md:block">{c.services.length} services</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="section-paper py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><p className="eyebrow !text-primary">Insights</p><h2 className="mt-4 text-4xl font-medium md:text-6xl">Notes from the studio.</h2></Reveal>
          <Reveal><Cta to="/insights" variant="dark" magnetic={false}>All insights</Cta></Reveal>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link to="/insights/$article" params={{ article: a.slug }} className="group block border-t border-paper-foreground/20 pt-6">
                <p className="text-xs text-primary">{a.category} · {a.readTime}</p>
                <h3 className="mt-4 text-2xl transition-colors group-hover:text-primary">{a.title}</h3>
                <p className="mt-3 text-muted-foreground">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
