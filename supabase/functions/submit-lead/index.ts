import { corsHeaders } from "../_shared/cors.ts";

declare const Deno: {
  env: {
    get: (name: string) => string | undefined;
  };
  serve: (handler: (request: Request) => Response | Promise<Response>) => void;
};

type LeadPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
  locale?: string;
  pageOrigin?: string;
  website?: string;
  submissionDurationMs?: number;
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function normalize(payload: LeadPayload) {
  return {
    name: String(payload.name ?? "").trim(),
    email: String(payload.email ?? "").trim().toLowerCase(),
    projectType: String(payload.projectType ?? "").trim(),
    message: String(payload.message ?? "").trim(),
    locale: String(payload.locale ?? "en").trim(),
    pageOrigin: String(payload.pageOrigin ?? "").trim(),
    website: String(payload.website ?? "").trim(),
    submissionDurationMs: Number(payload.submissionDurationMs ?? 0),
  };
}

function getSpamReason(payload: ReturnType<typeof normalize>) {
  if (payload.website.length > 0) {
    return "honeypot_filled";
  }

  if (payload.submissionDurationMs > 0 && payload.submissionDurationMs < 1200) {
    return "submitted_too_quickly";
  }

  return null;
}

function getValidationError(payload: ReturnType<typeof normalize>) {
  if (payload.name.length < 2) {
    return "Name is too short.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Email is invalid.";
  }

  if (payload.projectType.length < 2) {
    return "Project type is too short.";
  }

  if (payload.message.length < 10) {
    return "Message is too short.";
  }

  return null;
}

async function sendLeadAlert(payload: ReturnType<typeof normalize>) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    return { sent: false, error: "email_alert_not_configured" };
  }

  const to = Deno.env.get("LEAD_ALERT_TO_EMAIL") ?? "hi@pwlo.dev";
  const from = Deno.env.get("LEAD_ALERT_FROM_EMAIL") ?? "onboarding@resend.dev";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New lead: ${payload.projectType}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Project type: ${payload.projectType}`,
        `Locale: ${payload.locale}`,
        `Page: ${payload.pageOrigin}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return { sent: false, error: await response.text() };
  }

  return { sent: true, error: null };
}

async function createLead(record: Record<string, unknown>) {
  const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?select=id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    return { data: null, error: await response.text() };
  }

  const [data] = await response.json();

  return { data, error: null };
}

async function updateLead(id: string, record: Record<string, unknown>) {
  await fetch(`${supabaseUrl}/rest/v1/contact_submissions?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify(record),
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  const payload = normalize(await request.json() as LeadPayload);
  const spamReason = getSpamReason(payload);

  if (spamReason) {
    await createLead({
      name: payload.name || "Spam submission",
      email: payload.email || "spam@example.com",
      project_type: payload.projectType || "spam",
      message: payload.message || "",
      locale: payload.locale,
      page_origin: payload.pageOrigin || null,
      website: payload.website || null,
      submission_duration_ms: payload.submissionDurationMs || null,
      is_spam: true,
      spam_reason: spamReason,
      alert_error: "skipped_for_spam",
    });

    return json({ ok: true });
  }

  const validationError = getValidationError(payload);

  if (validationError) {
    return json({ error: validationError }, 400);
  }

  const { data, error } = await createLead({
      name: payload.name,
      email: payload.email,
      project_type: payload.projectType,
      message: payload.message,
      locale: payload.locale,
      page_origin: payload.pageOrigin || null,
      website: null,
      submission_duration_ms: payload.submissionDurationMs || null,
      is_spam: false,
      spam_reason: null,
    });

  if (error || !data) {
    return json({ error: "Failed to save lead." }, 500);
  }

  const alertResult = await sendLeadAlert(payload);

  await updateLead(data.id, {
    alert_sent_at: alertResult.sent ? new Date().toISOString() : null,
    alert_error: alertResult.error,
  });

  return json({ ok: true, id: data.id });
});
