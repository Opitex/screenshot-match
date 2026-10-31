import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { CONTACT } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/start-a-project")({
  head: () => seo("Start a Project", "Tell Opitex about your project — goals, budget and timeline — and we'll get back to you with next steps."),
  component: Start,
});

function Start() {
  return (
    <>
      <PageHero eyebrow="Start a project" title={<>Tell us what you're <span className="text-gradient">building.</span></>} crumbs={[{ label: "Start a Project" }]}
        intro={<>A few details help us respond with useful next steps. Prefer to chat? <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="text-cyan underline">Message us on WhatsApp</a>.</>} />
      <section className="pb-28"><div className="container-x max-w-4xl"><InquiryForm /></div></section>
    </>
  );
}
