import { useState } from "react";
import { Loader2, Mail, MessageCircle } from "lucide-react";
import { CATEGORIES, CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";

export type Inquiry = {
  name: string; email: string; company: string; category: string;
  description: string; budget: string; timeline: string; contact: string;
};
const EMPTY: Inquiry = { name: "", email: "", company: "", category: "", description: "", budget: "", timeline: "", contact: "Email" };

export function validateInquiry(v: Inquiry, full: boolean) {
  const e: Partial<Record<keyof Inquiry, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.description.trim().length < 20) e.description = "Please describe your project in at least 20 characters.";
  if (full) {
    if (!v.category) e.category = "Please choose a service category.";
    if (!v.budget) e.budget = "Please choose an estimated budget.";
    if (!v.timeline) e.timeline = "Please choose a timeline.";
  }
  return e;
}

export function composeMessage(v: Inquiry) {
  return [
    `Name: ${v.name}`, `Email: ${v.email}`, v.company && `Company: ${v.company}`,
    v.category && `Service: ${v.category}`, v.budget && `Budget: ${v.budget}`,
    v.timeline && `Timeline: ${v.timeline}`, `Preferred contact: ${v.contact}`, "", v.description,
  ].filter((l) => l !== "" && l !== undefined && l !== false).join("\n");
}

const field = "w-full rounded-md border border-input bg-card/50 px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-primary focus:bg-card focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_20%,transparent)] focus:outline-none aria-[invalid=true]:border-destructive";

export function InquiryForm({ full = true }: { full?: boolean }) {
  const [v, setV] = useState<Inquiry>(EMPTY);
  const [errors, setErrors] = useState<ReturnType<typeof validateInquiry>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const set = (k: keyof Inquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  const submit = (via: "email" | "whatsapp") => (e?: React.FormEvent) => {
    e?.preventDefault();
    const errs = validateInquiry(v, full);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    const msg = composeMessage(v);
    const url = via === "email"
      ? `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Project enquiry — ${v.name}`)}&body=${encodeURIComponent(msg)}`
      : `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
    setTimeout(() => {
      window.open(url, via === "email" ? "_self" : "_blank");
      setState("done");
    }, 400);
  };

  const Err = ({ k }: { k: keyof Inquiry }) => errors[k] ? <p id={`${k}-err`} className="mt-1.5 text-sm text-destructive">{errors[k]}</p> : null;
  const L = ({ k, children, opt }: { k: string; children: string; opt?: boolean }) => (
    <label htmlFor={k} className="mb-2 block text-sm font-medium">{children}{opt && <span className="text-muted-foreground"> (optional)</span>}</label>
  );
  const a = (k: keyof Inquiry) => ({ id: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  if (state === "done") {
    return (
      <div role="status" className="rounded-xl border border-primary/40 bg-card p-10">
        <h3 className="text-3xl">Almost there.</h3>
        <p className="mt-4 text-muted-foreground">
          Your message has been prepared in your email app or WhatsApp. Please press <strong className="text-foreground">send</strong> there to reach us — nothing is sent until you do.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">If nothing opened, email us directly at <a className="text-cyan underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
        <button onClick={() => { setState("idle"); setV(EMPTY); }} className="mt-8 text-sm text-cyan underline-offset-4 hover:underline">Start a new enquiry</button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit("email")} className="grid gap-6 md:grid-cols-2">
      <div><L k="name">Full name</L><input {...a("name")} className={field} value={v.name} onChange={set("name")} autoComplete="name" /><Err k="name" /></div>
      <div><L k="email">Email address</L><input {...a("email")} type="email" className={field} value={v.email} onChange={set("email")} autoComplete="email" /><Err k="email" /></div>
      {full && (
        <>
          <div><L k="company" opt>Company name</L><input id="company" className={field} value={v.company} onChange={set("company")} autoComplete="organization" /></div>
          <div>
            <L k="category">Service category</L>
            <select {...a("category")} className={field} value={v.category} onChange={set("category")}>
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => <option key={c.slug}>{c.name}</option>)}
              <option>Not sure yet</option>
            </select><Err k="category" />
          </div>
          <div>
            <L k="budget">Estimated budget</L>
            <select {...a("budget")} className={field} value={v.budget} onChange={set("budget")}>
              <option value="">Select a range</option>
              {["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"].map((o) => <option key={o}>{o}</option>)}
            </select><Err k="budget" />
          </div>
          <div>
            <L k="timeline">Desired timeline</L>
            <select {...a("timeline")} className={field} value={v.timeline} onChange={set("timeline")}>
              <option value="">Select a timeline</option>
              {["As soon as possible", "Within 1 month", "1 – 3 months", "3 – 6 months", "Flexible"].map((o) => <option key={o}>{o}</option>)}
            </select><Err k="timeline" />
          </div>
        </>
      )}
      <div className="md:col-span-2">
        <L k="description">Project description</L>
        <textarea {...a("description")} rows={6} className={field} value={v.description} onChange={set("description")} placeholder="What are you building, who is it for, and what does success look like?" />
        <Err k="description" />
      </div>
      <fieldset className="md:col-span-2">
        <legend className="mb-3 text-sm font-medium">Preferred contact method</legend>
        <div className="flex flex-wrap gap-3">
          {["Email", "Phone", "WhatsApp"].map((o) => (
            <label key={o} className={cn("cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-all", v.contact === o ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:border-foreground/40")}>
              <input type="radio" name="contact" value={o} checked={v.contact === o} onChange={set("contact")} className="sr-only" />{o}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row">
        <button type="submit" disabled={state === "sending"} className="bg-brand animate-shift inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-display font-medium text-primary-foreground shadow-glow transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
          {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} Send via email
        </button>
        <button type="button" onClick={() => submit("whatsapp")()} disabled={state === "sending"} className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/25 px-7 py-4 font-display font-medium transition-all hover:border-primary active:scale-95 disabled:opacity-60">
          <MessageCircle className="h-4 w-4" /> Send via WhatsApp
        </button>
      </div>
      <p className="text-xs text-muted-foreground md:col-span-2">Your details open in your own email app or WhatsApp — we don't store them on this site.</p>
    </form>
  );
}
