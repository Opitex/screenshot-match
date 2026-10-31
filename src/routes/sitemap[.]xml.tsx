import { createFileRoute } from "@tanstack/react-router";
import { ARTICLES, CATEGORIES, INDUSTRIES, PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "/", "/services", "/work", "/about", "/process", "/industries", "/insights", "/contact", "/start-a-project", "/faq",
          "/privacy-policy", "/terms-of-service", "/cookie-policy",
          ...CATEGORIES.flatMap((c) => [`/services/${c.slug}`, ...c.services.map((s) => `/services/${c.slug}/${s.slug}`)]),
          ...PROJECTS.map((p) => `/work/${p.slug}`),
          ...INDUSTRIES.map((i) => `/industries/${i.slug}`),
          ...ARTICLES.map((a) => `/insights/${a.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${origin}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
