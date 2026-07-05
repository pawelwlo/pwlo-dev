import { ArrowUpRight, Code2, Rocket, SearchCheck, TimerReset } from "lucide-react";

import { projects } from "@/data/portfolioData";
import { getProjectTranslation, type Locale } from "@/i18n/translations";

type ProjectsWindowProps = {
  locale: Locale;
  copy: {
    caseStudy: string;
    openCaseStudy: string;
    before: string;
    after: string;
    seoImprovements: string;
    deploymentStack: string;
    codeSnippet: string;
    clientTestimonial: string;
    seo: string;
  };
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
};

export function ProjectsWindow({
  locale,
  copy,
  selectedProjectId,
  onSelectProject,
}: ProjectsWindowProps) {
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const selectedProjectCopy = getProjectTranslation(locale, selectedProject.id);

  return (
    <div className="projects-layout">
      <div className="project-grid">
        {projects.map((project) => {
          const projectCopy = getProjectTranslation(locale, project.id);

          return (
          <article key={project.id} className="project-card">
            <div className="project-shot">
              <div className="project-shot-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="project-shot-screen">
                <strong>{projectCopy.title}</strong>
                <p>{project.domain}</p>
                <div className="project-shot-metrics">
                  {projectCopy.screenshotDetails.map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-content">
              <div className="project-heading">
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

              <div className="tech-pill-row">
                {project.tech.map((item) => (
                  <span key={item} className="tech-pill">
                    {item}
                  </span>
                ))}
              </div>

              <button
                className="text-button"
                type="button"
                onClick={() => onSelectProject(project.id)}
              >
                {copy.openCaseStudy}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </article>
        )})}
      </div>

      <section className="case-study-panel">
        <div className="case-study-header">
          <div>
            <span className="eyebrow">{copy.caseStudy}</span>
            <h3>{selectedProjectCopy.title}</h3>
          </div>
          <span className="performance-pill performance-pill-accent">
            {selectedProjectCopy.performanceBadge}
          </span>
        </div>

        <a
          className="project-domain-link case-study-link"
          href={selectedProject.previewUrl}
          target="_blank"
          rel="noreferrer"
        >
          {selectedProject.domain}
          <ArrowUpRight size={14} />
        </a>

        <div className="case-study-stats">
          <article className="case-stat">
            <TimerReset size={16} />
            <div>
              <span>{copy.before}</span>
              <strong>{selectedProjectCopy.caseStudy.before}</strong>
            </div>
          </article>
          <article className="case-stat">
            <Rocket size={16} />
            <div>
              <span>{copy.after}</span>
              <strong>{selectedProjectCopy.caseStudy.after}</strong>
            </div>
          </article>
          <article className="case-stat">
            <SearchCheck size={16} />
            <div>
              <span>{copy.seo}</span>
              <strong>{selectedProjectCopy.caseStudy.seo[0]}</strong>
            </div>
          </article>
        </div>

        <div className="case-study-grid">
          <div className="case-study-column">
            <h4>{copy.seoImprovements}</h4>
            <ul className="bullet-list">
              {selectedProjectCopy.caseStudy.seo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-study-column">
            <h4>{copy.deploymentStack}</h4>
            <ul className="bullet-list">
              {selectedProjectCopy.caseStudy.deployment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-study-column case-study-code">
            <h4>
              <Code2 size={16} />
              {copy.codeSnippet}
            </h4>
            <pre>
              <code>{selectedProject.caseStudy.codeSnippet}</code>
            </pre>
          </div>

          <div className="case-study-column">
            <h4>{copy.clientTestimonial}</h4>
            <blockquote>{selectedProjectCopy.caseStudy.testimonial}</blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
