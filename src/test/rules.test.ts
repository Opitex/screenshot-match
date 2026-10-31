import { describe, expect, it } from "vitest";
import { CATEGORIES, CONTACT } from "@/lib/content";
import { validateInquiry } from "@/components/site/InquiryForm";
import { filterServices } from "@/routes/services.index";

describe("site rules", () => {
  it("has nine service categories", () => expect(CATEGORIES).toHaveLength(9));
  it("uses the agency contact details", () => {
    expect(CONTACT.email).toBe("opitexagency@gmail.com");
    expect(CONTACT.whatsapp).toBe("https://wa.me/2347075971983");
  });
  it("rejects an enquiry with a bad email", () => {
    const e = validateInquiry({ name: "Ada", email: "nope", company: "", category: "Design", description: "x".repeat(30), budget: "a", timeline: "b", contact: "Email" }, true);
    expect(e.email).toBeDefined();
  });
  it("search finds Shopify under E-commerce", () => {
    const r = filterServices("shopify", null);
    expect(r.map((c) => c.slug)).toEqual(["e-commerce"]);
  });
});
