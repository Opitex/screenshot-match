import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/site/Legal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy")({
  head: () => seo("Cookie Policy", "How the Opitex Agency website uses cookies and similar technologies."),
  component: () => (
    <Legal title="Cookie Policy" sections={[
      ["What are cookies", "Cookies are small files stored by your browser that help websites function and remember preferences."],
      ["Cookies we use", "This website uses only what is technically necessary to load and display pages. We do not currently use advertising cookies."],
      ["Managing cookies", "You can block or delete cookies in your browser settings at any time."],
    ]} />
  ),
});
