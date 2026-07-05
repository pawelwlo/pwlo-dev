import { getSupabaseFunctionUrl, isSupabaseConfigured, supabaseAnonKey } from "@/lib/supabase";

export type LeadSubmissionInput = {
  name: string;
  email: string;
  projectType: string;
  message: string;
  locale: string;
  pageOrigin: string;
  website: string;
  submissionDurationMs: number;
};

export type LeadRecord = {
  id: string;
  name: string;
  email: string;
  project_type: string;
  message: string;
  locale: string;
  page_origin: string | null;
  submitted_at: string;
  is_spam: boolean;
  spam_reason: string | null;
  alert_sent_at: string | null;
  alert_error: string | null;
  submission_duration_ms: number | null;
};

async function parseError(response: Response, fallbackMessage: string) {
  try {
    const data = await response.json();

    if (typeof data?.error === "string" && data.error.length > 0) {
      return data.error;
    }
  } catch {
    return fallbackMessage;
  }

  return fallbackMessage;
}

export async function submitLead(payload: LeadSubmissionInput) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(getSupabaseFunctionUrl("submit-lead"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Lead submission failed."));
  }

  return response.json();
}

export async function fetchAdminLeads(adminKey: string) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(getSupabaseFunctionUrl("admin-leads"), {
    method: "GET",
    headers: {
      apikey: supabaseAnonKey,
      "x-admin-key": adminKey,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to load submissions."));
  }

  const data = await response.json();

  return (data.leads ?? []) as LeadRecord[];
}
