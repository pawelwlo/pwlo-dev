export type WindowId = "projects" | "about" | "tech" | "contact" | "speed" | "leads";

export type DesktopIconItem = {
  id: WindowId;
  label: string;
  subtitle: string;
  stat: string;
};

export type Project = {
  id: string;
  title: string;
  domain: string;
  previewUrl: string;
  description: string;
  tech: string[];
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
    id: "dieta-na-codzien",
    title: "Dieta Na Codzien",
    domain: "dietanacodzien.pl",
    previewUrl: "https://dietanacodzien.pl",
    description: "Nutrition-focused production website presented as a live portfolio project preview.",
    tech: ["Production site", "Live domain", "Responsive UI"],
    performanceBadge: "Live preview",
    screenshotLabel: "Live domain / Landing / Content flow",
    screenshotDetails: ["Production", "Responsive", "Preview"],
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
    description: "Interactive app project listed with a direct live preview for fast portfolio browsing.",
    tech: ["Web app", "Interactive UI", "Live domain"],
    performanceBadge: "Live preview",
    screenshotLabel: "App preview / Flow / Interface",
    screenshotDetails: ["Production", "App", "Preview"],
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
    description: "Job-focused live project entry with direct access to the production domain.",
    tech: ["Platform", "Live domain", "Responsive UI"],
    performanceBadge: "Live preview",
    screenshotLabel: "Landing / Jobs / Conversion path",
    screenshotDetails: ["Production", "Platform", "Preview"],
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
  {
    id: "hotel-worker",
    title: "Hotel Worker",
    domain: "hotelworker.app",
    previewUrl: "https://hotelworker.app",
    description: "Hospitality-focused app entry added with a clean live preview link.",
    tech: ["Web app", "Live domain", "Production preview"],
    performanceBadge: "Live preview",
    screenshotLabel: "App flow / Interface / Production domain",
    screenshotDetails: ["Production", "Hospitality", "Preview"],
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
    description: "Brand site portfolio entry with a direct preview to the live domain.",
    tech: ["Brand site", "Live domain", "Responsive UI"],
    performanceBadge: "Live preview",
    screenshotLabel: "Brand experience / Pages / Production domain",
    screenshotDetails: ["Production", "Brand", "Preview"],
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
    description: "Productivity project card linked directly to the production preview.",
    tech: ["Productivity app", "Live domain", "Production preview"],
    performanceBadge: "Live preview",
    screenshotLabel: "Dashboard / Workflow / Production domain",
    screenshotDetails: ["Production", "App", "Preview"],
    caseStudy: {
      before: "Project background available on request",
      after: "Live site preview available now",
      seo: ["Live domain ready for review", "Case study notes can be extended", "Portfolio entry supports direct preview"],
      codeSnippet: `export const domains = [
  "dietanacodzien.pl",
  "magiccolouringbook.app",
  "instant-jobs.com",
  "hotelworker.app",
  "coffeebagus.com",
  "tasktracker.pl",
];`,
      deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
      testimonial: "Live preview available at tasktracker.pl.",
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
