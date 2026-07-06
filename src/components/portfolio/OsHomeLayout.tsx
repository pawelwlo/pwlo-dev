import {
  AppWindow,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  FolderKanban,
  Gauge,
  Globe,
  Layers3,
  Mail,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ComponentType, type FormEvent } from "react";

import { LeadsWindow } from "@/components/portfolio/LeadsWindow";
import { AboutWindow, ContactWindow, TechStackWindow } from "@/components/portfolio/UtilityWindows";
import { projects } from "@/data/portfolioData";
import { getProjectTranslation, type Copy, type Locale } from "@/i18n/translations";

type OsAppId =
  | "home"
  | "projects"
  | "openSource"
  | "seo"
  | "contact"
  | "tech"
  | "about"
  | "leads"
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
  adminKey: string;
  onAdminKeyChange: (value: string) => void;
  onRefreshLeads: () => void;
  isLoadingLeads: boolean;
  leadsError: string | null;
  leads: Array<{
    id: string;
    name: string;
    email: string;
    project_type: string;
    message: string;
    locale: string;
    page_origin: string | null;
    submitted_at: string;
    is_spam: boolean;
    spam_reason: string | null;
    alert_sent_at: string | null;
    alert_error: string | null;
    submission_duration_ms: number | null;
  }>;
  onChangeLocale: (locale: Locale) => void;
  onToggleTheme: () => void;
  isDark: boolean;
};

type OsIconConfig = {
  id: Exclude<OsAppId, "home">;
  label: string;
  icon: ComponentType<{ size?: number | string }>;
  tintClass: string;
};

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
  adminKey,
  onAdminKeyChange,
  onRefreshLeads,
  isLoadingLeads,
  leadsError,
  leads,
  onChangeLocale,
  onToggleTheme,
  isDark,
}: OsHomeLayoutProps) {
  const [activeApp, setActiveApp] = useState<OsAppId>("home");
  const [appTransitionState, setAppTransitionState] = useState<"idle" | "opening" | "closing">("idle");
  const [projectView, setProjectView] = useState<"grid" | "detail">("grid");
  const transitionTimerRef = useRef<number | null>(null);

  const isTablet = typeof window !== "undefined" ? window.innerWidth >= 768 : false;
  const homeTitle = isTablet ? copy.osLayout.tabletTitle : copy.osLayout.mobileTitle;

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );

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
      tintClass: "os-icon-tint-pink",
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
      tintClass: "os-icon-tint-amber",
    },
    {
      id: "leads",
      label: copy.osLayout.apps.leads,
      icon: ShieldCheck,
      tintClass: "os-icon-tint-slate",
    },
    {
      id: "settings",
      label: copy.osLayout.apps.settings,
      icon: Settings,
      tintClass: "os-icon-tint-gray",
    },
  ];

  const dockIcons: OsIconConfig[] = isTablet
    ? [
        icons.find((item) => item.id === "projects")!,
        icons.find((item) => item.id === "openSource")!,
        icons.find((item) => item.id === "seo")!,
        icons.find((item) => item.id === "contact")!,
        icons.find((item) => item.id === "tech")!,
      ]
    : [
        icons.find((item) => item.id === "projects")!,
        icons.find((item) => item.id === "seo")!,
        icons.find((item) => item.id === "contact")!,
        icons.find((item) => item.id === "openSource")!,
      ];

  const openSourceCards = useMemo(
    () =>
      copy.techStack.columns.map((column, index) => {
        const iconConfig = [
          { icon: AppWindow, tintClass: "os-icon-tint-blue" },
          { icon: Sparkles, tintClass: "os-icon-tint-pink" },
          { icon: Gauge, tintClass: "os-icon-tint-green" },
          { icon: ShieldCheck, tintClass: "os-icon-tint-slate" },
        ][index % 4];

        return {
          ...column,
          description: column.items.slice(0, 2).join(" • "),
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

  const openFromSidebar = (appId: Exclude<OsAppId, "home">) => {
    openApp(appId);
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
    if (itemId === "projects") {
      return copy.osLayout.dock.projects;
    }

    if (itemId === "contact") {
      return copy.osLayout.dock.contact;
    }

    if (itemId === "seo") {
      return copy.osLayout.dock.seo;
    }

    return copy.osLayout.dock.openSource;
  };

  const navTitle = activeApp === "home" ? homeTitle : copy.osLayout.apps[activeApp as Exclude<OsAppId, "home">];
  const isHomeActive = activeApp === "home";

  return (
    <main className="os-shell" data-os-mode={activeApp === "home" ? "home" : "app"}>
      <div className="os-wallpaper" aria-hidden="true" />

      <header className="os-topbar" aria-label={homeTitle}>
        <div className="os-topbar-left">{localTime}</div>
        <div className="os-topbar-title">
          <img className="os-topbar-logo" src="/logo.png" alt="" aria-hidden="true" />
          <span>{navTitle}</span>
        </div>
        <div className="os-topbar-right" aria-label={copy.statusBar.online} title={copy.statusBar.online}>
          <span className="os-status-dot" aria-hidden="true" />
        </div>
      </header>

      <div className={`os-home-surface ${isHomeActive ? "" : "os-home-surface-hidden"}`} aria-hidden={!isHomeActive}>
        <div className="os-home-layout">
          {isTablet ? (
            <aside className="os-sidebar ios-animate" aria-label="System Navigation">
              <div className="os-sidebar-head">
                <span className="eyebrow">{homeTitle}</span>
                <h2>pwloOS</h2>
              </div>

              <div className="os-sidebar-list">
                {icons.slice(0, 5).map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      className="os-sidebar-link"
                      type="button"
                      onClick={() => openFromSidebar(item.id)}
                    >
                      <span className={`os-sidebar-link-icon ${item.tintClass}`} aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="os-sidebar-controls">
                <button
                  className={`secondary-button ${locale === "en" ? "locale-toggle-button-active" : ""}`}
                  type="button"
                  onClick={() => onChangeLocale("en")}
                >
                  EN
                </button>
                <button
                  className={`secondary-button ${locale === "pl" ? "locale-toggle-button-active" : ""}`}
                  type="button"
                  onClick={() => onChangeLocale("pl")}
                >
                  PL
                </button>
                <button
                  className={`secondary-button ${locale === "de" ? "locale-toggle-button-active" : ""}`}
                  type="button"
                  onClick={() => onChangeLocale("de")}
                >
                  DE
                </button>
                <button className="primary-button" type="button" onClick={onToggleTheme}>
                  {isDark ? copy.themeLight : copy.themeDark}
                </button>
              </div>
            </aside>
          ) : null}

          <section className="os-home-grid" aria-label={homeTitle}>
            {icons.map((item) => {
              const Icon = item.icon;

              return (
                <button key={item.id} className="os-app-icon" type="button" onClick={() => openApp(item.id)}>
                  <span className={`os-app-glyph ${item.tintClass}`} aria-hidden="true">
                    <Icon size={isTablet ? 36 : 30} />
                  </span>
                  <span className="os-app-label">{item.label}</span>
                </button>
              );
            })}
          </section>
        </div>

        {isHomeActive ? (
          <nav className="os-dock" aria-label="Dock">
            {dockIcons.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className="os-dock-icon"
                  type="button"
                  onClick={() => openApp(item.id)}
                  aria-label={getDockLabel(item.id)}
                >
                  <span className={`os-app-glyph ${item.tintClass}`} aria-hidden="true">
                    <Icon size={isTablet ? 24 : 22} />
                  </span>
                </button>
              );
            })}
          </nav>
        ) : null}
      </div>

      {!isHomeActive ? (
        <div className={overlayClassName} aria-label={navTitle}>
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
                    <div className="os-card-grid">
                      {projects.map((project) => {
                        const projectCopy = getProjectTranslation(locale, project.id);

                        return (
                          <button
                            key={project.id}
                            className="os-card os-project-card"
                            type="button"
                            onClick={() => {
                              onSelectProject(project.id);
                              setProjectView("detail");
                              scrollToTop();
                            }}
                          >
                            <div className="os-project-thumb" aria-hidden="true">
                              <img className="os-project-thumb-image" src={project.screenshotSrc} alt="" />
                            </div>
                            <div className="os-card-body">
                              <div className="os-card-heading">
                                <h3>{projectCopy.title}</h3>
                                <span className="performance-pill">{projectCopy.performanceBadge}</span>
                              </div>
                              <p>{projectCopy.description}</p>
                              <div className="os-tag-row">
                                {project.tech.slice(0, 3).map((tag) => (
                                  <span key={tag} className="os-tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
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
              <div className="os-card-grid">
                {openSourceCards.map((column) => {
                  const Icon = column.icon;

                  return (
                    <article key={column.title} className="os-card os-tool-card">
                      <div className="os-card-heading">
                        <div className="os-tool-heading">
                          <span className={`os-tool-icon ${column.tintClass}`} aria-hidden="true">
                            <Icon size={18} />
                          </span>
                          <div>
                            <h3>{column.title}</h3>
                            <p>{column.description}</p>
                          </div>
                        </div>
                        <ChevronRight size={16} />
                      </div>
                      <ul className="bullet-list">
                        {column.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
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
                  <p>{copy.speed.description}</p>
                  <ul className="bullet-list">
                    {copy.speed.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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

            {activeApp === "leads" ? (
              <div className="os-app-window">
                <LeadsWindow
                  copy={copy.leads}
                  adminKey={adminKey}
                  onAdminKeyChange={onAdminKeyChange}
                  onRefresh={onRefreshLeads}
                  isLoading={isLoadingLeads}
                  errorMessage={leadsError}
                  leads={leads}
                />
              </div>
            ) : null}

            {activeApp === "settings" ? (
              <div className="os-settings">
                <article className="os-card os-settings-card">
                  <div className="os-settings-row">
                    <span>{copy.localeLabel}</span>
                    <button className="secondary-button" type="button" onClick={() => onChangeLocale("en")}>
                      EN
                    </button>
                    <button className="secondary-button" type="button" onClick={() => onChangeLocale("pl")}>
                      PL
                    </button>
                    <button className="secondary-button" type="button" onClick={() => onChangeLocale("de")}>
                      DE
                    </button>
                  </div>
                </article>

                <article className="os-card os-settings-card">
                  <div className="os-settings-row">
                    <span>{copy.osLayout.settings}</span>
                    <button className="primary-button" type="button" onClick={onToggleTheme}>
                      {isDark ? copy.themeLight : copy.themeDark}
                    </button>
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
