import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function PageHero({ eyebrow, title, intro, crumbs, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; crumbs?: Crumb[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_30%_20%,black,transparent)]" aria-hidden />
      <div className="absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[120px]" aria-hidden />
      <div className="container-x relative">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" />
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {c.to ? <Link to={c.to as any} params={c.params as never} className="hover:text-foreground">{c.label}</Link> : <span aria-current="page" className="text-foreground">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
        <Reveal delay={0.08}><h1 className="mt-5 max-w-5xl text-5xl leading-[0.95] font-medium md:text-7xl lg:text-8xl">{title}</h1></Reveal>
        {intro && <Reveal delay={0.16}><p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p></Reveal>}
        {children && <Reveal delay={0.24}><div className="mt-10">{children}</div></Reveal>}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border py-28 md:py-40">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} aria-hidden />
      <div className="container-x relative text-center">
        <Reveal><h2 className="mx-auto max-w-4xl text-5xl leading-[0.95] font-medium md:text-7xl">Have Something <span className="text-gradient">Ambitious</span> in Mind?</h2></Reveal>
        <Reveal delay={0.1}><p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Let's turn your next big idea into something exceptional.</p></Reveal>
        <Reveal delay={0.2}><div className="mt-12 flex justify-center"><CtaLazy /></div></Reveal>
      </div>
    </section>
  );
}

import { Cta } from "./Cta";
function CtaLazy() {
  return <Cta to="/start-a-project" size="lg">Start a Project</Cta>;
}
