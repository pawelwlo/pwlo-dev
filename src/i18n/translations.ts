import type { WindowId } from "@/data/portfolioData";

export type Locale = "en" | "pl" | "de";

type LocaleOption = {
  value: Locale;
  label: string;
};

type ProjectTranslation = {
  title: string;
  description: string;
  performanceBadge: string;
  screenshotDetails: string[];
  caseStudy: {
    before: string;
    after: string;
    seo: string[];
    deployment: string[];
    testimonial: string;
  };
};

export type Copy = {
  localeLabel: string;
  themeLight: string;
  themeDark: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroModules: string[];
  viewProjects: string;
  contactMe: string;
  speedPanelLabel: string;
  speedPanelTitle: string;
  performance: string;
  seo: string;
  bestPractices: string;
  loadsUnderSecond: string;
  coreWebVitals: string;
  statusBar: {
    localTime: string;
    os: string;
    performance: string;
    online: string;
  };
  desktop: {
    eyebrow: string;
    title: string;
  };
  footer: {
    builtWith: string;
  };
  compactLayout: {
    menu: string;
    closeMenu: string;
    sections: {
      projects: string;
      openSource: string;
      seo: string;
      contact: string;
    };
    projectsEyebrow: string;
    projectsTitle: string;
    openSourceEyebrow: string;
    openSourceTitle: string;
    openSourceSubtitle: string;
    seoEyebrow: string;
    seoTitle: string;
    seoSubtitle: string;
  };
  osLayout: {
    mobileTitle: string;
    tabletTitle: string;
    back: string;
    settings: string;
    lockscreen: {
      title: string;
      message: string;
      welcome: string;
      consentAriaLabel: string;
      cookiesConsent: string;
      termsConsent: string;
      accept: string;
      moreInfo: string;
      infoDetail: string;
    };
    dock: {
      projects: string;
      contact: string;
      seo: string;
      openSource: string;
    };
    apps: {
      projects: string;
      openSource: string;
      seo: string;
      contact: string;
      tech: string;
      about: string;
      leads: string;
      settings: string;
    };
  };
  windowTitles: Record<WindowId, string>;
  desktopIcons: Record<WindowId, { label: string; subtitle: string }>;
  projects: {
    eyebrow: string;
    title: string;
    openProjectAction: string;
    openCaseStudy: string;
    caseStudy: string;
    before: string;
    after: string;
    seoImprovements: string;
    deploymentStack: string;
    codeSnippet: string;
    clientTestimonial: string;
  };
  about: {
    eyebrow: string;
    title: string;
    name: string;
    role: string;
    location: string;
    photoPlaceholder: string;
    bio: string[];
    resumeAction: string;
  };
  techStack: {
    eyebrow: string;
    title: string;
    columns: Array<{ title: string; items: Array<{ name: string; purpose: string; projectsCount?: number }> }>;
  };
  speed: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
    cta: string;
    ctaSubject: string;
    scoreLabel: string;
    scoreValue: string;
    domain: string;
    domainPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendRequest: string;
    sendingRequest: string;
    submitSuccess: string;
    submitError: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    name: string;
    namePlaceholder: string;
    email: string;
    projectType: string;
    projectTypePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendInquiry: string;
    sendingInquiry: string;
    submitSuccess: string;
    submitError: string;
    missingConfig: string;
    inquirySubjectSuffix: string;
    mailLabels: {
      name: string;
      email: string;
      message: string;
    };
  };
  leads: {
    eyebrow: string;
    title: string;
    description: string;
    adminKeyLabel: string;
    adminKeyPlaceholder: string;
    loadLeads: string;
    loadLeadsAction: string;
    loading: string;
    empty: string;
    unauthorized: string;
    alertSent: string;
    alertPending: string;
    spam: string;
    clean: string;
    email: string;
    projectType: string;
    locale: string;
    submittedAt: string;
    message: string;
  };
  windowControls: {
    drag: (title: string) => string;
    minimize: string;
    maximize: string;
    restore: string;
    close: (title: string) => string;
    resize: (title: string) => string;
  };
  bootMessages: {
    system: string;
    themeDark: string;
    themeLight: string;
    langEn: string;
    langPl: string;
    langDe: string;
  };
};

export const localeOptions: LocaleOption[] = [
  { value: "en", label: "EN" },
  { value: "pl", label: "PL" },
  { value: "de", label: "DE" },
];

const projectTranslations: Record<Locale, Record<string, ProjectTranslation>> = {
  en: {
    "dieta-na-codzien": {
      title: "Dieta Na Codzien",
      description: "Nutrition-focused production website presented as a live portfolio project preview.",
      performanceBadge: "Live preview",
      screenshotDetails: ["Production", "Responsive", "Preview"],
      caseStudy: {
        before: "Original project details available on request",
        after: "Live production preview available now",
        seo: [
          "Live domain ready for review",
          "Case study details can be expanded",
          "SEO notes can be added per project",
        ],
        deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
        testimonial: "Live preview available at dietanacodzien.pl.",
      },
    },
    "magic-colouring-book": {
      title: "Magic Colouring Book",
      description: "Interactive app project listed with a direct live preview for fast portfolio browsing.",
      performanceBadge: "Live preview",
      screenshotDetails: ["Production", "App", "Preview"],
      caseStudy: {
        before: "Project background available on request",
        after: "Live application preview available now",
        seo: [
          "Live domain ready for review",
          "Project notes can be customized",
          "Portfolio entry supports direct preview",
        ],
        deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
        testimonial: "Live preview available at magiccolouringbook.app.",
      },
    },
    "instant-jobs": {
      title: "Instant Jobs",
      description: "Job-focused live project entry with direct access to the production domain.",
      performanceBadge: "Live preview",
      screenshotDetails: ["Production", "Platform", "Preview"],
      caseStudy: {
        before: "Project background available on request",
        after: "Live site preview available now",
        seo: [
          "Live domain ready for review",
          "Case study notes can be extended",
          "Direct preview improves portfolio flow",
        ],
        deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
        testimonial: "Live preview available at instant-jobs.com.",
      },
    },
    "hotel-worker": {
      title: "Hotel Worker",
      description: "Hospitality-focused app entry added with a clean live preview link.",
      performanceBadge: "Live preview",
      screenshotDetails: ["Production", "Hospitality", "Preview"],
      caseStudy: {
        before: "Project background available on request",
        after: "Live application preview available now",
        seo: [
          "Live domain ready for review",
          "Case study notes can be extended",
          "Portfolio entry supports direct preview",
        ],
        deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
        testimonial: "Live preview available at hotelworker.app.",
      },
    },
    "coffee-bagus": {
      title: "Coffee Bagus",
      description: "Brand site portfolio entry with a direct preview to the live domain.",
      performanceBadge: "Live preview",
      screenshotDetails: ["Production", "Brand", "Preview"],
      caseStudy: {
        before: "Project background available on request",
        after: "Live site preview available now",
        seo: [
          "Live domain ready for review",
          "Case study notes can be extended",
          "Direct preview improves portfolio flow",
        ],
        deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
        testimonial: "Live preview available at coffeebagus.com.",
      },
    },
    "task-tracker": {
      title: "Task Tracker",
      description: "Productivity project card linked directly to the production preview.",
      performanceBadge: "Live preview",
      screenshotDetails: ["Production", "App", "Preview"],
      caseStudy: {
        before: "Project background available on request",
        after: "Live site preview available now",
        seo: [
          "Live domain ready for review",
          "Case study notes can be extended",
          "Portfolio entry supports direct preview",
        ],
        deployment: ["Live production domain", "External preview link", "Portfolio case study entry"],
        testimonial: "Live preview available at tasktracker.pl.",
      },
    },
  },
  pl: {
    "dieta-na-codzien": {
      title: "Dieta Na Codzien",
      description: "Serwis dietetyczny pokazany w portfolio jako produkcyjny projekt z podgladem na zywo.",
      performanceBadge: "Podglad na zywo",
      screenshotDetails: ["Produkcja", "Responsywny", "Podglad"],
      caseStudy: {
        before: "Szczegoly wyjsciowe projektu dostepne na zyczenie",
        after: "Podglad produkcyjny jest juz dostepny",
        seo: [
          "Domena na zywo gotowa do oceny",
          "Opis case study mozna rozbudowac",
          "Notatki SEO mozna dopasowac do projektu",
        ],
        deployment: ["Domena produkcyjna", "Zewnetrzny link podgladu", "Wpis case study w portfolio"],
        testimonial: "Podglad na zywo jest dostepny pod adresem dietanacodzien.pl.",
      },
    },
    "magic-colouring-book": {
      title: "Magic Colouring Book",
      description: "Interaktywna aplikacja z bezposrednim podgladem na zywo dla szybkiego przegladania portfolio.",
      performanceBadge: "Podglad na zywo",
      screenshotDetails: ["Produkcja", "Aplikacja", "Podglad"],
      caseStudy: {
        before: "Tlo projektu dostepne na zyczenie",
        after: "Podglad aplikacji jest juz dostepny",
        seo: [
          "Domena na zywo gotowa do oceny",
          "Notatki do projektu mozna dopasowac",
          "Wpis w portfolio wspiera bezposredni podglad",
        ],
        deployment: ["Domena produkcyjna", "Zewnetrzny link podgladu", "Wpis case study w portfolio"],
        testimonial: "Podglad na zywo jest dostepny pod adresem magiccolouringbook.app.",
      },
    },
    "instant-jobs": {
      title: "Instant Jobs",
      description: "Projekt z obszaru pracy z bezposrednim dostepem do produkcyjnej domeny.",
      performanceBadge: "Podglad na zywo",
      screenshotDetails: ["Produkcja", "Platforma", "Podglad"],
      caseStudy: {
        before: "Tlo projektu dostepne na zyczenie",
        after: "Podglad strony jest juz dostepny",
        seo: [
          "Domena na zywo gotowa do oceny",
          "Notatki case study mozna rozszerzyc",
          "Bezposredni podglad poprawia przeplyw portfolio",
        ],
        deployment: ["Domena produkcyjna", "Zewnetrzny link podgladu", "Wpis case study w portfolio"],
        testimonial: "Podglad na zywo jest dostepny pod adresem instant-jobs.com.",
      },
    },
    "hotel-worker": {
      title: "Hotel Worker",
      description: "Aplikacja dla branzy hospitality z czystym linkiem do podgladu na zywo.",
      performanceBadge: "Podglad na zywo",
      screenshotDetails: ["Produkcja", "Hospitality", "Podglad"],
      caseStudy: {
        before: "Tlo projektu dostepne na zyczenie",
        after: "Podglad aplikacji jest juz dostepny",
        seo: [
          "Domena na zywo gotowa do oceny",
          "Notatki case study mozna rozszerzyc",
          "Wpis w portfolio wspiera bezposredni podglad",
        ],
        deployment: ["Domena produkcyjna", "Zewnetrzny link podgladu", "Wpis case study w portfolio"],
        testimonial: "Podglad na zywo jest dostepny pod adresem hotelworker.app.",
      },
    },
    "coffee-bagus": {
      title: "Coffee Bagus",
      description: "Projekt marki z bezposrednim podgladem do domeny na zywo.",
      performanceBadge: "Podglad na zywo",
      screenshotDetails: ["Produkcja", "Marka", "Podglad"],
      caseStudy: {
        before: "Tlo projektu dostepne na zyczenie",
        after: "Podglad strony jest juz dostepny",
        seo: [
          "Domena na zywo gotowa do oceny",
          "Notatki case study mozna rozszerzyc",
          "Bezposredni podglad poprawia przeplyw portfolio",
        ],
        deployment: ["Domena produkcyjna", "Zewnetrzny link podgladu", "Wpis case study w portfolio"],
        testimonial: "Podglad na zywo jest dostepny pod adresem coffeebagus.com.",
      },
    },
    "task-tracker": {
      title: "Task Tracker",
      description: "Projekt produktywnosci polaczony bezposrednio z produkcyjnym podgladem.",
      performanceBadge: "Podglad na zywo",
      screenshotDetails: ["Produkcja", "Aplikacja", "Podglad"],
      caseStudy: {
        before: "Tlo projektu dostepne na zyczenie",
        after: "Podglad strony jest juz dostepny",
        seo: [
          "Domena na zywo gotowa do oceny",
          "Notatki case study mozna rozszerzyc",
          "Wpis w portfolio wspiera bezposredni podglad",
        ],
        deployment: ["Domena produkcyjna", "Zewnetrzny link podgladu", "Wpis case study w portfolio"],
        testimonial: "Podglad na zywo jest dostepny pod adresem tasktracker.pl.",
      },
    },
  },
  de: {
    "dieta-na-codzien": {
      title: "Dieta Na Codzien",
      description: "Ernaehrungsorientierte Website, im Portfolio als Live-Vorschau eines Produktivprojekts gezeigt.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["Produktion", "Responsiv", "Vorschau"],
      caseStudy: {
        before: "Urspruengliche Projektdetails auf Anfrage verfuegbar",
        after: "Die Produktivvorschau ist jetzt verfuegbar",
        seo: [
          "Live-Domain bereit zur Pruefung",
          "Case-Study-Details koennen erweitert werden",
          "SEO-Notizen koennen je Projekt ergaenzt werden",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfuegbar unter dietanacodzien.pl.",
      },
    },
    "magic-colouring-book": {
      title: "Magic Colouring Book",
      description: "Interaktive App mit direkter Live-Vorschau fuer schnelles Portfolio-Browsing.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["Produktion", "App", "Vorschau"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfuegbar",
        after: "Die App-Vorschau ist jetzt verfuegbar",
        seo: [
          "Live-Domain bereit zur Pruefung",
          "Projektnotizen koennen angepasst werden",
          "Portfolio-Eintrag unterstuetzt direkte Vorschau",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfuegbar unter magiccolouringbook.app.",
      },
    },
    "instant-jobs": {
      title: "Instant Jobs",
      description: "Job-Plattform mit direktem Zugriff auf die Produktivdomain.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["Produktion", "Plattform", "Vorschau"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfuegbar",
        after: "Die Seitenvorschau ist jetzt verfuegbar",
        seo: [
          "Live-Domain bereit zur Pruefung",
          "Case-Study-Notizen koennen erweitert werden",
          "Direkte Vorschau verbessert den Portfolio-Flow",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfuegbar unter instant-jobs.com.",
      },
    },
    "hotel-worker": {
      title: "Hotel Worker",
      description: "Hospitality-App mit sauber integriertem Live-Vorschau-Link.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["Produktion", "Hospitality", "Vorschau"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfuegbar",
        after: "Die App-Vorschau ist jetzt verfuegbar",
        seo: [
          "Live-Domain bereit zur Pruefung",
          "Case-Study-Notizen koennen erweitert werden",
          "Portfolio-Eintrag unterstuetzt direkte Vorschau",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfuegbar unter hotelworker.app.",
      },
    },
    "coffee-bagus": {
      title: "Coffee Bagus",
      description: "Brand-Website mit direkter Vorschau auf die Live-Domain.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["Produktion", "Brand", "Vorschau"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfuegbar",
        after: "Die Seitenvorschau ist jetzt verfuegbar",
        seo: [
          "Live-Domain bereit zur Pruefung",
          "Case-Study-Notizen koennen erweitert werden",
          "Direkte Vorschau verbessert den Portfolio-Flow",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfuegbar unter coffeebagus.com.",
      },
    },
    "task-tracker": {
      title: "Task Tracker",
      description: "Produktivitaetsprojekt mit direkter Verlinkung zur Produktivvorschau.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["Produktion", "App", "Vorschau"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfuegbar",
        after: "Die Seitenvorschau ist jetzt verfuegbar",
        seo: [
          "Live-Domain bereit zur Pruefung",
          "Case-Study-Notizen koennen erweitert werden",
          "Portfolio-Eintrag unterstuetzt direkte Vorschau",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfuegbar unter tasktracker.pl.",
      },
    },
  },
};

export const copyByLocale: Record<Locale, Copy> = {
  en: {
    localeLabel: "Language",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    heroEyebrow: "Desktop workspace",
    heroTitle: "pwloOS System Overview",
    heroSubtitle: "System metrics, modules, and workspace access.",
    heroModules: ["Projects", "Tech Stack", "Speed", "Leads", "Contact"],
    viewProjects: "Open Projects",
    contactMe: "Open Contact",
    speedPanelLabel: "Live speed panel",
    speedPanelTitle: "Precision tuned for Lighthouse and Core Web Vitals.",
    performance: "Performance",
    seo: "SEO",
    bestPractices: "Best Practices",
    loadsUnderSecond: "Loads in under 1 second",
    coreWebVitals: "Optimized for Core Web Vitals",
    statusBar: {
      localTime: "Local time",
      os: "pwloOS v1.0",
      performance: "Performance: 100",
      online: "Status: Online",
    },
    desktop: {
      eyebrow: "Desktop",
      title: "Open modules, inspect work, move through the system.",
    },
    footer: {
      builtWith: "Built with love and performance",
    },
    compactLayout: {
      menu: "Menu",
      closeMenu: "Close menu",
      sections: {
        projects: "Projects",
        openSource: "Open Source",
        seo: "SEO & Speed",
        contact: "Contact",
      },
      projectsEyebrow: "Selected work",
      projectsTitle: "iOS-style project snapshots",
      openSourceEyebrow: "Open source stack",
      openSourceTitle: "Tools I ship with",
      openSourceSubtitle: "A curated toolkit for fast, maintainable builds.",
      seoEyebrow: "SEO and performance",
      seoTitle: "Readable, fast, conversion-focused pages.",
      seoSubtitle: "Clean structure, fast rendering, and measurable outcomes on every screen.",
    },
    osLayout: {
      mobileTitle: "pwloOS Mobile",
      tabletTitle: "pwloOS Tablet",
      back: "Back",
      settings: "Settings",
      lockscreen: {
        title: "pwloOS Privacy Notice",
        message: "We use minimal cookies required for system functionality.",
        welcome: "Welcome to pwloOS\n\nA modern web developer workspace\n\nDesigned by\nPawel Wlodarczyk",
        consentAriaLabel: "Privacy consents",
        cookiesConsent: "I accept essential cookies required for system functionality.",
        termsConsent: "I accept the terms of use.",
        accept: "Accept",
        moreInfo: "More info",
        infoDetail: "This preference is stored locally on your device so the privacy notice does not reappear on every visit.",
      },
      dock: {
        projects: "Projects",
        contact: "Contact",
        seo: "SEO & Speed",
        openSource: "Open Source",
      },
      apps: {
        projects: "Projects",
        openSource: "Open Source",
        seo: "SEO & Speed",
        contact: "Contact",
        tech: "Tech Stack",
        about: "About Me",
        leads: "Leads",
        settings: "Settings",
      },
    },
    windowTitles: {
      projects: "Projects",
      about: "About me",
      tech: "Tech Stack",
      contact: "Contact",
      speed: "SEO & Speed",
      leads: "Leads",
    },
    desktopIcons: {
      projects: { label: "Projects", subtitle: "Case studies" },
      about: { label: "About Me", subtitle: "Profile" },
      tech: { label: "Tech Stack", subtitle: "Toolkit" },
      contact: { label: "Contact", subtitle: "Start a project" },
      speed: { label: "SEO & Speed", subtitle: "Audit lab" },
      leads: { label: "Leads", subtitle: "Protected view" },
    },
    projects: {
      eyebrow: "PROJECTS",
      title: "Your latest builds, shipped fast.",
      openProjectAction: "Open project",
      openCaseStudy: "Open Case Study",
      caseStudy: "Case study",
      before: "Before",
      after: "After",
      seoImprovements: "SEO improvements",
      deploymentStack: "Deployment stack",
      codeSnippet: "Code snippet",
      clientTestimonial: "Client testimonial",
    },
    about: {
      eyebrow: "ABOUT ME",
      title: "I build fast, modern web experiences.",
      name: "Pawel Wlodarczyk",
      role: "Web developer · UI/UX · Performance-focused",
      location: "Germany · Available for freelance",
      photoPlaceholder: "Photo placeholder",
      bio: [
        "I specialize in building scalable, performance-driven web applications.",
        "My workflow prioritizes clean architecture and minimal dependencies to ship fast.",
        "I prefer working with React, Next.js, Node.js, and Supabase for robust solutions."
      ],
      resumeAction: "View resume",
    },
    techStack: {
      eyebrow: "TECH STACK",
      title: "Tools I use to build fast.",
      columns: [
        { title: "Frontend", items: [
          { name: "React", purpose: "UI component library", projectsCount: 12 },
          { name: "Next.js", purpose: "React framework for production", projectsCount: 8 },
          { name: "Tailwind CSS", purpose: "Utility-first styling", projectsCount: 15 },
          { name: "TypeScript", purpose: "Static typing for JS", projectsCount: 18 }
        ]},
        { title: "Backend", items: [
          { name: "Node.js", purpose: "JavaScript runtime", projectsCount: 14 },
          { name: "Express", purpose: "Web framework for Node.js", projectsCount: 10 },
          { name: "Supabase", purpose: "Open source Firebase alternative", projectsCount: 6 },
          { name: "PostgreSQL", purpose: "Relational database", projectsCount: 12 }
        ]},
        { title: "UI/UX", items: [
          { name: "Figma", purpose: "Design and prototyping", projectsCount: 20 },
          { name: "Framer Motion", purpose: "Animation library", projectsCount: 5 }
        ]},
        { title: "Deployment", items: [
          { name: "Vercel", purpose: "Frontend hosting", projectsCount: 15 },
          { name: "Docker", purpose: "Containerization", projectsCount: 8 }
        ]},
        { title: "Performance", items: [
          { name: "Lighthouse", purpose: "Performance auditing", projectsCount: 20 },
          { name: "Web Vitals", purpose: "Core metrics tracking", projectsCount: 18 }
        ]},
        { title: "Analytics", items: [
          { name: "Plausible", purpose: "Privacy-friendly analytics", projectsCount: 4 },
          { name: "PostHog", purpose: "Product analytics", projectsCount: 2 }
        ]}
      ],
    },
    speed: {
      eyebrow: "SEO & SPEED",
      title: "Performance matters.",
      description: "Fast sites convert better, rank better, and feel more trustworthy. Every layer is designed for clarity, low overhead, and measurable outcomes.",
      items: ["Image compression", "Lazy loading", "Code splitting", "CDN delivery", "Lighthouse audits", "SEO structure"],
      cta: "Ask for Audit",
      ctaSubject: "Speed audit",
      scoreLabel: "Lighthouse Score",
      scoreValue: "100",
      domain: "Domain",
      domainPlaceholder: "yoursite.com",
      email: "Email",
      emailPlaceholder: "you@example.com",
      message: "Message",
      messagePlaceholder: "Optional message or specific concerns",
      sendRequest: "Send request",
      sendingRequest: "Sending...",
      submitSuccess: "Request sent successfully. I'll be in touch soon.",
      submitError: "Something went wrong. Please try again.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s build something fast.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      projectType: "Project Type",
      projectTypePlaceholder: "Landing page, redesign, app...",
      message: "Message",
      messagePlaceholder: "Tell me what you need.",
      sendInquiry: "Send inquiry",
      sendingInquiry: "Sending...",
      submitSuccess: "Inquiry sent successfully.",
      submitError: "Something went wrong. Please try again.",
      missingConfig: "Supabase is not configured yet.",
      inquirySubjectSuffix: "enquiry",
      mailLabels: {
        name: "Name",
        email: "Email",
        message: "Message",
      },
    },
    leads: {
      eyebrow: "PROTECTED LEADS",
      title: "Latest inquiries",
      description: "Load recent contact submissions with an admin key.\nThis window stays private behind an Edge Function check.",
      adminKeyLabel: "Admin key",
      adminKeyPlaceholder: "Enter your admin key",
      loadLeads: "Load leads",
      loadLeadsAction: "Load leads",
      loading: "Loading...",
      empty: "No submissions yet.",
      unauthorized: "Admin key is invalid.",
      alertSent: "Alert sent",
      alertPending: "Alert pending",
      spam: "Spam",
      clean: "Clean",
      email: "Email",
      projectType: "Project type",
      locale: "Locale",
      submittedAt: "Submitted",
      message: "Message",
    },
    windowControls: {
      drag: (title) => `Drag ${title}`,
      minimize: "Minimize window",
      maximize: "Maximize window",
      restore: "Restore window",
      close: (title) => `Close ${title}`,
      resize: (title) => `Resize ${title}`,
    },
    bootMessages: {
      system: "loading pwloOS",
      themeDark: "loading dark mode",
      themeLight: "loading light mode",
      langEn: "loading english version",
      langPl: "loading polish version",
      langDe: "loading german version",
    },
  },
  pl: {
    localeLabel: "Jezyk",
    themeLight: "Tryb jasny",
    themeDark: "Tryb ciemny",
    heroEyebrow: "Przestrzen robocza desktop",
    heroTitle: "pwloOS System Overview",
    heroSubtitle: "Metryki systemu, moduly i dostep do przestrzeni roboczej.",
    heroModules: ["Projekty", "Tech Stack", "Speed", "Leady", "Kontakt"],
    viewProjects: "Otworz projekty",
    contactMe: "Otworz kontakt",
    speedPanelLabel: "Panel wydajnosci na zywo",
    speedPanelTitle: "Precyzyjnie dostrojone pod Lighthouse i Core Web Vitals.",
    performance: "Wydajnosc",
    seo: "SEO",
    bestPractices: "Dobre praktyki",
    loadsUnderSecond: "Laduje sie w mniej niz 1 sekunde",
    coreWebVitals: "Zoptymalizowane pod Core Web Vitals",
    statusBar: {
      localTime: "Czas lokalny",
      os: "pwloOS v1.0",
      performance: "Wydajnosc: 100",
      online: "Status: Online",
    },
    desktop: {
      eyebrow: "Pulpit",
      title: "Otwieraj moduly, przegladaj prace i poruszaj sie po systemie.",
    },
    footer: {
      builtWith: "Zbudowane z mysla o jakosci i wydajnosci",
    },
    compactLayout: {
      menu: "Menu",
      closeMenu: "Zamknij menu",
      sections: {
        projects: "Projekty",
        openSource: "Open Source",
        seo: "SEO i szybkosc",
        contact: "Kontakt",
      },
      projectsEyebrow: "Wybrane realizacje",
      projectsTitle: "Migawki projektow w stylu iOS",
      openSourceEyebrow: "Open source stack",
      openSourceTitle: "Narzedia, z ktorymi wdrazam",
      openSourceSubtitle: "Starannie dobrany zestaw do szybkich i latwych w utrzymaniu projektow.",
      seoEyebrow: "SEO i wydajnosc",
      seoTitle: "Czytelne, szybkie i nastawione na konwersje strony.",
      seoSubtitle: "Czysta struktura, szybkie renderowanie i mierzalne wyniki na kazdym ekranie.",
    },
    osLayout: {
      mobileTitle: "pwloOS Mobile",
      tabletTitle: "pwloOS Tablet",
      back: "Wstecz",
      settings: "Ustawienia",
      lockscreen: {
        title: "Powiadomienie prywatnosci pwloOS",
        message: "Uzywamy minimalnych cookies wymaganych do dzialania systemu.",
        welcome: "Witaj w pwloOS\n\nNowoczesne środowisko pracy programisty webowego\n\nZaprojektowane przez\nPawel Wlodarczyk",
        consentAriaLabel: "Zgody prywatnosci",
        cookiesConsent: "Akceptuje minimalne cookies wymagane do dzialania systemu.",
        termsConsent: "Akceptuje regulamin.",
        accept: "Akceptuj",
        moreInfo: "Wiecej informacji",
        infoDetail: "Ta preferencja jest zapisywana lokalnie na Twoim urzadzeniu, aby powiadomienie nie pojawialo sie ponownie przy kazdej wizycie.",
      },
      dock: {
        projects: "Projekty",
        contact: "Kontakt",
        seo: "SEO i szybkosc",
        openSource: "Open Source",
      },
      apps: {
        projects: "Projekty",
        openSource: "Open Source",
        seo: "SEO i szybkosc",
        contact: "Kontakt",
        tech: "Tech stack",
        about: "O mnie",
        leads: "Leady",
        settings: "Ustawienia",
      },
    },
    windowTitles: {
      projects: "Projekty",
      about: "O mnie",
      tech: "Stack technologiczny",
      contact: "Kontakt",
      speed: "SEO i szybkosc",
      leads: "Leady",
    },
    desktopIcons: {
      projects: { label: "Projekty", subtitle: "Case studies" },
      about: { label: "O mnie", subtitle: "Profil" },
      tech: { label: "Tech stack", subtitle: "Narzedia" },
      contact: { label: "Kontakt", subtitle: "Rozpocznij projekt" },
      speed: { label: "SEO i szybkosc", subtitle: "Lab audytu" },
      leads: { label: "Leady", subtitle: "Widok chroniony" },
    },
    projects: {
      eyebrow: "Case studies",
      title: "Wybrane projekty",
      openProjectAction: "Otworz projekt",
      openCaseStudy: "Otworz case study",
      caseStudy: "Case study",
      before: "Przed",
      after: "Po",
      seoImprovements: "Ulepszenia SEO",
      deploymentStack: "Stack wdrozenia",
      codeSnippet: "Fragment kodu",
      clientTestimonial: "Opinia klienta",
    },
    about: {
      eyebrow: "Profil",
      title: "O mnie.",
      name: "Pawel Wlodarczyk",
      role: "Freelance Web Developer",
      location: "Garmisch-Partenkirchen, DE",
      photoPlaceholder: "Miejsce na zdjecie",
      bio: [
        "Jestem Pawel Wlodarczyk, freelance web developerem skupionym na szybkich, nowoczesnych i skalowalnych stronach.",
        "Wspolpracuje z klientami z Niemiec, Polski, Indonezji i z calego swiata."
      ],
      resumeAction: "Pobierz CV",
    },
    techStack: {
      eyebrow: "Narzedia",
      title: "Tech stack",
      columns: [
        { title: "Frontend", items: [{ name: "React", purpose: "UI" }, { name: "Next.js", purpose: "Framework" }, { name: "Tailwind", purpose: "CSS" }, { name: "TypeScript", purpose: "Jezyk" }] },
        { title: "Backend", items: [{ name: "Node.js", purpose: "Runtime" }, { name: "Express", purpose: "Serwer" }, { name: "Supabase", purpose: "Baza danych" }, { name: "PostgreSQL", purpose: "SQL" }] },
        { title: "Narzedia", items: [{ name: "Git", purpose: "Wersjonowanie" }, { name: "Vercel", purpose: "Hosting" }, { name: "Docker", purpose: "Kontenery" }, { name: "Figma", purpose: "Design" }] },
        { title: "Specjalizacje", items: [{ name: "Optymalizacja", purpose: "Szybkosc" }, { name: "Czysta arch.", purpose: "Kod" }, { name: "Dostepnosc", purpose: "UX" }] },
      ],
    },
    speed: {
      eyebrow: "Filozofia wydajnosci",
      title: "Szybkosc to funkcja.",
      description: "Szybkie strony lepiej konwertuja, lepiej sie pozycjonuja i budza wieksze zaufanie. Kazda warstwa jest projektowana pod klarownosc, niski narzut i mierzalne wyniki.",
      items: ["Kompresja obrazow", "Lazy loading", "Code splitting", "Dostarczanie przez CDN", "Audyty Lighthouse", "Struktura SEO"],
      cta: "Popros o bezplatny audyt szybkosci",
      ctaSubject: "Audyt szybkosci",
      scoreLabel: "Wynik",
      scoreValue: "100",
      domain: "Domena",
      domainPlaceholder: "twojastrona.pl",
      email: "Email",
      emailPlaceholder: "twoj@email.com",
      message: "Wiadomosc",
      messagePlaceholder: "Opcjonalna wiadomosc lub konkretne uwagi",
      sendRequest: "Wyslij prosbe",
      sendingRequest: "Wysylanie...",
      submitSuccess: "Prosba zostala wyslana. Wkrotce sie odezwe.",
      submitError: "Cos poszlo nie tak. Sprobuj ponownie.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Zbudujmy cos szybkiego.",
      name: "Imie",
      namePlaceholder: "Twoje imie",
      email: "Email",
      projectType: "Typ projektu",
      projectTypePlaceholder: "Landing page, redesign, aplikacja...",
      message: "Wiadomosc",
      messagePlaceholder: "Napisz, czego potrzebujesz.",
      sendInquiry: "Wyslij zapytanie",
      sendingInquiry: "Wysylanie...",
      submitSuccess: "Zapytanie zostalo wyslane.",
      submitError: "Cos poszlo nie tak. Sprobuj ponownie.",
      missingConfig: "Supabase nie jest jeszcze skonfigurowany.",
      inquirySubjectSuffix: "zapytanie",
      mailLabels: {
        name: "Imie",
        email: "Email",
        message: "Wiadomosc",
      },
    },
    leads: {
      eyebrow: "Chronione leady",
      title: "Najnowsze zapytania",
      description: "Wczytaj ostatnie formularze kontaktowe przy pomocy klucza administratora. To okno pozostaje prywatne dzieki sprawdzeniu w Edge Function.",
      adminKeyLabel: "Klucz administratora",
      adminKeyPlaceholder: "Wpisz klucz administratora",
      loadLeads: "Wczytaj leady",
      loadLeadsAction: "Zaladuj",
      loading: "Wczytywanie...",
      empty: "Brak zgloszen.",
      unauthorized: "Klucz administratora jest nieprawidlowy.",
      alertSent: "Alert wyslany",
      alertPending: "Alert oczekuje",
      spam: "Spam",
      clean: "Czyste",
      email: "Email",
      projectType: "Typ projektu",
      locale: "Jezyk",
      submittedAt: "Dodano",
      message: "Wiadomosc",
    },
    windowControls: {
      drag: (title) => `Przesun ${title}`,
      minimize: "Minimalizuj okno",
      maximize: "Maksymalizuj okno",
      restore: "Przywroc okno",
      close: (title) => `Zamknij ${title}`,
      resize: (title) => `Zmien rozmiar ${title}`,
    },
    bootMessages: {
      system: "ładowanie pwloOS",
      themeDark: "ładowanie trybu ciemnego",
      themeLight: "ładowanie trybu jasnego",
      langEn: "ładowanie wersji angielskiej",
      langPl: "ładowanie wersji polskiej",
      langDe: "ładowanie wersji niemieckiej",
    },
  },
  de: {
    localeLabel: "Sprache",
    themeLight: "Heller Modus",
    themeDark: "Dunkler Modus",
    heroEyebrow: "Desktop-Arbeitsbereich",
    heroTitle: "pwloOS System Overview",
    heroSubtitle: "Systemmetriken, Module und Workspace-Zugriff.",
    heroModules: ["Projekte", "Tech Stack", "Speed", "Leads", "Kontakt"],
    viewProjects: "Projekte oeffnen",
    contactMe: "Kontakt oeffnen",
    speedPanelLabel: "Live-Speed-Panel",
    speedPanelTitle: "Praezise abgestimmt auf Lighthouse und Core Web Vitals.",
    performance: "Performance",
    seo: "SEO",
    bestPractices: "Best Practices",
    loadsUnderSecond: "Laedt in unter 1 Sekunde",
    coreWebVitals: "Optimiert fuer Core Web Vitals",
    statusBar: {
      localTime: "Lokale Zeit",
      os: "pwloOS v1.0",
      performance: "Performance: 100",
      online: "Status: Online",
    },
    desktop: {
      eyebrow: "Desktop",
      title: "Module oeffnen, Arbeit pruefen und durch das System navigieren.",
    },
    footer: {
      builtWith: "Gebaut mit Fokus auf Qualitaet und Performance",
    },
    compactLayout: {
      menu: "Menue",
      closeMenu: "Menue schliessen",
      sections: {
        projects: "Projekte",
        openSource: "Open Source",
        seo: "SEO und Speed",
        contact: "Kontakt",
      },
      projectsEyebrow: "Ausgewaehlte Arbeiten",
      projectsTitle: "Projekt-Snapshots im iOS-Stil",
      openSourceEyebrow: "Open-Source-Stack",
      openSourceTitle: "Tools, mit denen ich ausliefere",
      openSourceSubtitle: "Ein kuratierter Stack fuer schnelle und wartbare Builds.",
      seoEyebrow: "SEO und Performance",
      seoTitle: "Lesbare, schnelle und conversion-starke Seiten.",
      seoSubtitle: "Saubere Struktur, schnelles Rendering und messbare Resultate auf jedem Screen.",
    },
    osLayout: {
      mobileTitle: "pwloOS Mobile",
      tabletTitle: "pwloOS Tablet",
      back: "Zurueck",
      settings: "Einstellungen",
      lockscreen: {
        title: "pwloOS Datenschutzhinweis",
        message: "Wir verwenden nur minimale Cookies, die fuer die Systemfunktion erforderlich sind.",
        welcome: "Willkommen bei pwloOS\n\nEin moderner Web-Entwickler-Arbeitsplatz\n\nEntworfen von\nPawel Wlodarczyk",
        consentAriaLabel: "Datenschutz-Zustimmungen",
        cookiesConsent: "Ich akzeptiere essenzielle Cookies, die fuer die Systemfunktion erforderlich sind.",
        termsConsent: "Ich akzeptiere die Nutzungsbedingungen.",
        accept: "Akzeptieren",
        moreInfo: "Mehr Infos",
        infoDetail: "Diese Einstellung wird lokal auf deinem Geraet gespeichert, damit der Hinweis nicht bei jedem Besuch erneut angezeigt wird.",
      },
      dock: {
        projects: "Projekte",
        contact: "Kontakt",
        seo: "SEO und Speed",
        openSource: "Open Source",
      },
      apps: {
        projects: "Projekte",
        openSource: "Open Source",
        seo: "SEO und Speed",
        contact: "Kontakt",
        tech: "Tech Stack",
        about: "Ueber mich",
        leads: "Leads",
        settings: "Einstellungen",
      },
    },
    windowTitles: {
      projects: "Projekte",
      about: "Ueber mich",
      tech: "Tech Stack",
      contact: "Kontakt",
      speed: "SEO & Speed",
      leads: "Leads",
    },
    desktopIcons: {
      projects: { label: "Projekte", subtitle: "Case Studies" },
      about: { label: "Ueber mich", subtitle: "Profil" },
      tech: { label: "Tech Stack", subtitle: "Toolkit" },
      contact: { label: "Kontakt", subtitle: "Projekt starten" },
      speed: { label: "SEO & Speed", subtitle: "Audit-Lab" },
      leads: { label: "Leads", subtitle: "Geschuetzte Ansicht" },
    },
    projects: {
      eyebrow: "Case Studies",
      title: "Ausgewaehlte Projekte",
      openProjectAction: "Projekt oeffnen",
      openCaseStudy: "Case Study oeffnen",
      caseStudy: "Case Study",
      before: "Vorher",
      after: "Nachher",
      seoImprovements: "SEO-Verbesserungen",
      deploymentStack: "Deployment-Stack",
      codeSnippet: "Code-Snippet",
      clientTestimonial: "Kundenstimme",
    },
    about: {
      eyebrow: "Profil",
      title: "Ueber mich.",
      name: "Pawel Wlodarczyk",
      role: "Freelance Web Developer",
      location: "Garmisch-Partenkirchen, DE",
      photoPlaceholder: "Platzhalter fuer Foto",
      bio: [
        "Ich bin Pawel Wlodarczyk, freiberuflicher Webentwickler mit Fokus auf schnelle, moderne und skalierbare Websites.",
        "Ich arbeite mit Kunden aus Deutschland, Polen, Indonesien und weltweit."
      ],
      resumeAction: "Lebenslauf herunterladen",
    },
    techStack: {
      eyebrow: "Tools",
      title: "Tech Stack",
      columns: [
        { title: "Frontend", items: [{ name: "React", purpose: "UI Library" }, { name: "Next.js", purpose: "Framework" }, { name: "Tailwind", purpose: "Styling" }, { name: "TypeScript", purpose: "Sprache" }] },
        { title: "Backend", items: [{ name: "Node.js", purpose: "Runtime" }, { name: "Express", purpose: "Server" }, { name: "Supabase", purpose: "Datenbank" }, { name: "PostgreSQL", purpose: "SQL" }] },
        { title: "Tools", items: [{ name: "Git", purpose: "Versionierung" }, { name: "Vercel", purpose: "Hosting" }, { name: "Docker", purpose: "Container" }, { name: "Figma", purpose: "Design" }] },
        { title: "Spezialisierungen", items: [{ name: "Speed-Optimierung", purpose: "Ladezeiten" }, { name: "Saubere Architektur", purpose: "Code" }, { name: "Barrierefreiheit", purpose: "UX" }] },
      ],
    },
    speed: {
      eyebrow: "Performance-Philosophie",
      title: "Speed ist ein Feature.",
      description: "Schnelle Websites konvertieren besser, ranken besser und wirken vertrauenswuerdiger. Jede Ebene ist auf Klarheit, geringe Last und messbare Ergebnisse ausgelegt.",
      items: ["Bildkomprimierung", "Lazy Loading", "Code Splitting", "CDN-Auslieferung", "Lighthouse-Audits", "SEO-Struktur"],
      cta: "Kostenlosen Speed-Audit anfragen",
      ctaSubject: "Speed-Audit",
      scoreLabel: "Score",
      scoreValue: "100",
      domain: "Domain",
      domainPlaceholder: "ihreseite.de",
      email: "E-Mail",
      emailPlaceholder: "sie@beispiel.de",
      message: "Nachricht",
      messagePlaceholder: "Optionale Nachricht oder konkrete Hinweise",
      sendRequest: "Anfrage senden",
      sendingRequest: "Wird gesendet...",
      submitSuccess: "Anfrage erfolgreich gesendet. Ich melde mich bald.",
      submitError: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Lass uns etwas Schnelles bauen.",
      name: "Name",
      namePlaceholder: "Ihr Name",
      email: "E-Mail",
      projectType: "Projekttyp",
      projectTypePlaceholder: "Landingpage, Redesign, App...",
      message: "Nachricht",
      messagePlaceholder: "Beschreiben Sie kurz Ihr Vorhaben.",
      sendInquiry: "Anfrage senden",
      sendingInquiry: "Wird gesendet...",
      submitSuccess: "Anfrage erfolgreich gesendet.",
      submitError: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
      missingConfig: "Supabase ist noch nicht konfiguriert.",
      inquirySubjectSuffix: "Anfrage",
      mailLabels: {
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
      },
    },
    leads: {
      eyebrow: "Geschuetzte Leads",
      title: "Neueste Anfragen",
      description: "Laden Sie aktuelle Kontaktanfragen mit einem Admin-Schluessel. Dieses Fenster bleibt privat hinter einer Edge-Function-Pruefung.",
      adminKeyLabel: "Admin-Schluessel",
      adminKeyPlaceholder: "Admin-Schluessel eingeben",
      loadLeads: "Leads laden",
      loadLeadsAction: "Laden",
      loading: "Laedt...",
      empty: "Noch keine Anfragen.",
      unauthorized: "Der Admin-Schluessel ist ungueltig.",
      alertSent: "Alert gesendet",
      alertPending: "Alert offen",
      spam: "Spam",
      clean: "Sauber",
      email: "E-Mail",
      projectType: "Projekttyp",
      locale: "Sprache",
      submittedAt: "Eingegangen",
      message: "Nachricht",
    },
    windowControls: {
      drag: (title) => `${title} bewegen`,
      minimize: "Fenster minimieren",
      maximize: "Fenster maximieren",
      restore: "Fenster wiederherstellen",
      close: (title) => `${title} schliessen`,
      resize: (title) => `Groesse von ${title} aendern`,
    },
    bootMessages: {
      system: "pwloOS wird geladen",
      themeDark: "dunkler modus wird geladen",
      themeLight: "heller modus wird geladen",
      langEn: "englische version wird geladen",
      langPl: "polnische version wird geladen",
      langDe: "deutsche version wird geladen",
    },
  },
};

export function getProjectTranslation(locale: Locale, projectId: string) {
  return projectTranslations[locale][projectId] ?? projectTranslations.en[projectId];
}
