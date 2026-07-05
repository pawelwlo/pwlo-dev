import { corsHeaders } from "../_shared/cors.ts";

declare const Deno: {
  env: {
    get: (name: string) => string | undefined;
  };
  serve: (handler: (request: Request) => Response | Promise<Response>) => void;
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const adminDashboardKey = Deno.env.get("ADMIN_DASHBOARD_KEY") ?? "";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405);
  }

  if (!adminDashboardKey || request.headers.get("x-admin-key") !== adminDashboardKey) {
    return json({ error: "Admin key is invalid." }, 401);
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/contact_submissions?select=id,name,email,project_type,message,locale,page_origin,submitted_at,is_spam,spam_reason,alert_sent_at,alert_error,submission_duration_ms&order=submitted_at.desc&limit=50`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    },
  );

  if (!response.ok) {
    return json({ error: "Failed to load submissions." }, 500);
  }

  const leads = await response.json();

  return json({ leads });
});
