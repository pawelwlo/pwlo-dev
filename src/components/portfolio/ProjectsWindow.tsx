import { ArrowRight } from "lucide-react";
import type { KeyboardEvent } from "react";

import { projects } from "@/data/portfolioData";
import { getProjectTranslation, type Locale } from "@/i18n/translations";

type ProjectsWindowProps = {
  locale: Locale;
  copy: {
    title: string;
    openProjectAction: string;
  };
  onSelectProject: (projectId: string) => void;
};

export function ProjectsWindow({
  locale,
  copy,
  onSelectProject,
}: ProjectsWindowProps) {
  return (
    <div className="projects-layout">
      <div className="projects-intro" style={{ marginBottom: "24px", padding: "0 8px" }}>
        <h3>{copy.title}</h3>
      </div>
      <div className="project-grid">
        {projects.map((project) => {
          const projectCopy = getProjectTranslation(locale, project.id);
          const handleSelectProject = () => onSelectProject(project.id);
          const handleProjectCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleSelectProject();
            }
          };

          return (
          <article
            key={project.id}
            className="project-card"
            role="button"
            tabIndex={0}
            onClick={handleSelectProject}
            onKeyDown={handleProjectCardKeyDown}
          >
            <div className="project-shot">
              <div className="project-shot-bar">
                <span />
                <span />
                <span />
              </div>
              <a
                className="project-shot-screen"
                href={project.previewUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={project.domain}
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  className="project-shot-image"
                  src={project.screenshotSrc}
                  alt={`${projectCopy.title} preview`}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>

            <div className="project-content">
              <div className="project-heading">
                <div>
                  <h3 style={{ marginBottom: "4px" }}>{projectCopy.title}</h3>
                  <div style={{ fontSize: "0.85rem", color: "var(--success)", fontWeight: 500, marginBottom: "8px" }}>
                    {projectCopy.screenshotDetails.join(" · ")}
                  </div>
                  <p style={{ fontWeight: 300, fontSize: "0.95rem" }}>{projectCopy.description}</p>
                </div>
              </div>

              <div className="tech-pill-row">
                {project.tech.map((item) => (
                  <span key={item} className="tech-pill">
                    {item}
                  </span>
                ))}
              </div>

              <a
                className="project-domain-link"
                style={{ display: "inline-flex", fontWeight: 500, letterSpacing: "0.03em" }}
                href={project.previewUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                {copy.openProjectAction}
                <ArrowRight size={16} style={{ marginLeft: "4px" }} />
              </a>

            </div>
          </article>
        )})}
      </div>
    </div>
  );
}
