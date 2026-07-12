import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  FolderKanban,
  Gauge,
  Globe,
  Layers3,
  Mail,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SunMedium,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ComponentType, type FormEvent } from "react";

import { LeadsWindow } from "@/components/portfolio/LeadsWindow";
import { AboutWindow, ContactWindow, SpeedTestForm, TechStackWindow } from "@/components/portfolio/UtilityWindows";
import { MobileAppIcon } from "@/components/MobileIcons";
import { MobileBackground } from "@/components/MobileBackground";
import { MobileDock } from "@/components/MobileDock";
import { projects } from "@/data/portfolioData";
import { getProjectTranslation, localeOptions, type Copy, type Locale } from "@/i18n/translations";

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
};

type OsIconConfig = {
  id: Exclude<OsAppId, "home">;
  label: string;
  icon: ComponentType<{ size?: number | string }>;
  tintClass: string;
};

const privacyConsentStorageKey = "pwlo-privacy-accepted-v2";
const garmischWeatherUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=47.4917&longitude=11.0955&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1";

type WeatherSnapshot = {
  temperature: number;
  high: number;
  low: number;
  weatherCode: number;
};

const defaultWeatherSnapshot: WeatherSnapshot = {
  temperature: 14,
  high: 18,
  low: 9,
  weatherCode: 2,
};

function getWeatherPresentation(weatherCode: number, locale: Locale): { label: string; icon: LucideIcon } {
  if (weatherCode === 0) {
    return {
      label: locale === "pl" ? "Bezchmurnie" : locale === "de" ? "Klar" : "Clear",
      icon: SunMedium,
    };
  }

  if (weatherCode === 1 || weatherCode === 2) {
    return {
      label: locale === "pl" ? "Czesciowe zachmurzenie" : locale === "de" ? "Teilweise bewolkt" : "Partly Cloudy",
      icon: CloudSun,
    };
  }

  if (weatherCode === 3) {
    return {
      label: locale === "pl" ? "Pochmurno" : locale === "de" ? "Bewoelkt" : "Cloudy",
      icon: Cloud,
    };
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return {
      label: locale === "pl" ? "Mgla" : locale === "de" ? "Nebel" : "Fog",
      icon: CloudFog,
    };
  }

  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
    return {
      label: locale === "pl" ? "Deszcz" : locale === "de" ? "Regen" : "Rain",
      icon: CloudRain,
    };
  }

  if ((weatherCode >= 71 && weatherCode <= 77) || weatherCode === 85 || weatherCode === 86) {
    return {
      label: locale === "pl" ? "Snieg" : locale === "de" ? "Schnee" : "Snow",
      icon: CloudSnow,
    };
  }

  if (weatherCode >= 95) {
    return {
      label: locale === "pl" ? "Burza" : locale === "de" ? "Gewitter" : "Storm",
      icon: CloudLightning,
    };
  }

  return {
    label: locale === "pl" ? "Zachmurzenie" : locale === "de" ? "Wolken" : "Cloudy",
    icon: Cloud,
  };
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function BootScreen({ message, onComplete }: { message: string; onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000;
    let animationFrameId: number;
    let timeoutId: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        timeoutId = window.setTimeout(() => {
          onCompleteRef.current();
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="os-boot-screen">
      <div className="boot-content">
        <div className="boot-logo">
          <img src="/logo.png" alt="Boot Logo" width={100} height={100} style={{ objectFit: "contain", opacity: 0.9 }} />
        </div>
        <div className="boot-text">{message}</div>
        <div className="boot-percentage">{progress}%</div>
      </div>
    </div>
  );
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
}: OsHomeLayoutProps) {
  const [activeApp, setActiveApp] = useState<OsAppId>("home");
  const [appTransitionState, setAppTransitionState] = useState<"idle" | "opening" | "closing">("idle");
  const [projectView, setProjectView] = useState<"grid" | "detail">("grid");
  const [openSourceView, setOpenSourceView] = useState<"list" | "detail">("list");
  const [selectedOpenSource, setSelectedOpenSource] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const transitionTimerRef = useRef<number | null>(null);
  const unlockTimerRef = useRef<number | null>(null);
  const [lockscreenState, setLockscreenState] = useState<"locked" | "unlocking" | "booting" | "unlocked">(() => {
    if (typeof window === "undefined") {
      return "locked";
    }

    try {
      if (window.sessionStorage.getItem("pwlo-trigger-boot") === "true") {
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
      return window.sessionStorage.getItem("pwlo-trigger-boot-msg") || copy.bootMessages.system;
    } catch {
      return copy.bootMessages.system;
    }
  });
  const [isPrivacyInfoExpanded, setIsPrivacyInfoExpanded] = useState(false);
  const [weatherSnapshot, setWeatherSnapshot] = useState<WeatherSnapshot>(defaultWeatherSnapshot);
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

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );
  const lockscreenDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
  const weatherPresentation = useMemo(
    () => getWeatherPresentation(weatherSnapshot.weatherCode, locale),
    [weatherSnapshot.weatherCode, locale],
  );
  const WeatherIcon = weatherPresentation.icon;

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

  useEffect(() => {
    let isCancelled = false;

    const loadWeather = async () => {
      try {
        const response = await fetch(garmischWeatherUrl);

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = (await response.json()) as {
          current?: {
            temperature_2m?: number;
            weather_code?: number;
          };
          daily?: {
            temperature_2m_max?: number[];
            temperature_2m_min?: number[];
          };
        };

        if (isCancelled) {
          return;
        }

        setWeatherSnapshot({
          temperature: Math.round(data.current?.temperature_2m ?? defaultWeatherSnapshot.temperature),
          high: Math.round(data.daily?.temperature_2m_max?.[0] ?? defaultWeatherSnapshot.high),
          low: Math.round(data.daily?.temperature_2m_min?.[0] ?? defaultWeatherSnapshot.low),
          weatherCode: data.current?.weather_code ?? defaultWeatherSnapshot.weatherCode,
        });
      } catch {
        if (!isCancelled) {
          setWeatherSnapshot(defaultWeatherSnapshot);
        }
      }
    };

    void loadWeather();
    const refreshId = window.setInterval(() => {
      void loadWeather();
    }, 30 * 60 * 1000);

    return () => {
      isCancelled = true;
      window.clearInterval(refreshId);
    };
  }, []);

  const openApp = (appId: OsAppId) => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    setActiveApp(appId);
    setProjectView("grid");
    setAppTransitionState("opening");
    setSearchQuery("");
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
    <main
      className={`os-shell ${isLockscreenVisible ? "os-shell-locked" : ""}`}
      data-os-mode={activeApp === "home" ? "home" : "app"}
    >
      <MobileBackground />

      {lockscreenState === "booting" && (
        <BootScreen message={bootMessage} onComplete={() => setLockscreenState("unlocked")} />
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

            <section className="os-weather-widget" aria-label="Weather in Garmisch-Partenkirchen">
              <div className="os-weather-card">
                <div className="os-weather-card-header">
                  <div>
                    <div className="os-weather-location">Garmisch-Partenkirchen</div>
                    <div className="os-weather-temperature">{weatherSnapshot.temperature}°C</div>
                  </div>
                  <span className="os-weather-icon-shell" aria-hidden="true">
                    <WeatherIcon className="os-weather-icon" size={26} />
                  </span>
                </div>

                <div className="os-weather-card-footer">
                  <span>{weatherPresentation.label}</span>
                  <span>
                    H:{weatherSnapshot.high}° L:{weatherSnapshot.low}°
                  </span>
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
        <div className="os-topbar-left">{localTime}</div>
        <div className="os-topbar-title">
          <span>{navTitle}</span>
        </div>
        <div className="os-topbar-right" aria-hidden="true" title={copy.statusBar.online}>
          <span className="os-signal-bars" aria-hidden="true">
            <span className="os-signal-bar os-signal-bar-1" />
            <span className="os-signal-bar os-signal-bar-2" />
            <span className="os-signal-bar os-signal-bar-3" />
            <span className="os-signal-bar os-signal-bar-4" />
          </span>
        </div>
      </header>

      <div
        className={`os-home-surface ${isHomeActive ? "" : "os-home-surface-hidden"}`}
        aria-hidden={!isHomeActive || isLockscreenVisible}
      >
        <div className="os-home-layout">
          <section className="os-home-grid" aria-label={homeTitle}>
            <div className="os-home-widgets" aria-label="Home widgets">
              <article className="os-home-widget-card os-home-clock-card" aria-label="Clock widget">
                <div className="os-home-clock-time">{localTime}</div>
                <div className="os-home-clock-date">{lockscreenDate}</div>
              </article>

              <article className="os-home-widget-card os-weather-card os-weather-card-home" aria-label="Weather in Garmisch-Partenkirchen">
                <div className="os-weather-card-header">
                  <div>
                    <div className="os-weather-location">Garmisch-Partenkirchen</div>
                    <div className="os-weather-temperature">{weatherSnapshot.temperature}°C</div>
                  </div>
                  <span className="os-weather-icon-shell" aria-hidden="true">
                    <WeatherIcon className="os-weather-icon" size={26} />
                  </span>
                </div>

                <div className="os-weather-card-footer">
                  <span>{weatherPresentation.label}</span>
                  <span>
                    H:{weatherSnapshot.high}° L:{weatherSnapshot.low}°
                  </span>
                </div>
              </article>
            </div>

            <div className="os-home-search-bar" aria-label="Search apps">
              <Search className="os-home-search-bar-icon" size={16} aria-hidden="true" />
              <input
                id="os-home-search-input"
                className="os-home-search-bar-input"
                type="search"
                placeholder="Search apps"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search apps"
              />
            </div>

            {icons
              .filter((item) =>
                searchQuery.trim() === "" ||
                item.label.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <MobileAppIcon
                  key={item.id}
                  icon={item.icon}
                  tintClass={item.tintClass}
                  label={item.label}
                  onClick={() => openApp(item.id)}
                />
              ))}
          </section>
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

      {!isHomeActive ? (
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
                    <div className="os-app-style-grid">
                      {projects.map((project) => {
                        const projectCopy = getProjectTranslation(locale, project.id);

                        return (
                          <button
                            key={project.id}
                            className="os-app-style-item"
                            type="button"
                            onClick={() => {
                              onSelectProject(project.id);
                              setProjectView("detail");
                              scrollToTop();
                            }}
                          >
                            <div className="os-app-style-icon" aria-hidden="true">
                              <img
                                className="os-app-style-icon-img"
                                src={project.screenshotSrc}
                                alt=""
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                            <div className="os-app-style-title">{projectCopy.title}</div>
                            <div className="os-app-style-pills">
                              {project.tech.slice(0, 2).map((tag) => (
                                <span key={tag} className="os-app-style-pill">
                                  {tag}
                                </span>
                              ))}
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
                            {selectedOpenSource?.items.map((item: any) => (
                              <div key={item.name} className="os-stack-detail-tool">
                                <div className="os-stack-detail-tool-name">{item.name}</div>
                                <div className="os-stack-detail-tool-purpose">{item.purpose}</div>
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
                              const msg = opt.value === "en" ? copy.bootMessages.langEn : opt.value === "pl" ? copy.bootMessages.langPl : copy.bootMessages.langDe;
                              setBootMessage(msg);
                              setLockscreenState("booting");
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
