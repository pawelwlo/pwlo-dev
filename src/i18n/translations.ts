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

type Copy = {
  localeLabel: string;
  themeLight: string;
  themeDark: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
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
  windowTitles: Record<WindowId, string>;
  desktopIcons: Record<WindowId, { label: string; subtitle: string }>;
  projects: {
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
    photoPlaceholder: string;
    bio: string;
    skills: string[];
  };
  techStack: {
    columns: Array<{ title: string; items: string[] }>;
  };
  speed: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
    cta: string;
    ctaSubject: string;
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
    heroEyebrow: "Minimal OS interface / performance-first delivery",
    heroTitle: "I build ultra-fast, modern websites.",
    heroSubtitle: "Performance-focused web development for businesses and creators.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
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
    windowTitles: {
      projects: "Projects",
      about: "About Pawel",
      tech: "Tech Stack",
      contact: "Contact",
      speed: "Speed Optimization",
      leads: "Leads",
    },
    desktopIcons: {
      projects: { label: "Projects", subtitle: "Case studies" },
      about: { label: "About Me", subtitle: "Profile" },
      tech: { label: "Tech Stack", subtitle: "Toolkit" },
      contact: { label: "Contact", subtitle: "Start a project" },
      speed: { label: "Speed Optimization", subtitle: "Audit lab" },
      leads: { label: "Leads", subtitle: "Protected view" },
    },
    projects: {
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
      photoPlaceholder: "Photo placeholder",
      bio: "I'm Pawel Wlodarczyk, a freelance web developer focused on fast, modern, scalable websites. I work with clients in Germany, Poland, Indonesia, and worldwide.",
      skills: [
        "Frontend (React, Next.js, Tailwind)",
        "Backend (Node.js, Express, Supabase)",
        "Performance optimization",
        "SEO & Core Web Vitals",
        "UI/UX prototyping",
      ],
    },
    techStack: {
      columns: [
        { title: "Frontend", items: ["React", "Next.js", "Tailwind", "TypeScript"] },
        { title: "Backend", items: ["Node.js", "Express", "Supabase", "PostgreSQL"] },
        { title: "Tools", items: ["Git", "Vercel", "Docker", "Figma"] },
        { title: "Specialties", items: ["Speed optimization", "Clean architecture", "Accessibility"] },
      ],
    },
    speed: {
      eyebrow: "Performance philosophy",
      title: "Speed is a feature.",
      description: "Fast sites convert better, rank better, and feel more trustworthy. Every layer is designed for clarity, low overhead, and measurable outcomes.",
      items: ["Image compression", "Lazy loading", "Code splitting", "CDN delivery", "Lighthouse audits", "SEO structure"],
      cta: "Request a free speed audit",
      ctaSubject: "Free speed audit",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something fast.",
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
      eyebrow: "Protected leads",
      title: "Latest inquiries",
      description: "Load recent contact submissions with an admin key. This window stays private behind an Edge Function check.",
      adminKeyLabel: "Admin key",
      adminKeyPlaceholder: "Enter admin key",
      loadLeads: "Load leads",
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
  },
  pl: {
    localeLabel: "Jezyk",
    themeLight: "Tryb jasny",
    themeDark: "Tryb ciemny",
    heroEyebrow: "Minimalny interfejs OS / realizacja z naciskiem na wydajnosc",
    heroTitle: "Tworze ultraszybkie, nowoczesne strony internetowe.",
    heroSubtitle: "Web development nastawiony na wydajnosc dla firm i tworcow.",
    viewProjects: "Zobacz projekty",
    contactMe: "Skontaktuj sie",
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
    windowTitles: {
      projects: "Projekty",
      about: "O Pawle",
      tech: "Stack technologiczny",
      contact: "Kontakt",
      speed: "Optymalizacja szybkosci",
      leads: "Leady",
    },
    desktopIcons: {
      projects: { label: "Projekty", subtitle: "Case studies" },
      about: { label: "O mnie", subtitle: "Profil" },
      tech: { label: "Tech stack", subtitle: "Narzedia" },
      contact: { label: "Kontakt", subtitle: "Rozpocznij projekt" },
      speed: { label: "Optymalizacja", subtitle: "Lab audytu" },
      leads: { label: "Leady", subtitle: "Widok chroniony" },
    },
    projects: {
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
      photoPlaceholder: "Miejsce na zdjecie",
      bio: "Jestem Pawel Wlodarczyk, freelance web developerem skupionym na szybkich, nowoczesnych i skalowalnych stronach. Wspolpracuje z klientami z Niemiec, Polski, Indonezji i z calego swiata.",
      skills: [
        "Frontend (React, Next.js, Tailwind)",
        "Backend (Node.js, Express, Supabase)",
        "Optymalizacja wydajnosci",
        "SEO i Core Web Vitals",
        "Prototypowanie UI/UX",
      ],
    },
    techStack: {
      columns: [
        { title: "Frontend", items: ["React", "Next.js", "Tailwind", "TypeScript"] },
        { title: "Backend", items: ["Node.js", "Express", "Supabase", "PostgreSQL"] },
        { title: "Narzedia", items: ["Git", "Vercel", "Docker", "Figma"] },
        { title: "Specjalizacje", items: ["Optymalizacja szybkosci", "Czysta architektura", "Dostepnosc"] },
      ],
    },
    speed: {
      eyebrow: "Filozofia wydajnosci",
      title: "Szybkosc to funkcja.",
      description: "Szybkie strony lepiej konwertuja, lepiej sie pozycjonuja i budza wieksze zaufanie. Kazda warstwa jest projektowana pod klarownosc, niski narzut i mierzalne wyniki.",
      items: ["Kompresja obrazow", "Lazy loading", "Code splitting", "Dostarczanie przez CDN", "Audyty Lighthouse", "Struktura SEO"],
      cta: "Popros o bezplatny audyt szybkosci",
      ctaSubject: "Bezplatny audyt szybkosci",
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
  },
  de: {
    localeLabel: "Sprache",
    themeLight: "Heller Modus",
    themeDark: "Dunkler Modus",
    heroEyebrow: "Minimales OS-Interface / performance-orientierte Umsetzung",
    heroTitle: "Ich entwickle ultraschnelle, moderne Websites.",
    heroSubtitle: "Performance-orientierte Webentwicklung fuer Unternehmen und Creator.",
    viewProjects: "Projekte ansehen",
    contactMe: "Kontakt aufnehmen",
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
    windowTitles: {
      projects: "Projekte",
      about: "Ueber Pawel",
      tech: "Tech Stack",
      contact: "Kontakt",
      speed: "Speed-Optimierung",
      leads: "Leads",
    },
    desktopIcons: {
      projects: { label: "Projekte", subtitle: "Case Studies" },
      about: { label: "Ueber mich", subtitle: "Profil" },
      tech: { label: "Tech Stack", subtitle: "Toolkit" },
      contact: { label: "Kontakt", subtitle: "Projekt starten" },
      speed: { label: "Optimierung", subtitle: "Audit-Lab" },
      leads: { label: "Leads", subtitle: "Geschuetzte Ansicht" },
    },
    projects: {
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
      photoPlaceholder: "Platzhalter fuer Foto",
      bio: "Ich bin Pawel Wlodarczyk, freiberuflicher Webentwickler mit Fokus auf schnelle, moderne und skalierbare Websites. Ich arbeite mit Kunden aus Deutschland, Polen, Indonesien und weltweit.",
      skills: [
        "Frontend (React, Next.js, Tailwind)",
        "Backend (Node.js, Express, Supabase)",
        "Performance-Optimierung",
        "SEO und Core Web Vitals",
        "UI/UX-Prototyping",
      ],
    },
    techStack: {
      columns: [
        { title: "Frontend", items: ["React", "Next.js", "Tailwind", "TypeScript"] },
        { title: "Backend", items: ["Node.js", "Express", "Supabase", "PostgreSQL"] },
        { title: "Tools", items: ["Git", "Vercel", "Docker", "Figma"] },
        { title: "Spezialisierungen", items: ["Speed-Optimierung", "Saubere Architektur", "Barrierefreiheit"] },
      ],
    },
    speed: {
      eyebrow: "Performance-Philosophie",
      title: "Speed ist ein Feature.",
      description: "Schnelle Websites konvertieren besser, ranken besser und wirken vertrauenswuerdiger. Jede Ebene ist auf Klarheit, geringe Last und messbare Ergebnisse ausgelegt.",
      items: ["Bildkomprimierung", "Lazy Loading", "Code Splitting", "CDN-Auslieferung", "Lighthouse-Audits", "SEO-Struktur"],
      cta: "Kostenlosen Speed-Audit anfragen",
      ctaSubject: "Kostenloser Speed-Audit",
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
      drag: (title) => `${title} verschieben`,
      minimize: "Fenster minimieren",
      maximize: "Fenster maximieren",
      restore: "Fenster wiederherstellen",
      close: (title) => `${title} schliessen`,
      resize: (title) => `${title} in der Groesse aendern`,
    },
  },
};

export function getProjectTranslation(locale: Locale, projectId: string) {
  return projectTranslations[locale][projectId] ?? projectTranslations.en[projectId];
}
