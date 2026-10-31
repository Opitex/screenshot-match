import { PageHero } from "./PageHero";
import { CONTACT } from "@/lib/content";

export function Legal({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ label: title }]} intro="This page is a general template and should be reviewed by a legal professional before relying on it." />
      <section className="pb-28">
        <div className="container-x max-w-3xl space-y-10">
          {sections.map(([h, t]) => <div key={h}><h2 className="text-2xl">{h}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{t}</p></div>)}
          <div><h2 className="text-2xl">Contact</h2><p className="mt-3 text-muted-foreground">Questions about this policy can be sent to <a href={`mailto:${CONTACT.email}`} className="text-cyan underline">{CONTACT.email}</a>.</p></div>
        </div>
      </section>
    </>
  );
}
