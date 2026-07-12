import { useEffect, useRef, useState } from "react";
import { ChevronDown, Gauge, Settings2, ShieldCheck, Zap } from "lucide-react";

import { localeOptions, type Locale } from "@/i18n/translations";
import { useCountUp } from "@/hooks/useCountUp";

type HeroWindowProps = {
  locale: Locale;
  copy: {
    localeLabel: string;
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
  };
  onChangeLocale: (locale: Locale) => void;
  onContinueToDesktop?: () => void;
};

export function HeroWindow({
  locale,
  copy,
  onChangeLocale,
  onContinueToDesktop,
}: HeroWindowProps) {
  const performance = useCountUp(100);
  const seo = useCountUp(100);
  const bestPractices = useCountUp(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!isSettingsOpen) {
        return;
      }

      if (event.target instanceof Node && settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSettingsOpen]);

  return (
    <div className="hero-window-shell">
      <section className="hero-window">
        <div className="hero-window-bar">
          <div className="hero-brand">
            <img
              className="hero-brand-logo"
              src="/logo.webp"
              alt=""
              width="22"
              height="22"
              decoding="async"
              aria-hidden="true"
            />
            <span>pwlo.dev</span>
          </div>
          <div className="hero-controls">
            <div
              ref={settingsRef}
              className={`locale-toggle${isSettingsOpen ? " locale-toggle-open" : ""}`}
              role="group"
              aria-label="Settings"
            >
              <button
                className="locale-toggle-button locale-toggle-icon"
                type="button"
                onClick={() => setIsSettingsOpen((current) => !current)}
                aria-expanded={isSettingsOpen}
                aria-controls="hero-settings-menu"
                aria-label="Open settings"
                title="Settings"
              >
                <Settings2 size={16} aria-hidden="true" />
              </button>
              {isSettingsOpen ? (
                <div className="locale-toggle-menu" role="menu" id="hero-settings-menu" aria-label={copy.localeLabel}>
                  {localeOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`locale-toggle-menu-button${locale === option.value ? " locale-toggle-menu-button-active" : ""}`}
                      type="button"
                      onClick={() => {
                        setIsSettingsOpen(false);
                        onChangeLocale(option.value);
                      }}
                      role="menuitemradio"
                      aria-checked={locale === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroSubtitle}</p>

            <div className="hero-module-list" aria-label="Modules">
              {copy.heroModules.join(" · ")}
            </div>
          </div>

          <div className="speed-panel" aria-label="Speed panel">
            <div className="speed-panel-header">
              <div>
                <span className="eyebrow">{copy.speedPanelLabel}</span>
                <h2>{copy.speedPanelTitle}</h2>
              </div>
              <Gauge className="speed-panel-icon" size={22} />
            </div>

            <div className="score-grid">
              <article className="score-card">
                <span>{copy.performance}</span>
                <strong>{performance}</strong>
              </article>
              <article className="score-card">
                <span>{copy.seo}</span>
                <strong>{seo}</strong>
              </article>
              <article className="score-card">
                <span>{copy.bestPractices}</span>
                <strong>{bestPractices}</strong>
              </article>
            </div>

            <div className="badge-row">
              <span className="metric-badge">
                <Zap size={14} />
                {copy.loadsUnderSecond}
              </span>
              <span className="metric-badge">
                <ShieldCheck size={14} />
                {copy.coreWebVitals}
              </span>
            </div>
          </div>
        </div>
      </section>

      {onContinueToDesktop ? (
        <button className="hero-continue" type="button" onClick={onContinueToDesktop} aria-label="Continue to desktop">
          <span className="hero-continue-text">Continue</span>
          <span className="hero-continue-arrows" aria-hidden="true">
            <ChevronDown size={22} />
            <ChevronDown size={22} />
          </span>
        </button>
      ) : null}
    </div>
  );
}
