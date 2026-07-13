import { ArrowRight, Github, Mail, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/leadsApi";
import { isSupabaseConfigured } from "@/lib/supabase";

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
      resumeAction: string;
    };
    techStack: {
      eyebrow: string;
      title: string;
      columns: Array<{ title: string; items: Array<{ name: string; purpose: string; projectsCount?: number }> }>;
    };
    speed: {
      eyebrow: string;
      title: string;
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
      <div className="about-photo-card">
        <div className="about-photo-placeholder">
          <img
            className="about-photo-image"
            src="/B970F845-D014-4C09-BAA2-17435B122CD9_1_201_a.jpeg"
            alt="Pawel Wlodarczyk"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="about-copy">
        <div style={{ marginBottom: "24px" }}>
          <div className="about-details">
            <div style={{ fontWeight: 500, marginBottom: "4px" }}>{copy.about.name}</div>
            <div style={{ fontWeight: 300, color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "2px" }}>{copy.about.role}</div>
            <div style={{ fontWeight: 300, color: "var(--text-secondary)", fontSize: "0.95rem" }}>{copy.about.location}</div>
          </div>
        </div>

        <div className="about-bio-card stack-card">
          {copy.about.bio.map((paragraph, index) => (
            <p key={index} className="about-bio" style={{ marginBottom: index === copy.about.bio.length - 1 ? 0 : "12px", fontWeight: 300, lineHeight: 1.6 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
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
                <li key={item.name} style={{ marginBottom: "12px", paddingLeft: "16px", position: "relative" }}>
                  <div style={{ fontWeight: 500, marginBottom: "2px" }}>
                    {item.name}
                    {item.projectsCount ? (
                      <span className="tech-pill" style={{ marginLeft: "8px", fontSize: "0.75rem", padding: "2px 6px" }}>
                        {item.projectsCount} projects
                      </span>
                    ) : null}
                  </div>
                  <div style={{ fontWeight: 300, color: "var(--text-secondary)", fontSize: "0.9rem" }}>{item.purpose}</div>
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
        <h3>{copy.speed.title}</h3>
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
