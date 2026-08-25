import type { WindowId, ProjectTechTagId } from "@/data/portfolioData";
import type { TechIconId } from "@/components/portfolio/TechIcons";

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
    clientsHeading: string;
    clients: string[];
    resumeAction: string;
  };
  techStack: {
    eyebrow: string;
    title: string;
    columns: Array<{
      title: string;
      items: Array<{
        name: string;
        purpose: string;
        icon: TechIconId;
        projectsCount?: number;
      }>;
    }>;
  };
  speed: {
    eyebrow: string;
    title: string;
    subtitle: string;
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
    "hotel-worker": {
      title: "Hotel Worker",
      description:
        "Hotel operations management system. Streamlines staff scheduling, leave requests, and real-time team task coordination.",
      performanceBadge: "Live preview",
      screenshotDetails: ["SaaS", "Hospitality", "Web App"],
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
      description:
        "Modern sales platform for an artisan coffee brand (Farm-to-Cup). Features a minimalist, responsive design and an intuitive checkout flow.",
      performanceBadge: "Live preview",
      screenshotDetails: ["E-commerce", "Branding", "UI/UX"],
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
      description:
        "Project management tool for teams. Centralizes plans, deadlines, and communication to make assigning work and tracking progress easier.",
      performanceBadge: "Live preview",
      screenshotDetails: ["SaaS", "Productivity", "Web App"],
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
    "dieta-na-codzien": {
      title: "Dieta Na Co Dzień",
      description:
        "Clear brand and offer site for a dietitian, integrated with a client panel, educational blog, and online consultation booking.",
      performanceBadge: "Live preview",
      screenshotDetails: ["Landing Page", "Health", "Services"],
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
      description:
        "Interactive AI-powered coloring page generator. Create unique templates from text or voice, paint in the browser, and export to print (PDF).",
      performanceBadge: "Live preview",
      screenshotDetails: ["AI App", "Education", "Entertainment"],
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
      description:
        "Local marketplace connecting clients with gig workers in real time. Simple interface for posting jobs and applying.",
      performanceBadge: "Live preview",
      screenshotDetails: ["Marketplace", "Recruitment", "Web App"],
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
  },
  pl: {
    "hotel-worker": {
      title: "Hotel Worker",
      description:
        "System zarządzania operacjami hotelowymi. Usprawnia grafik pracy personelu, zgłaszanie urlopów i koordynację zadań zespołu w czasie rzeczywistym.",
      performanceBadge: "Podgląd na żywo",
      screenshotDetails: ["SaaS", "Hospitality", "Web App"],
      caseStudy: {
        before: "Tło projektu dostępne na życzenie",
        after: "Podgląd aplikacji jest już dostępny",
        seo: [
          "Domena na żywo gotowa do oceny",
          "Notatki case study można rozszerzyć",
          "Wpis w portfolio wspiera bezpośredni podgląd",
        ],
        deployment: ["Domena produkcyjna", "Zewnętrzny link podglądu", "Wpis case study w portfolio"],
        testimonial: "Podgląd na żywo jest dostępny pod adresem hotelworker.app.",
      },
    },
    "coffee-bagus": {
      title: "Coffee Bagus",
      description:
        "Nowoczesna platforma sprzedażowa dla rzemieślniczej marki kawy (model Farm-to-Cup). Wyróżnia się minimalistycznym, responsywnym designem i intuicyjnym procesem zakupowym.",
      performanceBadge: "Podgląd na żywo",
      screenshotDetails: ["E-commerce", "Branding", "UI/UX"],
      caseStudy: {
        before: "Tło projektu dostępne na życzenie",
        after: "Podgląd strony jest już dostępny",
        seo: [
          "Domena na żywo gotowa do oceny",
          "Notatki case study można rozszerzyć",
          "Bezpośredni podgląd poprawia przepływ portfolio",
        ],
        deployment: ["Domena produkcyjna", "Zewnętrzny link podglądu", "Wpis case study w portfolio"],
        testimonial: "Podgląd na żywo jest dostępny pod adresem coffeebagus.com.",
      },
    },
    "task-tracker": {
      title: "Task Tracker",
      description:
        "Narzędzie do zarządzania projektami dla zespołów. Centralizuje plany, terminy i komunikację, ułatwiając delegowanie zadań i śledzenie postępów prac.",
      performanceBadge: "Podgląd na żywo",
      screenshotDetails: ["SaaS", "Produktywność", "Web App"],
      caseStudy: {
        before: "Tło projektu dostępne na życzenie",
        after: "Podgląd strony jest już dostępny",
        seo: [
          "Domena na żywo gotowa do oceny",
          "Notatki case study można rozszerzyć",
          "Wpis w portfolio wspiera bezpośredni podgląd",
        ],
        deployment: ["Domena produkcyjna", "Zewnętrzny link podglądu", "Wpis case study w portfolio"],
        testimonial: "Podgląd na żywo jest dostępny pod adresem tasktracker.pl.",
      },
    },
    "dieta-na-codzien": {
      title: "Dieta Na Co Dzień",
      description:
        "Przejrzysta strona wizerunkowo-ofertowa dla dietetyka zintegrowana z panelem klienta, blogiem edukacyjnym oraz modułem rezerwacji konsultacji online.",
      performanceBadge: "Podgląd na żywo",
      screenshotDetails: ["Landing Page", "Zdrowie", "Usługi"],
      caseStudy: {
        before: "Szczegóły wyjściowe projektu dostępne na życzenie",
        after: "Podgląd produkcyjny jest już dostępny",
        seo: [
          "Domena na żywo gotowa do oceny",
          "Opis case study można rozbudować",
          "Notatki SEO można dopasować do projektu",
        ],
        deployment: ["Domena produkcyjna", "Zewnętrzny link podglądu", "Wpis case study w portfolio"],
        testimonial: "Podgląd na żywo jest dostępny pod adresem dietanacodzien.pl.",
      },
    },
    "magic-colouring-book": {
      title: "Magic Colouring Book",
      description:
        "Interaktywny generator kolorowanek napędzany sztuczną inteligencją. Umożliwia tworzenie unikalnych szablonów na podstawie tekstu/głosu, malowanie w przeglądarce i eksport do druku (PDF).",
      performanceBadge: "Podgląd na żywo",
      screenshotDetails: ["AI App", "Edukacja", "Rozrywka"],
      caseStudy: {
        before: "Tło projektu dostępne na życzenie",
        after: "Podgląd aplikacji jest już dostępny",
        seo: [
          "Domena na żywo gotowa do oceny",
          "Notatki do projektu można dopasować",
          "Wpis w portfolio wspiera bezpośredni podgląd",
        ],
        deployment: ["Domena produkcyjna", "Zewnętrzny link podglądu", "Wpis case study w portfolio"],
        testimonial: "Podgląd na żywo jest dostępny pod adresem magiccolouringbook.app.",
      },
    },
    "instant-jobs": {
      title: "Instant Jobs",
      description:
        "Lokalna platforma typu marketplace łącząca zleceniodawców z wykonawcami prac dorywczych w czasie rzeczywistym. Prosty interfejs dodawania ogłoszeń i aplikowania.",
      performanceBadge: "Podgląd na żywo",
      screenshotDetails: ["Marketplace", "Rekrutacja", "Web App"],
      caseStudy: {
        before: "Tło projektu dostępne na życzenie",
        after: "Podgląd strony jest już dostępny",
        seo: [
          "Domena na żywo gotowa do oceny",
          "Notatki case study można rozszerzyć",
          "Bezpośredni podgląd poprawia przepływ portfolio",
        ],
        deployment: ["Domena produkcyjna", "Zewnętrzny link podglądu", "Wpis case study w portfolio"],
        testimonial: "Podgląd na żywo jest dostępny pod adresem instant-jobs.com.",
      },
    },
  },
  de: {
    "hotel-worker": {
      title: "Hotel Worker",
      description:
        "System zur Verwaltung von Hotelabläufen. Optimiert Dienstpläne, Urlaubsanträge und die Echtzeit-Koordination von Teamaufgaben.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["SaaS", "Hospitality", "Web App"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfügbar",
        after: "Die App-Vorschau ist jetzt verfügbar",
        seo: [
          "Live-Domain bereit zur Prüfung",
          "Case-Study-Notizen können erweitert werden",
          "Portfolio-Eintrag unterstützt direkte Vorschau",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfügbar unter hotelworker.app.",
      },
    },
    "coffee-bagus": {
      title: "Coffee Bagus",
      description:
        "Moderne Verkaufsplattform für eine handwerkliche Kaffeemarke (Farm-to-Cup). Mit minimalistischem, responsivem Design und intuitivem Kaufprozess.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["E-commerce", "Branding", "UI/UX"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfügbar",
        after: "Die Seitenvorschau ist jetzt verfügbar",
        seo: [
          "Live-Domain bereit zur Prüfung",
          "Case-Study-Notizen können erweitert werden",
          "Direkte Vorschau verbessert den Portfolio-Flow",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfügbar unter coffeebagus.com.",
      },
    },
    "task-tracker": {
      title: "Task Tracker",
      description:
        "Projektmanagement-Tool für Teams. Bündelt Pläne, Fristen und Kommunikation und erleichtert so die Aufgabenverteilung und Fortschrittskontrolle.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["SaaS", "Produktivität", "Web App"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfügbar",
        after: "Die Seitenvorschau ist jetzt verfügbar",
        seo: [
          "Live-Domain bereit zur Prüfung",
          "Case-Study-Notizen können erweitert werden",
          "Portfolio-Eintrag unterstützt direkte Vorschau",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfügbar unter tasktracker.pl.",
      },
    },
    "dieta-na-codzien": {
      title: "Dieta Na Co Dzień",
      description:
        "Klare Image- und Angebotsseite für Ernährungsberatung mit Kundenpanel, Bildungsblog und Online-Buchung von Beratungen.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["Landing Page", "Gesundheit", "Services"],
      caseStudy: {
        before: "Ursprüngliche Projektdetails auf Anfrage verfügbar",
        after: "Die Produktivvorschau ist jetzt verfügbar",
        seo: [
          "Live-Domain bereit zur Prüfung",
          "Case-Study-Details können erweitert werden",
          "SEO-Notizen können je Projekt ergänzt werden",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfügbar unter dietanacodzien.pl.",
      },
    },
    "magic-colouring-book": {
      title: "Magic Colouring Book",
      description:
        "Interaktiver KI-gestützter Malbuch-Generator. Erstellt einzigartige Vorlagen aus Text oder Sprache, ermöglicht Malen im Browser und Export zum Drucken (PDF).",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["AI App", "Bildung", "Unterhaltung"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfügbar",
        after: "Die App-Vorschau ist jetzt verfügbar",
        seo: [
          "Live-Domain bereit zur Prüfung",
          "Projektnotizen können angepasst werden",
          "Portfolio-Eintrag unterstützt direkte Vorschau",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfügbar unter magiccolouringbook.app.",
      },
    },
    "instant-jobs": {
      title: "Instant Jobs",
      description:
        "Lokale Marketplace-Plattform, die Auftraggeber und Gelegenheitsjobber in Echtzeit verbindet. Einfache Oberfläche zum Erstellen von Anzeigen und Bewerben.",
      performanceBadge: "Live-Vorschau",
      screenshotDetails: ["Marketplace", "Recruiting", "Web App"],
      caseStudy: {
        before: "Projektkontext auf Anfrage verfügbar",
        after: "Die Seitenvorschau ist jetzt verfügbar",
        seo: [
          "Live-Domain bereit zur Prüfung",
          "Case-Study-Notizen können erweitert werden",
          "Direkte Vorschau verbessert den Portfolio-Flow",
        ],
        deployment: ["Produktive Live-Domain", "Externer Vorschau-Link", "Portfolio-Case-Study-Eintrag"],
        testimonial: "Live-Vorschau verfügbar unter instant-jobs.com.",
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
        welcome: "Welcome to pwloOS\n\nA modern web developer workspace\n\nDesigned by\nPaweł Włodarczyk",
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
      title: "About me",
      name: "Paweł Włodarczyk",
      role: "Your partner in building modern websites.",
      location: "Garmisch-Partenkirchen, DE",
      photoPlaceholder: "Photo placeholder",
      bio: [
        "I'm Paweł — a freelancer specializing in fast, modern, and secure web apps.",
        "I help businesses grow online with scalable solutions.",
      ],
      clientsHeading: "Trusted by clients from:",
      clients: ["Germany (DE), Poland (PL)", "Asia and around the world."],
      resumeAction: "View resume",
    },
    techStack: {
      eyebrow: "TECH STACK",
      title: "What these tools do for your business.",
      columns: [
        {
          title: "Frontend",
          items: [
            { name: "React / Next.js", purpose: "Modern interface", icon: "react" },
            { name: "Tailwind CSS", purpose: "Mobile-ready layouts", icon: "tailwind" },
            { name: "TypeScript", purpose: "Reliable, bug-resistant code", icon: "typescript" },
          ],
        },
        {
          title: "Backend & Data",
          items: [
            { name: "Node.js", purpose: "Fast data processing", icon: "nodejs" },
            { name: "Supabase / PostgreSQL", purpose: "Secure databases and user accounts", icon: "supabase" },
            { name: "AI integrations", purpose: "Practical AI-powered features", icon: "ai" },
          ],
        },
        {
          title: "Infrastructure",
          items: [
            { name: "Vercel & CDN", purpose: "Global, fast hosting", icon: "vercel" },
            { name: "Git / GitHub", purpose: "Safe backups and updates", icon: "git" },
            { name: "Figma", purpose: "Unique visual design", icon: "figma" },
          ],
        },
        {
          title: "Quality guarantee",
          items: [
            { name: "Google optimization", purpose: "100/100 speed test scores", icon: "google" },
            { name: "Responsiveness", purpose: "Smooth on every device", icon: "responsive" },
            { name: "Accessibility (a11y)", purpose: "Intuitive for everyone", icon: "a11y" },
          ],
        },
      ],
    },
    speed: {
      eyebrow: "SEO & SPEED",
      title: "Speed & Google Visibility",
      subtitle: "A fast website means more customers and higher sales.",
      description:
        "Nobody likes to wait. Your site will open instantly on every phone and computer. Visitors stay longer, leave for competitors less often, and are more likely to buy or send an inquiry.",
      items: [
        "Lightning-fast loading",
        "Strong Google visibility",
        "Images that load in a fraction of a second",
        "Smooth performance on phones",
        "Top Google score (100/100)",
        "More inquiries from customers",
      ],
      cta: "Check your website speed for free",
      ctaSubject: "Speed audit",
      scoreLabel: "Maximum Google speed score (100/100)",
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
    localeLabel: "Język",
    themeLight: "Tryb jasny",
    themeDark: "Tryb ciemny",
    heroEyebrow: "Przestrzeń robocza desktop",
    heroTitle: "pwloOS System Overview",
    heroSubtitle: "Metryki systemu, moduły i dostęp do przestrzeni roboczej.",
    heroModules: ["Projekty", "Tech Stack", "Speed", "Leady", "Kontakt"],
    viewProjects: "Otwórz projekty",
    contactMe: "Otwórz kontakt",
    speedPanelLabel: "Panel wydajności na żywo",
    speedPanelTitle: "Precyzyjnie dostrojone pod Lighthouse i Core Web Vitals.",
    performance: "Wydajność",
    seo: "SEO",
    bestPractices: "Dobre praktyki",
    loadsUnderSecond: "Ładuje się w mniej niż 1 sekundę",
    coreWebVitals: "Zoptymalizowane pod Core Web Vitals",
    statusBar: {
      localTime: "Czas lokalny",
      os: "pwloOS v1.0",
      performance: "Wydajność: 100",
      online: "Status: Online",
    },
    desktop: {
      eyebrow: "Pulpit",
      title: "Otwieraj moduły, przeglądaj prace i poruszaj się po systemie.",
    },
    footer: {
      builtWith: "Zbudowane z myślą o jakości i wydajności",
    },
    compactLayout: {
      menu: "Menu",
      closeMenu: "Zamknij menu",
      sections: {
        projects: "Projekty",
        openSource: "Open Source",
        seo: "SEO i szybkość",
        contact: "Kontakt",
      },
      projectsEyebrow: "Wybrane realizacje",
      projectsTitle: "Migawki projektów w stylu iOS",
      openSourceEyebrow: "Open source stack",
      openSourceTitle: "Narzędzia, z którymi wdrażam",
      openSourceSubtitle: "Starannie dobrany zestaw do szybkich i łatwych w utrzymaniu projektów.",
      seoEyebrow: "SEO i wydajność",
      seoTitle: "Czytelne, szybkie i nastawione na konwersje strony.",
      seoSubtitle: "Czysta struktura, szybkie renderowanie i mierzalne wyniki na każdym ekranie.",
    },
    osLayout: {
      mobileTitle: "pwloOS Mobile",
      tabletTitle: "pwloOS Tablet",
      back: "Wstecz",
      settings: "Ustawienia",
      lockscreen: {
        title: "Powiadomienie prywatnosci pwloOS",
        message: "Używamy minimalnych cookies wymaganych do działania systemu.",
        welcome: "Witaj w pwloOS\n\nNowoczesne środowisko pracy programisty webowego\n\nZaprojektowane przez\nPaweł Włodarczyk",
        consentAriaLabel: "Zgody prywatnosci",
        cookiesConsent: "Akceptuję minimalne cookies wymagane do działania systemu.",
        termsConsent: "Akceptuję regulamin.",
        accept: "Akceptuj",
        moreInfo: "Więcej informacji",
        infoDetail: "Ta preferencja jest zapisywana lokalnie na Twoim urządzeniu, aby powiadomienie nie pojawiało się ponownie przy każdej wizycie.",
      },
      dock: {
        projects: "Projekty",
        contact: "Kontakt",
        seo: "SEO i szybkość",
        openSource: "Open Source",
      },
      apps: {
        projects: "Projekty",
        openSource: "Open Source",
        seo: "SEO i szybkość",
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
      speed: "SEO i szybkość",
      leads: "Leady",
    },
    desktopIcons: {
      projects: { label: "Projekty", subtitle: "Case studies" },
      about: { label: "O mnie", subtitle: "Profil" },
      tech: { label: "Tech stack", subtitle: "Narzędzia" },
      contact: { label: "Kontakt", subtitle: "Rozpocznij projekt" },
      speed: { label: "SEO i szybkość", subtitle: "Lab audytu" },
      leads: { label: "Leady", subtitle: "Widok chroniony" },
    },
    projects: {
      eyebrow: "Case studies",
      title: "Wybrane projekty",
      openProjectAction: "Otwórz projekt",
      openCaseStudy: "Otwórz case study",
      caseStudy: "Case study",
      before: "Przed",
      after: "Po",
      seoImprovements: "Ulepszenia SEO",
      deploymentStack: "Stack wdrożenia",
      codeSnippet: "Fragment kodu",
      clientTestimonial: "Opinia klienta",
    },
    about: {
      eyebrow: "Profil",
      title: "O mnie",
      name: "Paweł Włodarczyk",
      role: "Twój partner w budowaniu nowoczesnych stron webowych.",
      location: "Garmisch-Partenkirchen, DE",
      photoPlaceholder: "Miejsce na zdjęcie",
      bio: [
        "Jestem Paweł – freelancer specjalizujący się w tworzeniu szybkich, nowoczesnych i bezpiecznych aplikacji internetowych.",
        "Pomagam firmom rosnąć online dzięki skalowalnym rozwiązaniom.",
      ],
      clientsHeading: "Zaufali mi klienci z:",
      clients: ["Niemiec (DE), Polski (PL)", "Azji i z całego świata."],
      resumeAction: "Pobierz CV",
    },
    techStack: {
      eyebrow: "Narzędzia",
      title: "Co zyskujesz dzięki tym narzędziom.",
      columns: [
        {
          title: "Frontend",
          items: [
            { name: "React / Next.js", purpose: "Nowoczesny interfejs", icon: "react" },
            { name: "Tailwind CSS", purpose: "Dopasowanie do smartfonów", icon: "tailwind" },
            { name: "TypeScript", purpose: "Bezawaryjne działanie", icon: "typescript" },
          ],
        },
        {
          title: "Backend & Dane",
          items: [
            { name: "Node.js", purpose: "Szybkie przetwarzanie danych", icon: "nodejs" },
            { name: "Supabase / PostgreSQL", purpose: "Bezpieczne bazy i konta użytkowników", icon: "supabase" },
            { name: "Integracje AI", purpose: "Funkcje sztucznej inteligencji", icon: "ai" },
          ],
        },
        {
          title: "Infrastruktura",
          items: [
            { name: "Vercel & CDN", purpose: "Globalny, szybki hosting", icon: "vercel" },
            { name: "Git / GitHub", purpose: "Bezpieczne kopie i aktualizacje", icon: "git" },
            { name: "Figma", purpose: "Unikalny projekt graficzny", icon: "figma" },
          ],
        },
        {
          title: "Gwarancja jakości",
          items: [
            { name: "Optymalizacja Google", purpose: "Wynik 100/100 w testach szybkości", icon: "google" },
            { name: "Responsywność", purpose: "Płynność na każdym urządzeniu", icon: "responsive" },
            { name: "Dostępność (a11y)", purpose: "Intuicyjna obsługa dla każdego", icon: "a11y" },
          ],
        },
      ],
    },
    speed: {
      eyebrow: "Filozofia wydajności",
      title: "Szybkość i Widoczność w Google",
      subtitle: "Szybka strona to więcej klientów i wyższa sprzedaż.",
      description:
        "Nikt nie lubi czekać. Twoja strona otworzy się błyskawicznie na każdym telefonie i komputerze. Dzięki temu odwiedzający nie uciekają do konkurencji, spędzają na niej więcej czasu i chętniej kupują lub wysyłają zapytania.",
      items: [
        "Błyskawiczne ładowanie",
        "Świetna widoczność w Google",
        "Zdjęcia ładujące się w ułamku sekundy",
        "Płynne działanie na telefonach",
        "Najwyższa ocena Google (100/100)",
        "Więcej zapytań od klientów",
      ],
      cta: "Sprawdź bezpłatnie szybkość swojej strony",
      ctaSubject: "Audyt szybkości",
      scoreLabel: "Maksymalna ocena szybkości od Google (100/100)",
      scoreValue: "100",
      domain: "Domena",
      domainPlaceholder: "twojastrona.pl",
      email: "Email",
      emailPlaceholder: "twoj@email.com",
      message: "Wiadomość",
      messagePlaceholder: "Opcjonalna wiadomość lub konkretne uwagi",
      sendRequest: "Wyślij prośbę",
      sendingRequest: "Wysyłanie...",
      submitSuccess: "Prośba została wysłana. Wkrótce się odezwę.",
      submitError: "Coś poszło nie tak. Spróbuj ponownie.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Zbudujmy cos szybkiego.",
      name: "Imię",
      namePlaceholder: "Twoje imię",
      email: "Email",
      projectType: "Typ projektu",
      projectTypePlaceholder: "Landing page, redesign, aplikacja...",
      message: "Wiadomość",
      messagePlaceholder: "Napisz, czego potrzebujesz.",
      sendInquiry: "Wyślij zapytanie",
      sendingInquiry: "Wysyłanie...",
      submitSuccess: "Zapytanie zostało wysłane.",
      submitError: "Coś poszło nie tak. Spróbuj ponownie.",
      missingConfig: "Supabase nie jest jeszcze skonfigurowany.",
      inquirySubjectSuffix: "zapytanie",
      mailLabels: {
        name: "Imię",
        email: "Email",
        message: "Wiadomość",
      },
    },
    leads: {
      eyebrow: "Chronione leady",
      title: "Najnowsze zapytania",
      description: "Wczytaj ostatnie formularze kontaktowe przy pomocy klucza administratora. To okno pozostaje prywatne dzięki sprawdzeniu w Edge Function.",
      adminKeyLabel: "Klucz administratora",
      adminKeyPlaceholder: "Wpisz klucz administratora",
      loadLeads: "Wczytaj leady",
      loadLeadsAction: "Załaduj",
      loading: "Wczytywanie...",
      empty: "Brak zgłoszeń.",
      unauthorized: "Klucz administratora jest nieprawidłowy.",
      alertSent: "Alert wyslany",
      alertPending: "Alert oczekuje",
      spam: "Spam",
      clean: "Czyste",
      email: "Email",
      projectType: "Typ projektu",
      locale: "Język",
      submittedAt: "Dodano",
      message: "Wiadomość",
    },
    windowControls: {
      drag: (title) => `Przesun ${title}`,
      minimize: "Minimalizuj okno",
      maximize: "Maksymalizuj okno",
      restore: "Przywróć okno",
      close: (title) => `Zamknij ${title}`,
      resize: (title) => `Zmień rozmiar ${title}`,
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
    viewProjects: "Projekte öffnen",
    contactMe: "Kontakt öffnen",
    speedPanelLabel: "Live-Speed-Panel",
    speedPanelTitle: "Präzise abgestimmt auf Lighthouse und Core Web Vitals.",
    performance: "Performance",
    seo: "SEO",
    bestPractices: "Best Practices",
    loadsUnderSecond: "Lädt in unter 1 Sekunde",
    coreWebVitals: "Optimiert für Core Web Vitals",
    statusBar: {
      localTime: "Lokale Zeit",
      os: "pwloOS v1.0",
      performance: "Performance: 100",
      online: "Status: Online",
    },
    desktop: {
      eyebrow: "Desktop",
      title: "Module öffnen, Arbeit prüfen und durch das System navigieren.",
    },
    footer: {
      builtWith: "Gebaut mit Fokus auf Qualität und Performance",
    },
    compactLayout: {
      menu: "Menü",
      closeMenu: "Menü schließen",
      sections: {
        projects: "Projekte",
        openSource: "Open Source",
        seo: "SEO und Speed",
        contact: "Kontakt",
      },
      projectsEyebrow: "Ausgewählte Arbeiten",
      projectsTitle: "Projekt-Snapshots im iOS-Stil",
      openSourceEyebrow: "Open-Source-Stack",
      openSourceTitle: "Tools, mit denen ich ausliefere",
      openSourceSubtitle: "Ein kuratierter Stack für schnelle und wartbare Builds.",
      seoEyebrow: "SEO und Performance",
      seoTitle: "Lesbare, schnelle und conversion-starke Seiten.",
      seoSubtitle: "Saubere Struktur, schnelles Rendering und messbare Resultate auf jedem Screen.",
    },
    osLayout: {
      mobileTitle: "pwloOS Mobile",
      tabletTitle: "pwloOS Tablet",
      back: "Zurück",
      settings: "Einstellungen",
      lockscreen: {
        title: "pwloOS Datenschutzhinweis",
        message: "Wir verwenden nur minimale Cookies, die für die Systemfunktion erforderlich sind.",
        welcome: "Willkommen bei pwloOS\n\nEin moderner Web-Entwickler-Arbeitsplatz\n\nEntworfen von\nPaweł Włodarczyk",
        consentAriaLabel: "Datenschutz-Zustimmungen",
        cookiesConsent: "Ich akzeptiere essenzielle Cookies, die für die Systemfunktion erforderlich sind.",
        termsConsent: "Ich akzeptiere die Nutzungsbedingungen.",
        accept: "Akzeptieren",
        moreInfo: "Mehr Infos",
        infoDetail: "Diese Einstellung wird lokal auf deinem Gerät gespeichert, damit der Hinweis nicht bei jedem Besuch erneut angezeigt wird.",
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
        about: "Über mich",
        leads: "Leads",
        settings: "Einstellungen",
      },
    },
    windowTitles: {
      projects: "Projekte",
      about: "Über mich",
      tech: "Tech Stack",
      contact: "Kontakt",
      speed: "SEO & Speed",
      leads: "Leads",
    },
    desktopIcons: {
      projects: { label: "Projekte", subtitle: "Case Studies" },
      about: { label: "Über mich", subtitle: "Profil" },
      tech: { label: "Tech Stack", subtitle: "Toolkit" },
      contact: { label: "Kontakt", subtitle: "Projekt starten" },
      speed: { label: "SEO & Speed", subtitle: "Audit-Lab" },
      leads: { label: "Leads", subtitle: "Geschützte Ansicht" },
    },
    projects: {
      eyebrow: "Case Studies",
      title: "Ausgewählte Projekte",
      openProjectAction: "Projekt öffnen",
      openCaseStudy: "Case Study öffnen",
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
      title: "Über mich",
      name: "Paweł Włodarczyk",
      role: "Ihr Partner für moderne Websites.",
      location: "Garmisch-Partenkirchen, DE",
      photoPlaceholder: "Platzhalter für Foto",
      bio: [
        "Ich bin Paweł — Freelancer mit Fokus auf schnelle, moderne und sichere Webanwendungen.",
        "Ich helfe Unternehmen, online mit skalierbaren Lösungen zu wachsen.",
      ],
      clientsHeading: "Vertrauen von Kunden aus:",
      clients: ["Deutschland (DE), Polen (PL)", "Asien und der ganzen Welt."],
      resumeAction: "Lebenslauf herunterladen",
    },
    techStack: {
      eyebrow: "Tools",
      title: "Was diese Tools für Ihr Business leisten.",
      columns: [
        {
          title: "Frontend",
          items: [
            { name: "React / Next.js", purpose: "Modernes Interface", icon: "react" },
            { name: "Tailwind CSS", purpose: "Optimiert für Smartphones", icon: "tailwind" },
            { name: "TypeScript", purpose: "Zuverlässiger, fehlerarmer Code", icon: "typescript" },
          ],
        },
        {
          title: "Backend & Daten",
          items: [
            { name: "Node.js", purpose: "Schnelle Datenverarbeitung", icon: "nodejs" },
            { name: "Supabase / PostgreSQL", purpose: "Sichere Datenbanken und Benutzerkonten", icon: "supabase" },
            { name: "KI-Integrationen", purpose: "Praktische KI-Funktionen", icon: "ai" },
          ],
        },
        {
          title: "Infrastruktur",
          items: [
            { name: "Vercel & CDN", purpose: "Globales, schnelles Hosting", icon: "vercel" },
            { name: "Git / GitHub", purpose: "Sichere Backups und Updates", icon: "git" },
            { name: "Figma", purpose: "Einzigartiges visuelles Design", icon: "figma" },
          ],
        },
        {
          title: "Qualitätsgarantie",
          items: [
            { name: "Google-Optimierung", purpose: "100/100 in Speed-Tests", icon: "google" },
            { name: "Responsiveness", purpose: "Flüssig auf jedem Gerät", icon: "responsive" },
            { name: "Barrierefreiheit (a11y)", purpose: "Intuitive Bedienung für alle", icon: "a11y" },
          ],
        },
      ],
    },
    speed: {
      eyebrow: "Performance-Philosophie",
      title: "Geschwindigkeit & Sichtbarkeit bei Google",
      subtitle: "Eine schnelle Website bedeutet mehr Kunden und höheren Umsatz.",
      description:
        "Niemand wartet gerne. Ihre Seite öffnet sich sofort auf jedem Smartphone und Computer. Besucher bleiben länger, wechseln seltener zur Konkurrenz und fragen oder kaufen eher.",
      items: [
        "Blitzschnelles Laden",
        "Starke Sichtbarkeit bei Google",
        "Bilder, die in Sekundenbruchteilen laden",
        "Flüssige Performance auf Handys",
        "Höchste Google-Bewertung (100/100)",
        "Mehr Anfragen von Kunden",
      ],
      cta: "Website-Geschwindigkeit kostenlos prüfen",
      ctaSubject: "Speed-Audit",
      scoreLabel: "Maximale Google-Geschwindigkeitsbewertung (100/100)",
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
      eyebrow: "Geschützte Leads",
      title: "Neueste Anfragen",
      description: "Laden Sie aktuelle Kontaktanfragen mit einem Admin-Schlüssel. Dieses Fenster bleibt privat hinter einer Edge-Function-Prüfung.",
      adminKeyLabel: "Admin-Schlüssel",
      adminKeyPlaceholder: "Admin-Schlüssel eingeben",
      loadLeads: "Leads laden",
      loadLeadsAction: "Laden",
      loading: "Lädt...",
      empty: "Noch keine Anfragen.",
      unauthorized: "Der Admin-Schlüssel ist ungültig.",
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
      close: (title) => `${title} schließen`,
      resize: (title) => `Größe von ${title} ändern`,
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

const projectTechTags: Record<Locale, Record<ProjectTechTagId, string>> = {
  en: {
    "admin-panel": "Admin panel",
    "team-management": "Team management",
    "live-demo": "Live demo",
    "online-store": "Online store",
    "product-page": "Product page",
    rwd: "RWD",
    "kanban-tasks": "Kanban / Tasks",
    dashboard: "Dashboard",
    "online-booking": "Online booking",
    "brand-site": "Brand site",
    "seo-friendly": "SEO friendly",
    "ai-integration": "AI integration",
    "html5-canvas": "HTML5 / Canvas",
    "pdf-generation": "PDF generation",
    marketplace: "Marketplace",
    "job-listings": "Job listings",
    geolocation: "Geolocation",
  },
  pl: {
    "admin-panel": "Panel administracyjny",
    "team-management": "Zarządzanie zespołem",
    "live-demo": "Live Demo",
    "online-store": "Sklep internetowy",
    "product-page": "Strona produktowa",
    rwd: "RWD",
    "kanban-tasks": "Kanban / Zadania",
    dashboard: "Dashboard",
    "online-booking": "Rezerwacja online",
    "brand-site": "Strona wizerunkowa",
    "seo-friendly": "SEO friendly",
    "ai-integration": "Integracja AI",
    "html5-canvas": "Płótno HTML5 / Canvas",
    "pdf-generation": "Generowanie PDF",
    marketplace: "Marketplace",
    "job-listings": "System ogłoszeń",
    geolocation: "Geolokalizacja",
  },
  de: {
    "admin-panel": "Admin-Panel",
    "team-management": "Teamverwaltung",
    "live-demo": "Live-Demo",
    "online-store": "Online-Shop",
    "product-page": "Produktseite",
    rwd: "RWD",
    "kanban-tasks": "Kanban / Aufgaben",
    dashboard: "Dashboard",
    "online-booking": "Online-Buchung",
    "brand-site": "Image-Website",
    "seo-friendly": "SEO-freundlich",
    "ai-integration": "KI-Integration",
    "html5-canvas": "HTML5 / Canvas",
    "pdf-generation": "PDF-Generierung",
    marketplace: "Marketplace",
    "job-listings": "Anzeigensystem",
    geolocation: "Geolokalisierung",
  },
};

export function getProjectTranslation(locale: Locale, projectId: string) {
  return projectTranslations[locale][projectId] ?? projectTranslations.en[projectId];
}

export function getProjectTechTag(locale: Locale, tagId: ProjectTechTagId) {
  return projectTechTags[locale][tagId] ?? projectTechTags.en[tagId];
}
