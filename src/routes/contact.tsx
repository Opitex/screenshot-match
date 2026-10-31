import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { CONTACT } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Get in touch with Opitex Agency by email, phone or WhatsApp."),
  component: Contact,
});

function Contact() {
  const items = [
    { Icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { Icon: Phone, label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
    { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: CONTACT.whatsapp },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk." crumbs={[{ label: "Contact" }]} intro="Questions, ideas or a project in mind — reach us however suits you." />
      <section className="pb-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            {items.map(({ Icon, label, value, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-5 rounded-lg border border-border p-6 transition-all hover:border-primary hover:bg-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-cyan transition-transform group-hover:scale-110"><Icon className="h-5 w-5" /></span>
                <span><span className="block text-xs text-muted-foreground">{label}</span><span className="font-display text-lg">{value}</span></span>
              </a>
            ))}
          </div>
          <div className="lg:col-span-8"><InquiryForm full={false} /></div>
        </div>
      </section>
    </>
  );
}
