import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  FolderKanban,
  Gauge,
  Globe,
  Layers3,
  Mail,
  Settings,
  BadgePercent,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType, type FormEvent } from "react";

import { BootSequence } from "@/components/BootSequence";
import { NeonHero } from "@/components/portfolio/NeonHero";
import { OffersWindow } from "@/components/portfolio/OffersWindow";
import { ProjectsWindow } from "@/components/portfolio/ProjectsWindow";
import { AboutWindow, ContactWindow, SpeedTestForm, TechStackWindow } from "@/components/portfolio/UtilityWindows";
import { TechIcon } from "@/components/portfolio/TechIcons";
import { MobileBackground } from "@/components/MobileBackground";
import { MobileDock } from "@/components/MobileDock";
import { projects } from "@/data/portfolioData";
import { getProjectTranslation, localeOptions, type Copy, type Locale } from "@/i18n/translations";
import {
  clearLocaleBootSession,
  hasPendingLocaleBoot,
  localeBootMessageStorageKey,
} from "@/lib/localeBoot";

type OsAppId =
  | "home"
  | "projects"
  | "openSource"
  | "seo"
  | "contact"
  | "tech"
  | "about"
  | "offers"
  | "settings";

type OsHomeLayoutProps = {
  locale: Locale;
  copy: Copy;
  localTime: string;
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  onSubmitContact: (event: FormEvent<HTMLFormElement>) => void;
  isSubmittingInquiry: boolean;
  contactStatusMessage: string | null;
  contactStatusTone: "success" | "error" | null;
  onChangeLocale: (locale: Locale) => void;
};

type OsIconConfig = {
  id: Exclude<OsAppId, "home">;
  label: string;
  icon: ComponentType<{ size?: number | string }>;
  tintClass: string;
};

const privacyConsentStorageKey = "pwlo-privacy-accepted-v2";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function OsHomeLayout({
  locale,
  copy,
  localTime,
  selectedProjectId,
  onSelectProject,
  onSubmitContact,
  isSubmittingInquiry,
  contactStatusMessage,
  contactStatusTone,
  onChangeLocale,
}: OsHomeLayoutProps) {
  const [activeApp, setActiveApp] = useState<OsAppId>("home");
  const [appTransitionState, setAppTransitionState] = useState<"idle" | "opening" | "closing">("idle");
  const [projectView, setProjectView] = useState<"grid" | "detail">("grid");
  const [openSourceView, setOpenSourceView] = useState<"list" | "detail">("list");
  const [selectedOpenSource, setSelectedOpenSource] = useState<any>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const unlockTimerRef = useRef<number | null>(null);
  const [lockscreenState, setLockscreenState] = useState<"locked" | "unlocking" | "booting" | "unlocked">(() => {
    if (typeof window === "undefined") {
      return "locked";
    }

    try {
      if (hasPendingLocaleBoot()) {
        return "booting";
      }
      return window.localStorage.getItem(privacyConsentStorageKey) === "true" ? "unlocked" : "locked";
    } catch {
      return "locked";
    }
  });
  const [bootMessage, setBootMessage] = useState<string>(() => {
    if (typeof window === "undefined") {
      return copy.bootMessages.system;
    }

    try {
      return window.sessionStorage.getItem(localeBootMessageStorageKey) || copy.bootMessages.system;
    } catch {
      return copy.bootMessages.system;
    }
  });
  const [isBootExiting, setIsBootExiting] = useState(false);
  const [isPrivacyInfoExpanded, setIsPrivacyInfoExpanded] = useState(false);
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }

    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateTabletMode = () => {
      setIsTablet(mediaQuery.matches);
    };

    updateTabletMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateTabletMode);
      return () => mediaQuery.removeEventListener("change", updateTabletMode);
    }

    mediaQuery.addListener(updateTabletMode);
    return () => mediaQuery.removeListener(updateTabletMode);
  }, []);
  const homeTitle = isTablet ? copy.osLayout.tabletTitle : copy.osLayout.mobileTitle;
  const isLockscreenVisible = lockscreenState !== "unlocked";

  const completeMobileBootSequence = useCallback(() => {
    clearLocaleBootSession();
    setIsBootExiting(false);
    setLockscreenState("unlocked");
  }, []);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );
  const lockscreenNow = new Date();
  const lockscreenDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(lockscreenNow);
  const lockscreenDay = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(lockscreenNow);
  const lockscreenWeekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(lockscreenNow);
  const lockscreenMonthShort = new Intl.DateTimeFormat(locale, { month: "short" }).format(lockscreenNow);
  const lockscreenMonthYear = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(lockscreenNow);

  const icons: OsIconConfig[] = [
    {
      id: "projects",
      label: copy.osLayout.apps.projects,
      icon: FolderKanban,
      tintClass: "os-icon-tint-blue",
    },
    {
      id: "openSource",
      label: copy.osLayout.apps.openSource,
      icon: Globe,
      tintClass: "os-icon-tint-indigo",
    },
    {
      id: "seo",
      label: copy.osLayout.apps.seo,
      icon: Gauge,
      tintClass: "os-icon-tint-green",
    },
    {
      id: "contact",
      label: copy.osLayout.apps.contact,
      icon: Mail,
      tintClass: "os-icon-tint-amber",
    },
    {
      id: "tech",
      label: copy.osLayout.apps.tech,
      icon: Layers3,
      tintClass: "os-icon-tint-violet",
    },
    {
      id: "about",
      label: copy.osLayout.apps.about,
      icon: UserRound,
      tintClass: "os-icon-tint-gray",
    },
    {
      id: "offers",
      label: copy.osLayout.apps.offers,
      icon: BadgePercent,
      tintClass: "os-icon-tint-green",
    },
    {
      id: "settings",
      label: copy.osLayout.apps.settings,
      icon: Settings,
      tintClass: "os-icon-tint-gray",
    },
  ];

  const topbarIcons: OsIconConfig[] = [
    icons.find((item) => item.id === "openSource")!,
    icons.find((item) => item.id === "settings")!,
  ];

  const dockIcons: OsIconConfig[] = isTablet
    ? [
      icons.find((item) => item.id === "projects")!,
      icons.find((item) => item.id === "about")!,
      icons.find((item) => item.id === "tech")!,
      icons.find((item) => item.id === "contact")!,
      icons.find((item) => item.id === "seo")!,
      icons.find((item) => item.id === "offers")!,
    ]
    : [
      icons.find((item) => item.id === "projects")!,
      icons.find((item) => item.id === "about")!,
      icons.find((item) => item.id === "contact")!,
      icons.find((item) => item.id === "offers")!,
      icons.find((item) => item.id === "seo")!,
    ];

  const openSourceCards = useMemo(
    () =>
      copy.techStack.columns.map((column, index) => {
        const iconConfig = [
          { icon: AppWindow, tintClass: "os-icon-tint-blue" },
          { icon: Sparkles, tintClass: "os-icon-tint-violet" },
          { icon: Gauge, tintClass: "os-icon-tint-green" },
          { icon: ShieldCheck, tintClass: "os-icon-tint-gray" },
        ][index % 4];

        return {
          ...column,
          description: column.items.slice(0, 2).map(item => item.name).join(" • "),
          icon: iconConfig.icon,
          tintClass: iconConfig.tintClass,
        };
      }),
    [copy.techStack.columns],
  );

  useEffect(
    () => () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (unlockTimerRef.current) {
        window.clearTimeout(unlockTimerRef.current);
      }
    },
    [],
  );

  const openApp = (appId: OsAppId) => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    setActiveApp(appId);
    setProjectView("grid");
    setAppTransitionState("opening");
    scrollToTop();

    transitionTimerRef.current = window.setTimeout(() => {
      setAppTransitionState("idle");
    }, 280);
  };

  const closeApp = () => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    scrollToTop();
    setAppTransitionState("closing");

    transitionTimerRef.current = window.setTimeout(() => {
      setActiveApp("home");
      setProjectView("grid");
      setAppTransitionState("idle");
    }, 240);
  };

  const acceptPrivacyNotice = () => {
    if (unlockTimerRef.current) {
      window.clearTimeout(unlockTimerRef.current);
    }

    try {
      window.localStorage.setItem(privacyConsentStorageKey, "true");
    } catch {
      // Ignore storage errors and continue to unlock the UI.
    }

    setIsPrivacyInfoExpanded(false);
    setLockscreenState("unlocking");
    unlockTimerRef.current = window.setTimeout(() => {
      setLockscreenState("booting");
    }, 380);
  };

  const appShellClassName =
    appTransitionState === "closing"
      ? "os-app-shell os-app-shell-closing"
      : appTransitionState === "opening"
        ? "os-app-shell os-app-shell-opening"
        : "os-app-shell";

  const overlayClassName =
    appTransitionState === "closing"
      ? "os-app-overlay os-app-overlay-closing"
      : appTransitionState === "opening"
        ? "os-app-overlay os-app-overlay-opening"
        : "os-app-overlay";

  const getDockLabel = (itemId: OsIconConfig["id"]) => {
    return copy.osLayout.apps[itemId] ?? copy.osLayout.dock.openSource;
  };

  const navTitle = activeApp === "home" ? homeTitle : copy.osLayout.apps[activeApp as Exclude<OsAppId, "home">];
  const isHomeActive = activeApp === "home";

  return (
    <main
      className={`os-shell ${isLockscreenVisible ? "os-shell-locked" : ""}${lockscreenState === "booting" ? " os-shell-booting" : ""}${isBootExiting ? " os-shell-boot-exit" : ""}`}
      data-os-mode={activeApp === "home" ? "home" : "app"}
    >
      <MobileBackground />

      {lockscreenState === "booting" && (
        <BootSequence
          message={bootMessage}
          onExitStart={() => setIsBootExiting(true)}
          onComplete={completeMobileBootSequence}
        />
      )}

      {isLockscreenVisible && lockscreenState !== "booting" ? (
        <div
          className={`os-lockscreen ${lockscreenState === "unlocking" ? "os-lockscreen-unlocking" : ""}`}
          aria-label={copy.osLayout.lockscreen.title}
        >
          <div className="os-lockscreen-header">
            <div className="os-lockscreen-clock" aria-live="polite">
              <div className="os-lockscreen-time">{localTime}</div>
              <div className="os-lockscreen-date">{lockscreenDate}</div>
            </div>

            <section className="os-date-widget" aria-label={lockscreenDate}>
              <div className="os-date-card">
                <div className="os-date-card-header">
                  <div>
                    <div className="os-date-weekday">{lockscreenWeekday}</div>
                    <div className="os-date-day">{lockscreenDay}</div>
                  </div>
                  <span className="os-date-icon-shell" aria-hidden="true">
                    <CalendarDays className="os-date-icon" size={26} />
                  </span>
                </div>

                <div className="os-date-card-footer">
                  <span>{lockscreenMonthYear}</span>
                </div>
              </div>
            </section>
          </div>

          <section className="os-lockscreen-panel" aria-label={copy.osLayout.lockscreen.title}>
            <div className="os-lockscreen-panel-body">
              <div className="os-lockscreen-panel-copy">
                <span className="eyebrow">pwloOS</span>
                <h2>{copy.osLayout.lockscreen.title}</h2>
                <p>{copy.osLayout.lockscreen.message}</p>
              </div>

              {isPrivacyInfoExpanded ? (
                <p className="os-lockscreen-detail">{copy.osLayout.lockscreen.infoDetail}</p>
              ) : null}

              <div className="os-lockscreen-actions">
                <button className="os-lockscreen-button os-lockscreen-button-primary" type="button" onClick={acceptPrivacyNotice}>
                  {copy.osLayout.lockscreen.accept}
                </button>
                <button
                  className="os-lockscreen-button os-lockscreen-button-secondary"
                  type="button"
                  onClick={() => setIsPrivacyInfoExpanded((current) => !current)}
                  aria-expanded={isPrivacyInfoExpanded}
                >
                  {copy.osLayout.lockscreen.moreInfo}
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      <header className="os-topbar mobile-status-bar" aria-label={homeTitle} aria-hidden={isLockscreenVisible}>
        <div className="os-topbar-left" aria-label={lockscreenDate}>
          <span className="os-topbar-date">
            {lockscreenDay} {lockscreenMonthShort}
          </span>
          <span className="os-topbar-time">{localTime}</span>
        </div>
        <div className="os-topbar-title">
          <span>{navTitle}</span>
        </div>
        <div className="os-topbar-right os-topbar-actions">
          {topbarIcons.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={`os-topbar-action${activeApp === item.id ? " os-topbar-action--active" : ""}`}
                aria-label={item.label}
                disabled={isLockscreenVisible}
                onClick={() => openApp(item.id)}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </header>

      <div
        className={`os-home-surface ${isHomeActive ? "" : "os-home-surface-hidden"}`}
        aria-hidden={!isHomeActive || isLockscreenVisible}
      >
        <div className="os-home-layout os-home-layout--hero">
          {lockscreenState === "unlocked" ? (
            <div className="os-home-brand-slot">
              <NeonHero
                variant="mobile"
                copy={copy.neonHero}
                onExplore={() => openApp("projects")}
                onContact={() => openApp("contact")}
              />
            </div>
          ) : null}
        </div>
      </div>

      {isHomeActive ? (
        <MobileDock
          items={dockIcons}
          activeAppId={activeApp}
          onItemClick={(id) => openApp(id as Exclude<OsAppId, "home">)}
          getLabel={getDockLabel}
        />
      ) : null}

      {!isHomeActive && lockscreenState === "unlocked" ? (
        <div className={overlayClassName} aria-label={navTitle} aria-hidden={isLockscreenVisible}>
          <section className={appShellClassName}>
            <header className="os-app-nav">
              <button className="os-back" type="button" onClick={closeApp}>
                <ArrowLeft size={18} />
                <span>{copy.osLayout.back}</span>
              </button>
              <div className="os-app-nav-title">{navTitle}</div>
              <span className="os-app-nav-spacer" aria-hidden="true" />
            </header>

            <div className="os-app-body">
              {activeApp === "projects" ? (
                <div className="os-projects">
                  {projectView === "grid" ? (
                    <ProjectsWindow
                      locale={locale}
                      copy={{
                        title: copy.projects.title,
                        openProjectAction: copy.projects.openProjectAction,
                      }}
                      onSelectProject={(projectId) => {
                        onSelectProject(projectId);
                        setProjectView("detail");
                        scrollToTop();
                      }}
                    />
                  ) : (
                    <div className="os-project-detail">
                      <button className="os-inline-back" type="button" onClick={() => setProjectView("grid")}>
                        <ArrowLeft size={16} />
                        <span>{copy.osLayout.apps.projects}</span>
                      </button>

                      <article className="os-card os-project-detail-card">
                        <div className="os-project-detail-head">
                          <div>
                            <span className="eyebrow">{copy.projects.caseStudy}</span>
                            <h2>{getProjectTranslation(locale, selectedProject.id).title}</h2>
                          </div>
                          <a className="project-domain-link" href={selectedProject.previewUrl} target="_blank" rel="noreferrer">
                            {selectedProject.domain}
                            <ArrowUpRight size={14} />
                          </a>
                        </div>

                        <div className="os-project-detail-grid">
                          <div className="os-card os-subcard">
                            <span>{copy.projects.before}</span>
                            <strong>{getProjectTranslation(locale, selectedProject.id).caseStudy.before}</strong>
                          </div>
                          <div className="os-card os-subcard">
                            <span>{copy.projects.after}</span>
                            <strong>{getProjectTranslation(locale, selectedProject.id).caseStudy.after}</strong>
                          </div>
                          <div className="os-card os-subcard os-subcard-full">
                            <h3>{copy.projects.seoImprovements}</h3>
                            <ul className="bullet-list">
                              {getProjectTranslation(locale, selectedProject.id).caseStudy.seo.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="os-card os-subcard os-subcard-full">
                            <h3>{copy.projects.deploymentStack}</h3>
                            <ul className="bullet-list">
                              {getProjectTranslation(locale, selectedProject.id).caseStudy.deployment.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </article>
                    </div>
                  )}
                </div>
              ) : null}

              {activeApp === "openSource" ? (
                <div className="os-projects">
                  {openSourceView === "list" ? (
                    <div className="os-stack-list">
                      {openSourceCards.map((column) => (
                        <button
                          key={column.title}
                          className="os-stack-card"
                          type="button"
                          onClick={() => {
                            setSelectedOpenSource(column);
                            setOpenSourceView("detail");
                            scrollToTop();
                          }}
                        >
                          <h3 className="os-stack-title">{column.title}</h3>
                          <div className="os-stack-tools">
                            {column.items.map((item: any) => (
                              <p key={item.name} className="os-stack-tool">
                                {item.name}
                              </p>
                            ))}
                          </div>
                          <div className="os-stack-caption">Tools I use for {column.title.toLowerCase()}</div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="os-project-detail">
                      <button className="os-inline-back" type="button" onClick={() => setOpenSourceView("list")}>
                        <ArrowLeft size={16} />
                        <span>{copy.osLayout.apps.openSource}</span>
                      </button>

                      <article className="os-card os-project-detail-card">
                        <div className="os-project-detail-head">
                          <div>
                            <span className="eyebrow">Tech Stack</span>
                            <h2>{selectedOpenSource?.title}</h2>
                          </div>
                        </div>

                        <div className="os-project-detail-content">
                          <div className="stack-card">
                            {selectedOpenSource?.items.map((item) => (
                              <div key={item.name} className="tech-item" style={{ marginBottom: "14px" }}>
                                <TechIcon id={item.icon} />
                                <div className="tech-item-copy">
                                  <div className="tech-item-name">{item.name}</div>
                                  <div className="tech-item-purpose">{item.purpose}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="os-project-actions">
                          <button
                            className="primary-button button-link"
                            type="button"
                            onClick={() => {
                              setActiveApp("projects");
                            }}
                          >
                            View projects using this
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </article>
                    </div>
                  )}
                </div>
              ) : null}

              {activeApp === "seo" ? (
                <div className="os-seo">
                  <article className="os-card os-seo-card">
                    <span className="eyebrow">{copy.speedPanelLabel}</span>
                    <h2>{copy.speedPanelTitle}</h2>
                    <div className="os-metric-row">
                      <span className="metric-badge">{copy.loadsUnderSecond}</span>
                      <span className="metric-badge">{copy.coreWebVitals}</span>
                    </div>
                  </article>

                  <article className="os-card os-seo-card">
                    <h3>{copy.speed.title}</h3>
                    <p>{copy.speed.subtitle}</p>
                    <p>{copy.speed.description}</p>
                    <ul className="bullet-list" style={{ marginBottom: "16px" }}>
                      {copy.speed.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <SpeedTestForm locale={locale} copy={copy} />
                  </article>
                </div>
              ) : null}

              {activeApp === "contact" ? (
                <div className="os-contact">
                  <ContactWindow
                    copy={copy}
                    onSubmit={onSubmitContact}
                    isSubmitting={isSubmittingInquiry}
                    statusMessage={contactStatusMessage}
                    statusTone={contactStatusTone}
                  />
                </div>
              ) : null}

              {activeApp === "tech" ? (
                <div className="os-app-window">
                  <TechStackWindow copy={copy} locale={locale} />
                </div>
              ) : null}

              {activeApp === "about" ? (
                <div className="os-app-window">
                  <AboutWindow copy={copy} locale={locale} />
                </div>
              ) : null}

              {activeApp === "offers" ? (
                <div className="os-app-window">
                  <OffersWindow
                    copy={copy.offers}
                    onContactCta={() => setActiveApp("contact")}
                  />
                </div>
              ) : null}

              {activeApp === "settings" ? (
                <div className="os-settings">
                  <article className="os-card os-settings-card">
                    <div className="os-settings-section">
                      <h4>{copy.localeLabel}</h4>
                      <div className="os-segmented-control">
                        {localeOptions.map((opt) => (
                          <button
                            key={opt.value}
                            className={`os-segment ${locale === opt.value ? "active" : ""}`}
                            type="button"
                            onClick={() => {
                              if (opt.value === locale) return;
                              onChangeLocale(opt.value);
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
