import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/site/Legal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => seo("Privacy Policy", "How Opitex Agency handles personal information shared through this website."),
  component: () => (
    <Legal title="Privacy Policy" sections={[
      ["Information we receive", "This website does not store enquiry form data. When you use the form, your message is opened in your own email app or WhatsApp, and we receive only what you choose to send."],
      ["How we use it", "We use the information you send to respond to your enquiry and, if you become a client, to deliver our services."],
      ["Sharing", "We do not sell personal information. We may share it with service providers only where needed to deliver work you've requested."],
      ["Your rights", "You can ask us to access, correct or delete personal information we hold about you."],
    ]} />
  ),
});
