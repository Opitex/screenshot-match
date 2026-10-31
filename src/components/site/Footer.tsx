import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { CATEGORIES, CONTACT } from "@/lib/content";
import { Logo } from "./Logo";

const PAGES = [
  ["/services", "Services"], ["/work", "Work"], ["/about", "About"], ["/process", "Process"],
  ["/industries", "Industries"], ["/insights", "Insights"], ["/faq", "FAQ"], ["/contact", "Contact"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Opitex is a creative technology agency bringing design, engineering and strategy together to build digital products that move businesses forward.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { href: CONTACT.whatsapp, label: "WhatsApp", Icon: MessageCircle },
              { href: `mailto:${CONTACT.email}`, label: "Email", Icon: Mail },
              { href: "#", label: "LinkedIn (link coming soon)", Icon: Linkedin },
              { href: "#", label: "Instagram (link coming soon)", Icon: Instagram },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-cyan">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="eyebrow">Agency</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {PAGES.map(([to, l]) => <li key={to}><Link to={to} className="text-muted-foreground transition-colors hover:text-foreground">{l}</Link></li>)}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="eyebrow">Services</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {CATEGORIES.map((c) => <li key={c.slug}><Link to="/services/$category" params={{ category: c.slug }} className="text-muted-foreground transition-colors hover:text-foreground">{c.name}</Link></li>)}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h3 className="eyebrow">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Mail className="h-4 w-4" />{CONTACT.email}</a></li>
            <li><a href={CONTACT.phoneHref} className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Phone className="h-4 w-4" />{CONTACT.phone}</a></li>
            <li><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><MessageCircle className="h-4 w-4" />Chat on WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Opitex Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-foreground">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-foreground">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
