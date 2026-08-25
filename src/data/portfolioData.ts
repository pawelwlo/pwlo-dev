export type WindowId = "projects" | "about" | "tech" | "contact" | "speed" | "leads";

export type DesktopIconItem = {
  id: WindowId;
  label: string;
  subtitle: string;
  stat: string;
};

export type ProjectTechTagId =
  | "admin-panel"
  | "team-management"
  | "live-demo"
  | "online-store"
  | "product-page"
  | "rwd"
  | "kanban-tasks"
  | "dashboard"
  | "online-booking"
  | "brand-site"
  | "seo-friendly"
  | "ai-integration"
  | "html5-canvas"
  | "pdf-generation"
  | "marketplace"
  | "job-listings"
  | "geolocation";

export type Project = {
  id: string;
  title: string;
  domain: string;
  previewUrl: string;
  screenshotSrc: string;
  description: string;
  tech: ProjectTechTagId[];
  performanceBadge: string;
  screenshotLabel: string;
  screenshotDetails: string[];
  caseStudy: {
    before: string;
    after: string;
    seo: string[];
    codeSnippet: string;
    deployment: string[];
    testimonial: string;
  };
};

export const desktopIcons: DesktopIconItem[] = [
  { id: "projects", label: "Projects", subtitle: "Case studies", stat: "06" },
  { id: "about", label: "About Me", subtitle: "Profile", stat: "01" },
  { id: "tech", label: "Tech Stack", subtitle: "Toolkit", stat: "12+" },
  { id: "contact", label: "Contact", subtitle: "Start a project", stat: "24h" },
  { id: "speed", label: "Speed Optimization", subtitle: "Audit lab", stat: "95+" },
  { id: "leads", label: "Leads", subtitle: "Protected view", stat: "ADM" },
];

export const projects: Project[] = [
  {
    id: "hotel-worker",
    title: "Hotel Worker",
    domain: "hotelworker.app",
    previewUrl: "https://hotelworker.app",
    screenshotSrc: "/hotelworker.webp",
    description:
      "Hotel operations management system. Streamlines staff scheduling, leave requests, and real-time team task coordination.",
    tech: ["admin-panel", "team-management", "live-demo"],
    performanceBadge: "Live preview",
    screenshotLabel: "App flow / Interface / Production domain",
    screenshotDetails: ["SaaS", "Hospitality", "Web App"],
    caseStudy: {
      before: "Project background available on request",
      after: "Live application preview available now",
      seo: ["Live domain ready for review", "Case study notes can be extended", "Portfolio entry supports direct preview"],
      codeSnippet: `export function openPreview(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}`,
      deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
      testimonial: "Live preview available at hotelworker.app.",
    },
  },
  {
    id: "coffee-bagus",
    title: "Coffee Bagus",
    domain: "coffeebagus.com",
    previewUrl: "https://coffeebagus.com",
    screenshotSrc: "/coffeebagus.webp",
    description:
      "Modern sales platform for an artisan coffee brand (Farm-to-Cup). Features a minimalist, responsive design and an intuitive checkout flow.",
    tech: ["online-store", "product-page", "rwd"],
    performanceBadge: "Live preview",
    screenshotLabel: "Brand experience / Pages / Production domain",
    screenshotDetails: ["E-commerce", "Branding", "UI/UX"],
    caseStudy: {
      before: "Project background available on request",
      after: "Live site preview available now",
      seo: ["Live domain ready for review", "Case study notes can be extended", "Direct preview improves portfolio flow"],
      codeSnippet: `const previewLink = {
  label: "Live Preview",
  href: "https://coffeebagus.com",
};`,
      deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
      testimonial: "Live preview available at coffeebagus.com.",
    },
  },
  {
    id: "task-tracker",
    title: "Task Tracker",
    domain: "tasktracker.pl",
    previewUrl: "https://tasktracker.pl",
    screenshotSrc: "/tasktracker.webp",
    description:
      "Project management tool for teams. Centralizes plans, deadlines, and communication to make assigning work and tracking progress easier.",
    tech: ["kanban-tasks", "dashboard", "live-demo"],
    performanceBadge: "Live preview",
    screenshotLabel: "Dashboard / Workflow / Production domain",
    screenshotDetails: ["SaaS", "Productivity", "Web App"],
    caseStudy: {
      before: "Project background available on request",
      after: "Live site preview available now",
      seo: ["Live domain ready for review", "Case study notes can be extended", "Portfolio entry supports direct preview"],
      codeSnippet: `export const domains = [
  "hotelworker.app",
  "coffeebagus.com",
  "tasktracker.pl",
  "dietanacodzien.pl",
  "magiccolouringbook.app",
  "instant-jobs.com",
];`,
      deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
      testimonial: "Live preview available at tasktracker.pl.",
    },
  },
  {
    id: "dieta-na-codzien",
    title: "Dieta Na Co Dzień",
    domain: "dietanacodzien.pl",
    previewUrl: "https://dietanacodzien.pl",
    screenshotSrc: "/dietanacodzien.webp",
    description:
      "Clear brand and offer site for a dietitian, integrated with a client panel, educational blog, and online consultation booking.",
    tech: ["online-booking", "brand-site", "seo-friendly"],
    performanceBadge: "Live preview",
    screenshotLabel: "Live domain / Landing / Content flow",
    screenshotDetails: ["Landing Page", "Health", "Services"],
    caseStudy: {
      before: "Original project details available on request",
      after: "Live production preview available now",
      seo: ["Live domain ready for review", "Case study details can be expanded", "SEO notes can be added per project"],
      codeSnippet: `export function preloadCriticalAssets() {
  document
    .querySelectorAll('img[data-priority="true"]')
    .forEach((image) => image.setAttribute("fetchpriority", "high"));
}`,
      deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
      testimonial: "Live preview available at dietanacodzien.pl.",
    },
  },
  {
    id: "magic-colouring-book",
    title: "Magic Colouring Book",
    domain: "magiccolouringbook.app",
    previewUrl: "https://magiccolouringbook.app",
    screenshotSrc: "/magicbook.webp",
    description:
      "Interactive AI-powered coloring page generator. Create unique templates from text or voice, paint in the browser, and export to print (PDF).",
    tech: ["ai-integration", "html5-canvas", "pdf-generation"],
    performanceBadge: "Live preview",
    screenshotLabel: "App preview / Flow / Interface",
    screenshotDetails: ["AI App", "Education", "Entertainment"],
    caseStudy: {
      before: "Project background available on request",
      after: "Live application preview available now",
      seo: ["Live domain ready for review", "Project notes can be customized", "Portfolio entry supports direct preview"],
      codeSnippet: `const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
});`,
      deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
      testimonial: "Live preview available at magiccolouringbook.app.",
    },
  },
  {
    id: "instant-jobs",
    title: "Instant Jobs",
    domain: "instant-jobs.com",
    previewUrl: "https://instant-jobs.com",
    screenshotSrc: "/instantjobs.webp",
    description:
      "Local marketplace connecting clients with gig workers in real time. Simple interface for posting jobs and applying.",
    tech: ["marketplace", "job-listings", "geolocation"],
    performanceBadge: "Live preview",
    screenshotLabel: "Landing / Jobs / Conversion path",
    screenshotDetails: ["Marketplace", "Recruitment", "Web App"],
    caseStudy: {
      before: "Project background available on request",
      after: "Live site preview available now",
      seo: ["Live domain ready for review", "Case study notes can be extended", "Direct preview improves portfolio flow"],
      codeSnippet: `export const imageSizes = "(min-width: 1024px) 640px, 100vw";

export const imageStyle = {
  aspectRatio: "16 / 10",
  objectFit: "cover" as const,
};`,
      deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
      testimonial: "Live preview available at instant-jobs.com.",
    },
  },
];

export const aboutSkills = [
  "Frontend (React, Next.js, Tailwind)",
  "Backend (Node.js, Express, Supabase)",
  "Performance optimization",
  "SEO & Core Web Vitals",
  "UI/UX prototyping",
];

export const techColumns = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind", "TypeScript"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Supabase", "PostgreSQL"],
  },
  {
    title: "Tools",
    items: ["Git", "Vercel", "Docker", "Figma"],
  },
  {
    title: "Specialties",
    items: ["Speed optimization", "Clean architecture", "Accessibility"],
  },
];

export const optimizationItems = [
  "Image compression",
  "Lazy loading",
  "Code splitting",
  "CDN delivery",
  "Lighthouse audits",
  "SEO structure",
];
