import { ArrowRight } from "lucide-react";
import type { KeyboardEvent, ReactNode } from "react";

import { projects, type Project } from "@/data/portfolioData";
import { getProjectTechTag, getProjectTranslation, type Locale } from "@/i18n/translations";

type ProjectsWindowProps = {
  locale: Locale;
  copy: {
    title: string;
    openProjectAction: string;
  };
  onSelectProject: (projectId: string) => void;
};

function getProjectSpecHighlight(project: Project): ReactNode {
  switch (project.id) {
    case "hotel-worker":
      return (
        <>
          <span className="text-emerald-400">⚡ PageSpeed:</span>{" "}
          <span className="text-amber-400">100/100</span>
        </>
      );
    case "coffee-bagus":
      return (
        <>
          <span className="text-amber-400">Next.js</span>
          <span className="text-slate-500"> • </span>
          <span className="text-emerald-400">Tailwind</span>
          <span className="text-slate-500"> • </span>
          <span className="text-amber-400">Stripe</span>
        </>
      );
    case "task-tracker":
      return (
        <>
          <span className="text-emerald-400">React</span>
          <span className="text-slate-500"> • </span>
          <span className="text-amber-400">Kanban</span>
          <span className="text-slate-500"> • </span>
          <span className="text-emerald-400">Realtime</span>
        </>
      );
    case "dieta-na-codzien":
      return (
        <>
          <span className="text-amber-400">⚡ Lighthouse:</span>{" "}
          <span className="text-emerald-400">98+</span>
        </>
      );
    case "magic-colouring-book":
      return (
        <>
          <span className="text-emerald-400">Canvas</span>
          <span className="text-slate-500"> • </span>
          <span className="text-amber-400">PDF</span>
          <span className="text-slate-500"> • </span>
          <span className="text-emerald-400">PWA</span>
        </>
      );
    case "instant-jobs":
      return (
        <>
          <span className="text-amber-400">Maps</span>
          <span className="text-slate-500"> • </span>
          <span className="text-emerald-400">Supabase</span>
          <span className="text-slate-500"> • </span>
          <span className="text-amber-400">Geo</span>
        </>
      );
    default:
      return (
        <>
          <span className="text-emerald-400">React</span>
          <span className="text-slate-500"> • </span>
          <span className="text-amber-400">Tailwind</span>
          <span className="text-slate-500"> • </span>
          <span className="text-emerald-400">Supabase</span>
        </>
      );
  }
}

export function ProjectsWindow({
  locale,
  copy,
  onSelectProject,
}: ProjectsWindowProps) {
  return (
    <div className="projects-layout">
      <div className="projects-intro mb-6 px-2">
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
              className="project-card group flex flex-col justify-between rounded-2xl border border-slate-700/40 bg-slate-800/40 p-5 transition-all hover:border-slate-500/50"
              role="button"
              tabIndex={0}
              onClick={handleSelectProject}
              onKeyDown={handleProjectCardKeyDown}
            >
              <a
                className="project-shot flex h-36 flex-col justify-between rounded-t-xl border border-slate-700/60 border-b border-slate-700/60 bg-slate-900/90 p-4 font-mono text-xs text-slate-400 no-underline"
                href={project.previewUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={project.domain}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="inline-block h-2 w-2 rounded-full bg-slate-600" />
                    <span className="inline-block h-2 w-2 rounded-full bg-slate-600" />
                    <span className="inline-block h-2 w-2 rounded-full bg-slate-600" />
                  </div>
                  <span className="truncate text-slate-500">{project.domain}</span>
                </div>

                <div className="text-[0.8rem] leading-relaxed tracking-tight">
                  {getProjectSpecHighlight(project)}
                </div>

                <div className="truncate text-slate-600">
                  <span className="text-slate-500">$</span> open {project.domain}
                </div>
              </a>

              <div className="project-content mt-4 flex flex-1 flex-col justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-100">
                    {projectCopy.title}
                  </h3>
                  <div className="project-category mt-0.5 text-xs font-medium uppercase tracking-wide text-amber-400/90">
                    {projectCopy.screenshotDetails.join(" · ")}
                  </div>
                  <p className="project-description mt-2 line-clamp-2 text-sm leading-relaxed text-slate-300/90">
                    {projectCopy.description}
                  </p>
                </div>

                <div className="tech-pill-row flex flex-wrap gap-2">
                  {project.tech.map((tagId) => (
                    <span
                      key={tagId}
                      className="tech-pill rounded-md border border-slate-600/40 bg-slate-700/40 px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {getProjectTechTag(locale, tagId)}
                    </span>
                  ))}
                </div>

                <a
                  className="project-domain-link mt-4 inline-flex items-center text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300 group-hover:translate-x-1"
                  href={project.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  {copy.openProjectAction}
                  <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
