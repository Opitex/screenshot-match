import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/site/Legal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms-of-service")({
  head: () => seo("Terms of Service", "Terms governing the use of the Opitex Agency website."),
  component: () => (
    <Legal title="Terms of Service" sections={[
      ["Use of this website", "Content on this site is provided for general information about Opitex Agency and its services."],
      ["Projects and engagements", "Client projects are governed by a separate written proposal or agreement that sets out scope, fees and timelines."],
      ["Intellectual property", "Site content, branding and concept work shown here belong to Opitex Agency unless stated otherwise."],
      ["Liability", "We aim to keep information accurate but do not guarantee it is complete or current."],
    ]} />
  ),
});
