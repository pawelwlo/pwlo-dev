alter table public.contact_submissions
  add column if not exists website text,
  add column if not exists submission_duration_ms integer,
  add column if not exists is_spam boolean not null default false,
  add column if not exists spam_reason text,
  add column if not exists alert_sent_at timestamptz,
  add column if not exists alert_error text;

drop policy if exists "Anyone can create contact submissions" on public.contact_submissions;

revoke insert on table public.contact_submissions from anon, authenticated;
revoke select on table public.contact_submissions from anon, authenticated;

create index if not exists contact_submissions_submitted_at_idx
  on public.contact_submissions (submitted_at desc);
