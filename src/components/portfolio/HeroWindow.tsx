import { ArrowRight, Gauge, MoonStar, ShieldCheck, SunMedium, Zap } from "lucide-react";

import { localeOptions, type Locale } from "@/i18n/translations";
import { useCountUp } from "@/hooks/useCountUp";

type HeroWindowProps = {
  locale: Locale;
  copy: {
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
  };
  isDark: boolean;
  onChangeLocale: (locale: Locale) => void;
  onToggleTheme: () => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
};

export function HeroWindow({
  locale,
  copy,
  isDark,
  onChangeLocale,
  onToggleTheme,
  onOpenProjects,
  onOpenContact,
}: HeroWindowProps) {
  const performance = useCountUp(100);
  const seo = useCountUp(100);
  const bestPractices = useCountUp(100);

  return (
    <section className="hero-window">
      <div className="hero-window-bar">
        <div className="hero-brand">
          <img className="hero-brand-logo" src="/logo.png" alt="" aria-hidden="true" />
          <span>pwlo.dev</span>
        </div>
        <div className="hero-controls">
          <div className="locale-toggle" role="group" aria-label={copy.localeLabel}>
            {localeOptions.map((option) => (
              <button
                key={option.value}
                className={`locale-toggle-button${locale === option.value ? " locale-toggle-button-active" : ""}`}
                type="button"
                onClick={() => onChangeLocale(option.value)}
                aria-pressed={locale === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button className="theme-toggle" type="button" onClick={onToggleTheme}>
            {isDark ? <SunMedium size={16} /> : <MoonStar size={16} />}
            <span>{isDark ? copy.themeLight : copy.themeDark}</span>
          </button>
        </div>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{copy.heroEyebrow}</span>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroSubtitle}</p>

          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={onOpenProjects}>
              {copy.viewProjects}
              <ArrowRight size={16} />
            </button>
            <button className="secondary-button" type="button" onClick={onOpenContact}>
              {copy.contactMe}
            </button>
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
  );
}
