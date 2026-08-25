import { ArrowRight, Github, Mail, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/leadsApi";
import { isSupabaseConfigured } from "@/lib/supabase";
import { TechIcon, type TechIconId } from "@/components/portfolio/TechIcons";

import type { Locale } from "@/i18n/translations";

type CopyProps = {
  locale: Locale;
  copy: {
    about: {
      eyebrow: string;
      title: string;
      name: string;
      role: string;
      location: string;
      photoPlaceholder: string;
      bio: string[];
      clientsHeading: string;
      clients: string[];
      resumeAction: string;
    };
    techStack: {
      eyebrow: string;
      title: string;
      columns: Array<{
        title: string;
        items: Array<{ name: string; purpose: string; icon: TechIconId; projectsCount?: number }>;
      }>;
    };
    speed: {
      eyebrow: string;
      title: string;
      subtitle: string;
      description: string;
      items: string[];
      cta: string;
      ctaSubject: string;
      scoreLabel: string;
      scoreValue: string;
      domain: string;
      domainPlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      sendRequest: string;
      sendingRequest: string;
      submitSuccess: string;
      submitError: string;
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
      missingConfig: string;
      submitSuccess: string;
      submitError: string;
    };
    leads: {};
  };
};

export function AboutWindow({ copy }: CopyProps) {
  return (
    <div className="about-layout">
      <header className="about-profile-header">
        <div className="about-avatar">
          <img
            className="about-avatar-image"
            src="/image_website.png"
            alt={copy.about.name}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="about-profile-identity">
          <h3 className="about-profile-name">{copy.about.name}</h3>
          <p className="about-profile-role">{copy.about.role}</p>
          <p className="about-profile-location">{copy.about.location}</p>
        </div>
      </header>

      <article className="about-profile-card">
        <div className="about-profile-body">
          <div className="about-bio-group">
            {copy.about.bio.map((paragraph) => (
              <p key={paragraph} className="about-bio">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

export function TechStackWindow({ copy }: CopyProps) {
  return (
    <div className="tech-stack-layout">
      <div style={{ marginBottom: "24px" }}>
        <h3>{copy.techStack.title}</h3>
      </div>
      <div className="stack-grid">
        {copy.techStack.columns.map((column) => (
          <article key={column.title} className="stack-card">
            <h3 style={{ marginBottom: "16px", fontSize: "1.1rem" }}>{column.title}</h3>
            <ul className="bullet-list tech-list">
              {column.items.map((item) => (
                <li key={item.name} className="tech-item">
                  <TechIcon id={item.icon} />
                  <div className="tech-item-copy">
                    <div className="tech-item-name">{item.name}</div>
                    <div className="tech-item-purpose">{item.purpose}</div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SpeedTestForm({ locale, copy }: CopyProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const buildAuditMessage = (domain: string, notes: string) => {
    const trimmedNotes = notes.trim();

    if (trimmedNotes.length > 0) {
      return `Speed audit request for: ${domain}\n\nAdditional notes:\n${trimmedNotes}`;
    }

    return `Speed audit request for: ${domain}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      setStatus({ type: "error", message: copy.contact.missingConfig });
      return;
    }

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const domain = String(formData.get("domain") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const notes = String(formData.get("message") ?? "").trim();
    const submissionDurationMs = Math.max(0, Date.now() - startedAt);

    setIsSubmitting(true);
    setStatus(null);

    try {
      await submitLead({
        name: "Speed Audit Request",
        email,
        projectType: copy.speed.ctaSubject,
        message: buildAuditMessage(domain, notes),
        locale,
        pageOrigin: window.location.href,
        website: String(formData.get("website") ?? ""),
        submissionDurationMs,
      });

      form.reset();
      setStatus({ type: "success", message: copy.speed.submitSuccess });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : copy.speed.submitError,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isFormOpen) {
    return (
      <button
        type="button"
        className="primary-button"
        onClick={() => setIsFormOpen(true)}
      >
        {copy.speed.cta}
        <ArrowRight size={16} style={{ marginLeft: "6px" }} />
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form speed-test-form">
      <input className="contact-honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" />
      <input name="startedAt" type="hidden" value={startedAt} />
      <label>
        <span>{copy.speed.domain}</span>
        <input
          type="text"
          name="domain"
          placeholder={copy.speed.domainPlaceholder}
          required
          autoComplete="url"
        />
      </label>
      <label>
        <span>{copy.speed.email}</span>
        <input
          type="email"
          name="email"
          placeholder={copy.speed.emailPlaceholder}
          required
          autoComplete="email"
        />
      </label>
      <label>
        <span>{copy.speed.message}</span>
        <textarea
          name="message"
          placeholder={copy.speed.messagePlaceholder}
          rows={2}
        />
      </label>

      {status ? (
        <p
          className={`contact-status ${status.type === "success" ? "contact-status-success" : "contact-status-error"}`}
          role="status"
          aria-live="polite"
        >
          {status.type === "success" ? <CheckCircle2 size={16} /> : null}
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="primary-button"
        disabled={isSubmitting}
        style={{ marginTop: "8px" }}
      >
        {isSubmitting ? copy.speed.sendingRequest : copy.speed.sendRequest}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}

export function SpeedWindow({ locale, copy }: CopyProps) {

  return (
    <div className="speed-layout">
      <div className="speed-copy-block" style={{ marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "8px" }}>{copy.speed.title}</h3>
        <p style={{ margin: 0, fontWeight: 300, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
          {copy.speed.subtitle}
        </p>
      </div>

      <div className="os-speed-score-card">
        <div className="os-speed-score-ring">
          {copy.speed.scoreValue || 100}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "4px" }}>{copy.speed.scoreLabel}</div>
          <p style={{ fontWeight: 300, fontSize: "0.95rem", margin: 0 }}>{copy.speed.description}</p>
        </div>
      </div>

      <ul className="optimization-list" style={{ marginBottom: "24px" }}>
        {copy.speed.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <SpeedTestForm locale={locale} copy={copy} />
    </div>
  );
}

type ContactWindowProps = {
  copy: CopyProps["copy"];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  statusMessage: string | null;
  statusTone: "success" | "error" | null;
};

export function ContactWindow({
  copy,
  onSubmit,
  isSubmitting,
  statusMessage,
  statusTone,
}: ContactWindowProps) {
  const [startedAt] = useState(() => Date.now());

  return (
    <div className="contact-layout">
      <div className="contact-intro">
        <h3>{copy.contact.title}</h3>
        <a className="contact-email" href="mailto:contact@pwlo.dev">contact@pwlo.dev</a>

        <p className="contact-availability" style={{ marginTop: "8px", fontSize: "0.95rem", color: "rgba(242, 242, 242, 0.7)" }}>
          Germany &middot; Available for freelance
        </p>

        <div className="social-row">
          <a href="https://github.com/pawelwlo" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="mailto:pawel@pwlo.dev" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={onSubmit}>
        <input className="contact-honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" />
        <input name="startedAt" type="hidden" value={startedAt} />
        <label>
          <span>{copy.contact.name}</span>
          <input name="name" type="text" placeholder={copy.contact.namePlaceholder} required />
        </label>
        <label>
          <span>{copy.contact.email}</span>
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          <span>{copy.contact.projectType}</span>
          <input name="projectType" type="text" placeholder={copy.contact.projectTypePlaceholder} required />
        </label>
        <label>
          <span>{copy.contact.message}</span>
          <textarea name="message" rows={4} placeholder={copy.contact.messagePlaceholder} required />
        </label>
        {statusMessage ? (
          <p
            className={`contact-status ${
              statusTone === "success" ? "contact-status-success" : "contact-status-error"
            }`}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        ) : null}
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? copy.contact.sendingInquiry : copy.contact.sendInquiry}
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
