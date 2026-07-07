# pwlo.dev

Portfolio site for `pwlo.dev`, built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

Vercel Analytics is enabled in the app root for production traffic measurement on Vercel deployments.

## Environment

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required frontend variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Required Supabase Edge Function secrets for contact delivery:

- `RESEND_API_KEY`
- `LEAD_ALERT_TO_EMAIL`
- `LEAD_ALERT_FROM_EMAIL`
- `ADMIN_DASHBOARD_KEY`

Example setup:

```bash
supabase link --project-ref <your-project-ref>
supabase secrets set \
  RESEND_API_KEY=re_xxx \
  LEAD_ALERT_TO_EMAIL=hi@pwlo.dev \
  LEAD_ALERT_FROM_EMAIL=hi@pwlo.dev \
  ADMIN_DASHBOARD_KEY=<strong-random-value>
supabase functions deploy submit-lead
supabase functions deploy admin-leads
```

The `submit-lead` function now returns an error when the lead is saved but the Resend alert fails, so the UI no longer reports a false-positive success state.
