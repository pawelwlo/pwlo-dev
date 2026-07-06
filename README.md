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
