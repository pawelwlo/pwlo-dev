create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text not null,
  message text not null,
  locale text not null,
  page_origin text,
  submitted_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

grant insert on table public.contact_submissions to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contact_submissions'
      and policyname = 'Anyone can create contact submissions'
  ) then
    create policy "Anyone can create contact submissions"
      on public.contact_submissions
      for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;
