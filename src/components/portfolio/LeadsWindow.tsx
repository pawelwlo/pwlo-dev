import { ArrowRight } from "lucide-react";
import type { ChangeEvent } from "react";

import type { LeadRecord } from "@/lib/leadsApi";

type LeadsWindowProps = {
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    adminKeyLabel: string;
    adminKeyPlaceholder: string;
    loadLeads: string;
    loadLeadsAction: string;
    loading: string;
    empty: string;
    unauthorized: string;
    alertSent: string;
    alertPending: string;
    spam: string;
    clean: string;
    email: string;
    projectType: string;
    locale: string;
    submittedAt: string;
    message: string;
  };
  adminKey: string;
  onAdminKeyChange: (value: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  errorMessage: string | null;
  leads: LeadRecord[];
};

function formatSubmittedAt(value: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: false,
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function LeadsWindow({
  copy,
  adminKey,
  onAdminKeyChange,
  onRefresh,
  isLoading,
  errorMessage,
  leads,
}: LeadsWindowProps) {
  return (
    <div className="leads-layout">
      <div className="leads-intro">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h3>{copy.title}</h3>
        <p>{copy.description}</p>
      </div>

      <div className="leads-controls">
        <label className="leads-admin-key">
          <span>{copy.adminKeyLabel}</span>
          <input
            type="password"
            value={adminKey}
            placeholder={copy.adminKeyPlaceholder}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onAdminKeyChange(event.target.value)}
          />
        </label>
        <button className="primary-button" type="button" onClick={onRefresh} disabled={isLoading} style={{ display: "inline-flex" }}>
          {isLoading ? copy.loading : copy.loadLeadsAction}
          {!isLoading && <ArrowRight size={16} style={{ marginLeft: "4px" }} />}
        </button>
      </div>

      {errorMessage ? (
        <p className="contact-status contact-status-error" role="status">
          {errorMessage}
        </p>
      ) : null}

      {leads.length === 0 && !isLoading && !errorMessage ? <p className="leads-empty">{copy.empty}</p> : null}

      <div className="leads-list">
        {leads.map((lead) => (
          <article key={lead.id} className="lead-card">
            <div className="lead-card-header">
              <div>
                <strong>{lead.name}</strong>
                <span>{lead.email}</span>
              </div>
              <div className="lead-badges">
                <span className={`lead-badge ${lead.is_spam ? "lead-badge-warn" : "lead-badge-success"}`}>
                  {lead.is_spam ? copy.spam : copy.clean}
                </span>
                <span className={`lead-badge ${lead.alert_sent_at ? "lead-badge-success" : "lead-badge-muted"}`}>
                  {lead.alert_sent_at ? copy.alertSent : copy.alertPending}
                </span>
              </div>
            </div>

            <dl className="lead-meta">
              <div>
                <dt>{copy.projectType}</dt>
                <dd>{lead.project_type}</dd>
              </div>
              <div>
                <dt>{copy.locale}</dt>
                <dd>{lead.locale}</dd>
              </div>
              <div>
                <dt>{copy.submittedAt}</dt>
                <dd>{formatSubmittedAt(lead.submitted_at)}</dd>
              </div>
            </dl>

            <p className="lead-message">{lead.message}</p>

            {lead.spam_reason ? <p className="lead-note">{copy.spam}: {lead.spam_reason}</p> : null}
            {lead.alert_error ? <p className="lead-note">{copy.alertPending}: {lead.alert_error}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
