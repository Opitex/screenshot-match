import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export const CONTACT = {
  email: "opitexagency@gmail.com",
  phone: "+234 707 597 1983",
  phoneHref: "tel:+2347075971983",
  whatsapp: "https://wa.me/2347075971983",
};

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type RawCategory = {
  name: string;
  short: string;
  intro: string;
  problem: string;
  included: string[];
  services: [string, string][];
};

const RAW: RawCategory[] = [
  {
    name: "Design",
    short: "Interfaces, identities and visual systems that make products easy to trust and use.",
    intro: "Design is where clarity is won or lost. We shape interfaces, brands and visual systems that help people understand what you offer and act on it.",
    problem: "Inconsistent visuals and confusing interfaces quietly cost you credibility, conversions and support time.",
    included: ["Discovery workshop and audit", "Wireframes and visual concepts", "Interactive prototypes", "Production-ready files and guidelines"],
    services: [
      ["UI/UX Design", "Research-led interface design that turns complex flows into simple, confident decisions."],
      ["Website Design", "Distinctive, conversion-focused website designs built around your audience and goals."],
      ["Mobile App Design", "Native-feeling app experiences designed for thumbs, context and repeat use."],
      ["Product Design & Design Systems", "Scalable component libraries and rules that keep product teams fast and consistent."],
      ["Branding & Logo Design", "Identity systems — logo, type, colour and voice — that position you with intent."],
      ["Graphic Design — Flyers, Business Cards, Social Media", "Everyday brand assets designed to stay on-brand across print and social channels."],
      ["Presentation & Pitch Deck Design", "Investor and sales decks that structure your story and make the numbers land."],
      ["Packaging Design", "Shelf-ready packaging that communicates value at a glance and survives production."],
      ["Illustration & Icon Design", "Custom illustration and icon sets that give your product a recognisable visual language."],
    ],
  },
  {
    name: "Website & Software Development",
    short: "Fast, secure, maintainable websites and software built on modern engineering foundations.",
    intro: "We engineer websites and software that perform under real traffic, are easy for your team to manage, and are built to evolve.",
    problem: "Slow, fragile or hard-to-update software limits growth and makes every change expensive.",
    included: ["Technical scoping and architecture", "Agile development sprints", "Testing and QA", "Deployment, documentation and handover"],
    services: [
      ["Frontend Development — HTML, CSS, JavaScript, React, Next.js", "Pixel-accurate, accessible and fast frontends using modern frameworks."],
      ["Backend Development — Node.js, PHP, Python, Laravel", "Reliable APIs, databases and business logic designed for security and scale."],
      ["Full-Stack Development", "End-to-end delivery of web products by one coordinated engineering team."],
      ["CMS Development — WordPress, Webflow, Wix", "Content-managed sites your team can update confidently without a developer."],
      ["Custom Web App Development", "Tailored web applications that fit your workflows instead of forcing workarounds."],
      ["SaaS Product Development", "From MVP to scalable platform: subscriptions, multi-tenancy, dashboards and onboarding."],
      ["API Development & Integration", "Connect your tools and data so systems talk to each other without manual effort."],
      ["Website Maintenance & Support", "Updates, monitoring, backups and fixes that keep your site secure and online."],
    ],
  },
  {
    name: "Mobile App Development",
    short: "iOS, Android and cross-platform apps engineered for performance and retention.",
    intro: "We plan, design and build mobile apps that feel fast, work offline where it matters, and keep users coming back.",
    problem: "Apps that crash, lag or confuse users get uninstalled — and rarely get a second chance.",
    included: ["Product and feature scoping", "UX and UI for mobile", "Development and device testing", "App store submission and support"],
    services: [
      ["iOS App Development", "Native iOS apps built for Apple's performance and design standards."],
      ["Android App Development", "Robust Android apps that perform well across the wide range of devices."],
      ["Cross-Platform Development — Flutter, React Native", "One codebase for iOS and Android to reduce cost and time to market."],
      ["Progressive Web Apps", "Installable, offline-capable web apps that skip the app store entirely."],
      ["App Maintenance & Updates", "OS compatibility, feature releases and performance tuning after launch."],
    ],
  },
  {
    name: "E-commerce",
    short: "Online stores designed to convert browsers into buyers — and buyers into regulars.",
    intro: "We build and optimise online stores with smooth checkout, clear product presentation and the integrations your operations depend on.",
    problem: "Friction in product discovery or checkout directly translates into abandoned carts and lost revenue.",
    included: ["Store strategy and platform selection", "Theme or custom storefront build", "Payments, shipping and tax setup", "Analytics and conversion tracking"],
    services: [
      ["Shopify Development", "Custom Shopify themes, apps and setups tailored to your catalogue and brand."],
      ["WooCommerce Development", "Flexible WordPress-based stores with full control over your data."],
      ["Custom E-commerce Development", "Bespoke commerce experiences when off-the-shelf platforms can't fit."],
      ["Payment Gateway Integration", "Secure local and international payments, including Paystack, Flutterwave and Stripe."],
      ["Store Optimization & Conversion Rate Optimization", "Data-informed improvements to product pages, navigation and checkout."],
      ["Product Listing & Dropshipping Setup", "Catalogue structuring, listings and supplier integrations to launch quickly."],
    ],
  },
  {
    name: "3D, Animation & Video",
    short: "3D, motion and video that explain, sell and make audiences stop scrolling.",
    intro: "We create visuals that communicate what words can't — from product renders and architectural walkthroughs to motion graphics and edits.",
    problem: "Static or low-quality visuals make strong products look ordinary and complex ideas hard to grasp.",
    included: ["Creative brief and storyboard", "Modelling, animation or editing", "Review rounds", "Delivery in every format you need"],
    services: [
      ["3D Modeling & Rendering", "Accurate, photoreal 3D models and renders for marketing and product use."],
      ["3D Animation", "Animated sequences that bring products, characters and concepts to life."],
      ["Product Animation", "Show how a product works, assembles or looks from every angle."],
      ["Architectural Visualization & Walkthrough", "Immersive walkthroughs that help buyers experience spaces before they're built."],
      ["Interior & Exterior 3D Renders", "Realistic renders for property marketing, approvals and pre-sales."],
      ["Motion Graphics", "Branded motion for ads, social, product launches and interfaces."],
      ["Explainer Videos", "Short, clear videos that explain your offer and why it matters."],
      ["Video Editing & Post Production", "Editing, colour, sound and finishing that makes footage feel premium."],
      ["Whiteboard Animation", "Hand-drawn style animation for training, onboarding and education."],
      ["Visual Effects", "Compositing and VFX that add polish and impact to video content."],
    ],
  },
  {
    name: "Digital Marketing",
    short: "Search, social and paid strategies that bring qualified attention to your business.",
    intro: "We plan and run marketing that is measured against business outcomes — leads, sales and visibility — not vanity metrics.",
    problem: "A great product without a reliable acquisition channel stays invisible to the people who need it.",
    included: ["Audit and channel strategy", "Campaign setup and creative", "Ongoing optimisation", "Transparent reporting"],
    services: [
      ["SEO", "Technical, on-page and content SEO that builds long-term organic visibility."],
      ["Search Engine Marketing / Google Ads", "High-intent search campaigns structured for efficient cost per lead."],
      ["Social Media Marketing", "Platform-specific strategy and content that grows engaged audiences."],
      ["Social Media Management", "Consistent posting, community management and monthly reporting."],
      ["PPC Advertising", "Paid campaigns across search, social and display with clear tracking."],
      ["Content Marketing", "Useful content that builds authority and supports every stage of the funnel."],
      ["Email Marketing — Newsletters, Automation, CRM", "Lifecycle emails and automations that nurture leads and retain customers."],
      ["Influencer Marketing", "Creator partnerships selected for audience fit, not just follower count."],
      ["Affiliate Marketing", "Affiliate programmes that reward partners for driving real sales."],
      ["Online Reputation Management", "Monitor and improve how your brand appears in reviews and search."],
      ["Conversion Rate Optimization", "Testing and UX improvements that get more value from existing traffic."],
    ],
  },
  {
    name: "Content & Writing",
    short: "Clear, persuasive writing that explains your value and moves readers to act.",
    intro: "Good writing is a sales and support tool. We write content that is accurate, on-brand and built for its purpose.",
    problem: "Vague or generic copy makes even excellent offers sound interchangeable.",
    included: ["Brief and research", "Outline and tone direction", "Drafting and revisions", "SEO and formatting for publishing"],
    services: [
      ["Copywriting & Sales Copy", "Website, landing page and ad copy written to persuade and convert."],
      ["Blog Writing & Articles", "Researched articles that inform your audience and support SEO."],
      ["Technical Writing", "Documentation, guides and manuals that make complex products usable."],
      ["Scriptwriting", "Scripts for videos, ads and explainers with a clear narrative arc."],
      ["Resume & Cover Letter Writing", "Professional, tailored resumes and cover letters that present experience clearly."],
    ],
  },
  {
    name: "Data, AI & Tech",
    short: "AI, automation and data tools that remove busywork and sharpen decisions.",
    intro: "We help businesses apply AI, automation and data practically — where it saves time, reduces errors or reveals opportunities.",
    problem: "Manual processes and scattered data slow teams down and hide what's really happening in the business.",
    included: ["Process and data audit", "Solution design and prototyping", "Implementation and integration", "Training and monitoring"],
    services: [
      ["Data Analysis & Visualization", "Turn raw data into clear charts and insights your team can act on."],
      ["Business Intelligence & Dashboards", "Live dashboards that track the metrics that matter in one place."],
      ["AI Solutions", "Practical AI features — search, summarisation, classification — built into your products."],
      ["Chatbot Development", "AI assistants that answer customers, qualify leads and support staff 24/7."],
      ["Machine Learning", "Custom models for prediction, recommendation and pattern detection."],
      ["Automation — Zapier, Make", "Connect your apps and automate repetitive workflows without code."],
      ["Cloud Services — AWS, Google Cloud", "Cloud setup, migration and cost-efficient infrastructure management."],
      ["Cybersecurity Consulting", "Assess risks and harden your systems, access and data handling."],
    ],
  },
  {
    name: "Other Digital Services",
    short: "Specialist capabilities for emerging technology and digital operations.",
    intro: "From no-code builds and Web3 to AR, games and team training, we cover the specialist work that sits outside the usual agency box.",
    problem: "Specialist needs often fall between providers, leaving promising ideas stuck at the concept stage.",
    included: ["Feasibility and scoping", "Prototype or pilot", "Build and testing", "Launch and knowledge transfer"],
    services: [
      ["No-Code Development — Bubble, Webflow, Glide", "Launch functional products quickly using proven no-code platforms."],
      ["Blockchain & Web3 Development", "Smart contracts, wallets and dApps built with security in mind."],
      ["AR/VR Development", "Immersive experiences for training, retail and product visualisation."],
      ["Game Development", "Casual, educational and branded games for web and mobile."],
      ["UI Animation & Micro-interactions", "Purposeful motion that makes interfaces feel responsive and polished."],
      ["Domain & Hosting Setup", "Domains, DNS, email and hosting configured correctly from day one."],
      ["Training & Digital Skills Coaching", "Hands-on training that helps your team use digital tools confidently."],
    ],
  },
];

export type Service = { name: string; slug: string; description: string; categorySlug: string };
export type Category = Omit<RawCategory, "services"> & { slug: string; index: number; services: Service[] };

export const CATEGORIES: Category[] = RAW.map((c, i) => {
  const slug = slugify(c.name);
  return {
    ...c,
    slug,
    index: i + 1,
    services: c.services.map(([name, description]) => ({ name, description, slug: slugify(name.split(" — ")[0]), categorySlug: slug })),
  };
});

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getService = (cat: string, svc: string) => getCategory(cat)?.services.find((s) => s.slug === svc);

export const PILLARS = [
  { title: "Web Design & Development", desc: "Websites that load fast, read clearly and turn visits into enquiries.", cat: "website-and-software-development" },
  { title: "E-commerce Solutions", desc: "Stores built for discovery, trust and frictionless checkout.", cat: "e-commerce" },
  { title: "Mobile App Development", desc: "iOS, Android and cross-platform apps people keep using.", cat: "mobile-app-development" },
  { title: "AI & Automation", desc: "Practical AI and workflows that remove repetitive work.", cat: "data-ai-and-tech" },
  { title: "UI/UX & Product Design", desc: "Interfaces that make complex products feel effortless.", cat: "design" },
  { title: "Digital Marketing & SEO", desc: "Measured growth from search, social and paid channels.", cat: "digital-marketing" },
  { title: "SaaS & Software Engineering", desc: "Scalable platforms engineered from MVP to maturity.", cat: "website-and-software-development" },
  { title: "3D, Motion & Visualization", desc: "Renders, motion and video that make ideas tangible.", cat: "3d-animation-and-video" },
];

export const PROCESS = [
  { title: "Discover", desc: "Understand the business, audience, and objectives.", detail: "Stakeholder interviews, audience research and a review of what exists today." },
  { title: "Define", desc: "Establish the strategy, scope, and direction.", detail: "A clear scope, priorities, success measures and a realistic timeline." },
  { title: "Design", desc: "Create the experience and visual system.", detail: "Flows, wireframes, visual design and prototypes reviewed together." },
  { title: "Build", desc: "Develop, integrate, and test the solution.", detail: "Engineering in short sprints with regular demos and thorough QA." },
  { title: "Launch & Improve", desc: "Deploy, measure, maintain, and improve.", detail: "Careful release, analytics, support and continuous iteration." },
];

export const INDUSTRIES = [
  { name: "Startups and SaaS", desc: "MVPs, product design and growth infrastructure for teams moving fast.", needs: ["MVP scoping and build", "Product UX and onboarding", "Subscription billing", "Analytics and growth tooling"] },
  { name: "E-commerce and Retail", desc: "Storefronts, catalogue management and conversion optimisation.", needs: ["Storefront design and build", "Payments and logistics integrations", "Product photography and 3D", "Performance marketing"] },
  { name: "Real Estate and Property", desc: "Listings platforms, 3D visualisation and lead generation.", needs: ["Property listing websites", "Architectural visualisation", "Virtual walkthroughs", "Lead capture and CRM"] },
  { name: "Professional Services", desc: "Credible websites and automation for firms that sell expertise.", needs: ["Authority-building websites", "Client portals", "Booking and intake automation", "Content and SEO"] },
  { name: "Education and E-learning", desc: "Learning platforms, course apps and engaging educational media.", needs: ["LMS and course platforms", "Learning apps", "Explainer and whiteboard video", "Student onboarding flows"] },
  { name: "Technology and Digital Products", desc: "Engineering and design partnership for product companies.", needs: ["Design systems", "Frontend and API engineering", "AI feature integration", "Developer documentation"] },
].map((i) => ({ ...i, slug: slugify(i.name) }));

export const WORK_FILTERS = ["All", "Websites", "E-commerce", "Mobile Apps", "UI/UX", "Branding", "3D & Visualization", "AI & Automation"];

export const PROJECTS = [
  {
    slug: "ledgerline-finance-dashboard",
    title: "Ledgerline",
    type: "Concept project — Fintech SaaS",
    industry: "Technology and Digital Products",
    categories: ["Websites", "UI/UX", "AI & Automation"],
    services: ["Product Design", "SaaS Development", "Data Visualization"],
    summary: "A concept analytics dashboard exploring how small businesses could understand cash flow at a glance.",
    image: work1,
    challenge: "Financial data is often dense and intimidating for non-specialists, which leads to delayed or poor decisions.",
    strategy: "Prioritise the three questions owners ask most — what came in, what went out, what's next — and design every view around them.",
    design: "A dark, calm interface with a restrained palette, large numerals and progressive disclosure for detail.",
    development: "Planned as a React frontend with a typed API layer, real-time charts and role-based access.",
    deliverables: ["UX flows", "Design system", "Interactive prototype", "Frontend architecture plan"],
  },
  {
    slug: "aurelle-skincare-store",
    title: "Aurelle",
    type: "Concept project — Beauty e-commerce",
    industry: "E-commerce and Retail",
    categories: ["E-commerce", "Branding", "3D & Visualization"],
    services: ["Shopify Development", "Brand Identity", "3D Product Renders"],
    summary: "A concept premium skincare storefront pairing editorial art direction with a fast, simple checkout.",
    image: work2,
    challenge: "Premium beauty brands need to feel luxurious online without slowing down the path to purchase.",
    strategy: "Lead with product ritual storytelling, then reduce every product page to one clear decision.",
    design: "Sculptural 3D product renders, generous whitespace and a refined serif-free type system.",
    development: "Planned on Shopify with a custom theme, local payment gateways and optimised media delivery.",
    deliverables: ["Brand direction", "Storefront design", "3D render set", "Shopify theme plan"],
  },
  {
    slug: "cliffside-villa-visualization",
    title: "Cliffside Villa",
    type: "Concept project — Architectural visualization",
    industry: "Real Estate and Property",
    categories: ["3D & Visualization"],
    services: ["Architectural Visualization", "Exterior Renders", "Walkthrough Animation"],
    summary: "A concept visualisation study showing how pre-sales property can be presented with atmosphere and accuracy.",
    image: work3,
    challenge: "Buyers struggle to commit to off-plan property they can't picture.",
    strategy: "Use time-of-day lighting and a guided walkthrough to communicate lifestyle as well as layout.",
    design: "Blue-hour exterior lighting, warm interior glow and a camera path following natural movement.",
    development: "Produced as a high-resolution render set with an animated walkthrough sequence.",
    deliverables: ["Exterior renders", "Interior renders", "Walkthrough storyboard"],
  },
  {
    slug: "lumen-learning-app",
    title: "Lumen",
    type: "Concept project — E-learning mobile app",
    industry: "Education and E-learning",
    categories: ["Mobile Apps", "UI/UX"],
    services: ["Mobile App Design", "Cross-Platform Development", "UI Animation"],
    summary: "A concept learning app designed around short daily lessons and visible progress.",
    image: work4,
    challenge: "Learners drop off when courses feel long and progress feels invisible.",
    strategy: "Break content into short sessions and make progress the centrepiece of the interface.",
    design: "A dark, focused interface with soft glow accents and satisfying micro-interactions.",
    development: "Planned in React Native with offline lesson caching and push reminders.",
    deliverables: ["User journeys", "Mobile UI kit", "Prototype", "Technical plan"],
  },
];

export const ARTICLES = [
  {
    slug: "choosing-a-tech-stack-for-your-mvp",
    title: "Choosing a Tech Stack for Your MVP",
    category: "Engineering",
    excerpt: "How to pick tools that get you to market quickly without boxing you in later.",
    readTime: "6 min read",
    body: [
      "The right stack for an MVP is the one that lets you learn fastest. That usually means proven frameworks, managed infrastructure and as little custom plumbing as possible.",
      "Start from your riskiest assumption. If it's whether users want the product, optimise for speed of iteration. If it's whether the system can handle a technical challenge, prototype that part first.",
      "Choose tools your team — or your agency — knows well. Familiarity reduces bugs and speeds up delivery more than any new framework will.",
      "Finally, plan the seams: keep business logic separate from the UI and data access behind clear interfaces, so you can replace parts as you scale.",
    ],
  },
  {
    slug: "practical-ai-for-small-businesses",
    title: "Practical AI for Small Businesses",
    category: "AI & Automation",
    excerpt: "Where AI genuinely saves time today — and where it's still better to wait.",
    readTime: "5 min read",
    body: [
      "The best early AI wins are boring: drafting replies, summarising documents, classifying enquiries and extracting data from forms.",
      "Begin with one repetitive task that costs your team hours every week. Measure it, automate it, and compare the results honestly.",
      "Keep a human in the loop for anything customer-facing or financial until you trust the outputs.",
      "Treat data privacy as a first-class requirement: know where your data goes and what each tool retains.",
    ],
  },
  {
    slug: "what-makes-a-website-convert",
    title: "What Makes a Website Convert",
    category: "Design",
    excerpt: "Clarity, speed and trust matter more than any visual trend.",
    readTime: "4 min read",
    body: [
      "Visitors decide within seconds whether a site is relevant. A clear headline that states who you help and how beats clever wordplay.",
      "Speed is a design feature. Every extra second of loading time increases the chance someone leaves.",
      "Trust comes from specifics: real work, clear pricing signals, easy contact options and honest claims.",
      "Finally, make the next step obvious. One primary action per page, repeated where it makes sense.",
    ],
  },
];

export const FAQS = [
  { q: "What kinds of projects do you take on?", a: "We work across design, websites and software, mobile apps, e-commerce, 3D and video, marketing, content and AI. If it's digital and it moves a business forward, we're happy to talk." },
  { q: "How do you price projects?", a: "Pricing depends on scope, complexity and timeline. After an initial conversation we provide a clear proposal with deliverables and costs before any work begins." },
  { q: "How long does a typical project take?", a: "Small websites can take a few weeks; larger platforms and apps take longer. We agree a realistic timeline during the Define stage." },
  { q: "Do you work with clients outside Nigeria?", a: "Yes. We collaborate remotely and adapt communication to your time zone." },
  { q: "Will I own the final work?", a: "Yes. Once the project is paid in full, you own the agreed deliverables, source files and code." },
  { q: "Do you offer support after launch?", a: "Yes. We offer maintenance and support arrangements for websites, apps and campaigns." },
];
