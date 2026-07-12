import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { ContactWindow, SpeedTestForm } from "@/components/portfolio/UtilityWindows";
import { projects } from "@/data/portfolioData";
import { getProjectTranslation, localeOptions, type Copy, type Locale } from "@/i18n/translations";

type CompactPortfolioLayoutProps = {
  locale: Locale;
  copy: Copy;
  localTime: string;
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  onChangeLocale: (locale: Locale) => void;
  onSubmitContact: (event: FormEvent<HTMLFormElement>) => void;
  isSubmittingInquiry: boolean;
  contactStatusMessage: string | null;
  contactStatusTone: "success" | "error" | null;
};

const compactSectionIds = {
  projects: "compact-projects",
  openSource: "compact-open-source",
  seo: "compact-seo",
  contact: "compact-contact",
} as const;

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function CompactPortfolioLayout({
  locale,
  copy,
  localTime,
  selectedProjectId,
  onSelectProject,
  onChangeLocale,
  onSubmitContact,
  isSubmittingInquiry,
  contactStatusMessage,
  contactStatusTone,
}: CompactPortfolioLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );
  const selectedProjectCopy = getProjectTranslation(locale, selectedProject.id);

  const navItems = [
    { id: compactSectionIds.projects, label: copy.compactLayout.sections.projects },
    { id: compactSectionIds.openSource, label: copy.compactLayout.sections.openSource },
    { id: compactSectionIds.seo, label: copy.compactLayout.sections.seo },
    { id: compactSectionIds.contact, label: copy.compactLayout.sections.contact },
  ];

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <main className="portfolio-shell compact-shell">
      <div className="compact-topbar-wrap">
        <header className="compact-topbar">
          <div className="compact-topbar-mobile">
            <div className="compact-topbar-mobile-meta">
              <span className="compact-topbar-time">{localTime}</span>
              <span className="compact-topbar-status">{copy.statusBar.online}</span>
            </div>
            <button
              className="compact-menu-button"
              type="button"
              aria-label={isMenuOpen ? copy.compactLayout.closeMenu : copy.compactLayout.menu}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div className="compact-topbar-tablet">
            <div className="compact-topbar-tablet-copy">
              <p className="compact-topbar-label">{copy.heroEyebrow}</p>
              <h2>pwlo.dev</h2>
            </div>

            <div className="compact-tablet-actions">
              <div className="compact-tablet-meta">
                <span>{copy.statusBar.localTime}: {localTime}</span>
                <span className="compact-tablet-status">{copy.statusBar.online}</span>
              </div>

              <nav className="compact-tablet-nav" aria-label={copy.compactLayout.menu}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className="compact-nav-link"
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="compact-toolbar">
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
              </div>
            </div>
          </div>
        </header>

        {isMenuOpen ? (
          <>
            <button
              className="compact-menu-backdrop"
              type="button"
              aria-label={copy.compactLayout.closeMenu}
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="compact-menu-sheet">
              <nav className="compact-menu-nav" aria-label={copy.compactLayout.menu}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className="compact-menu-link"
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="compact-menu-controls">
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
              </div>
            </div>
          </>
        ) : null}
      </div>

      <section className="compact-hero ios-card ios-animate">
        <span className="eyebrow">{copy.heroEyebrow}</span>
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroSubtitle}</p>

        <div className="compact-hero-actions">
          <button
            className="primary-button"
            type="button"
            onClick={() => handleNavigate(compactSectionIds.projects)}
          >
            {copy.viewProjects}
            <ArrowRight size={16} />
          </button>
          <button
            className="secondary-button"
            type="button"
            onClick={() => handleNavigate(compactSectionIds.contact)}
          >
            {copy.contactMe}
          </button>
        </div>

        <div className="compact-hero-badges">
          <span className="metric-badge">{copy.loadsUnderSecond}</span>
          <span className="metric-badge">{copy.coreWebVitals}</span>
        </div>
      </section>

      <section className="compact-profile-card ios-card ios-animate">
        <span className="eyebrow">{copy.windowTitles.about}</span>
        <p className="compact-profile-bio">{copy.about.bio}</p>
        <div className="compact-skill-pills">
          {copy.techStack.columns[0].items.map((item) => (
            <span key={item.name} className="tech-pill">
              {item.name}
            </span>
          ))}
        </div>
      </section>

      <section id={compactSectionIds.projects} className="compact-section ios-animate">
        <div className="compact-section-header">
          <div>
            <span className="eyebrow">{copy.compactLayout.projectsEyebrow}</span>
            <h2>{copy.compactLayout.projectsTitle}</h2>
          </div>
        </div>

        <div className="compact-project-grid">
          {projects.map((project, index) => {
            const projectCopy = getProjectTranslation(locale, project.id);

            return (
              <article
                key={project.id}
                className={`compact-project-card ios-card ios-animate${
                  project.id === selectedProject.id ? " compact-project-card-active" : ""
                }`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="compact-project-head">
                  <div>
                    <h3>{projectCopy.title}</h3>
                    <p>{projectCopy.description}</p>
                  </div>
                  <span className="performance-pill">{projectCopy.performanceBadge}</span>
                </div>

                <a
                  className="project-domain-link"
                  href={project.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.domain}
                  <ArrowUpRight size={14} />
                </a>

                <div className="compact-project-metrics">
                  {projectCopy.screenshotDetails.map((detail) => (
                    <span key={detail} className="compact-project-metric">
                      {detail}
                    </span>
                  ))}
                </div>

                <div className="tech-pill-row">
                  {project.tech.map((item) => (
                    <span key={item} className="tech-pill">
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  className="secondary-button compact-card-button"
                  type="button"
                  onClick={() => onSelectProject(project.id)}
                >
                  {copy.projects.openCaseStudy}
                </button>
              </article>
            );
          })}
        </div>

        <article className="compact-case-study-card ios-card ios-animate">
          <div className="compact-case-study-head">
            <div>
              <span className="eyebrow">{copy.projects.caseStudy}</span>
              <h3>{selectedProjectCopy.title}</h3>
            </div>
            <span className="performance-pill performance-pill-accent">
              {selectedProjectCopy.performanceBadge}
            </span>
          </div>

          <div className="compact-case-study-stats">
            <article className="compact-case-stat">
              <span>{copy.projects.before}</span>
              <strong>{selectedProjectCopy.caseStudy.before}</strong>
            </article>
            <article className="compact-case-stat">
              <span>{copy.projects.after}</span>
              <strong>{selectedProjectCopy.caseStudy.after}</strong>
            </article>
          </div>

          <div className="compact-case-study-grid">
            <div className="compact-text-card">
              <h4>{copy.projects.seoImprovements}</h4>
              <ul className="bullet-list">
                {selectedProjectCopy.caseStudy.seo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="compact-text-card">
              <h4>{copy.projects.deploymentStack}</h4>
              <ul className="bullet-list">
                {selectedProjectCopy.caseStudy.deployment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section id={compactSectionIds.openSource} className="compact-section ios-animate">
        <div className="compact-section-header">
          <div>
            <span className="eyebrow">{copy.compactLayout.openSourceEyebrow}</span>
            <h2>{copy.compactLayout.openSourceTitle}</h2>
          </div>
          <p>{copy.compactLayout.openSourceSubtitle}</p>
        </div>

        <div className="compact-open-source-grid">
          {copy.techStack.columns.map((column, index) => (
            <article
              key={column.title}
              className="compact-open-source-card ios-card ios-animate"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <h3>{column.title}</h3>
              <ul className="bullet-list">
                {column.items.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id={compactSectionIds.seo} className="compact-section ios-animate">
        <div className="compact-section-header">
          <div>
            <span className="eyebrow">{copy.compactLayout.seoEyebrow}</span>
            <h2>{copy.compactLayout.seoTitle}</h2>
          </div>
          <p>{copy.compactLayout.seoSubtitle}</p>
        </div>

        <div className="compact-seo-grid">
          <article className="compact-seo-card ios-card ios-animate">
            <h3>{copy.speed.title}</h3>
            <p>{copy.speed.description}</p>
            <div className="compact-seo-badges">
              <span className="metric-badge">{copy.loadsUnderSecond}</span>
              <span className="metric-badge">{copy.coreWebVitals}</span>
            </div>
          </article>

          <article className="compact-seo-card ios-card ios-animate">
            <h3>{copy.speed.eyebrow}</h3>
            <ul className="bullet-list" style={{ marginBottom: "16px" }}>
              {copy.speed.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <SpeedTestForm locale={locale} copy={copy} />
          </article>
        </div>
      </section>

      <section id={compactSectionIds.contact} className="compact-section compact-contact-section ios-animate">
        <ContactWindow
          copy={copy}
          onSubmit={onSubmitContact}
          isSubmitting={isSubmittingInquiry}
          statusMessage={contactStatusMessage}
          statusTone={contactStatusTone}
        />
      </section>

      <footer className="site-footer compact-site-footer">
        <span>© 2026 Pawel Wlodarczyk</span>
        <span>{copy.footer.builtWith}</span>
        <span>pwlo.dev</span>
      </footer>
    </main>
  );
}
