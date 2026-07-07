import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

import type { Locale } from "@/i18n/translations";

type CopyProps = {
  locale: Locale;
  copy: {
    about: {
      photoPlaceholder: string;
      bio: string;
      skills: string[];
    };
    techStack: {
      columns: Array<{ title: string; items: string[] }>;
    };
    speed: {
      eyebrow: string;
      title: string;
      description: string;
      items: string[];
      cta: string;
      ctaSubject: string;
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
    };
  };
};

export function AboutWindow({ copy }: CopyProps) {
  return (
    <div className="about-layout">
      <div className="about-photo-card">
        <div className="about-photo-placeholder">
          <img
            className="about-photo-image"
            src="/5F3C3F67-00F2-49E1-8E7B-73E2F7D2ECD9_1_201_a.jpeg"
            alt="Pawel Wlodarczyk"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="about-copy">
        <p className="about-bio">{copy.about.bio}</p>

        <ul className="bullet-list">
          {copy.about.skills.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TechStackWindow({ copy }: CopyProps) {
  return (
    <div className="stack-grid">
      {copy.techStack.columns.map((column) => (
        <article key={column.title} className="stack-card">
          <h3>{column.title}</h3>
          <ul className="bullet-list">
            {column.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function SpeedWindow({ copy }: CopyProps) {
  return (
    <div className="speed-layout">
      <div className="speed-copy-block">
        <span className="eyebrow">{copy.speed.eyebrow}</span>
        <h3>{copy.speed.title}</h3>
        <p>{copy.speed.description}</p>
      </div>

      <ul className="optimization-list">
        {copy.speed.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <a
        className="primary-button button-link"
        href={`mailto:pawel@pwlo.dev?subject=${encodeURIComponent(copy.speed.ctaSubject)}`}
      >
        {copy.speed.cta}
        <ArrowRight size={16} />
      </a>
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
        <span className="eyebrow">{copy.contact.eyebrow}</span>
        <h3>{copy.contact.title}</h3>
        <a className="contact-email" href="mailto:pawel@pwlo.dev">pawel@pwlo.dev</a>

        <div className="social-row">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
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
