-- EDCH membership applications migration
-- Run this in Supabase SQL Editor if your database already existed before
-- membership applications were added to supabase/schema.sql.

create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  member_type text not null default 'Community Member',
  interest text,
  message text,
  status text not null default 'pending',
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_membership_applications_updated_at on public.membership_applications;
create trigger set_membership_applications_updated_at
before update on public.membership_applications
for each row execute function public.set_updated_at();

alter table public.membership_applications enable row level security;

drop policy if exists "Public can submit membership applications" on public.membership_applications;
create policy "Public can submit membership applications"
on public.membership_applications for insert
to anon, authenticated
with check (true);

drop policy if exists "Approved admins manage membership applications" on public.membership_applications;
create policy "Approved admins manage membership applications"
on public.membership_applications for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());
