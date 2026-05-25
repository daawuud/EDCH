-- EDCH Supabase schema
-- Run this in the Supabase SQL Editor after creating your Supabase project.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'admin',
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  content text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date,
  location text,
  status text not null default 'draft',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  member_type text,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  interest text,
  message text not null,
  status text not null default 'unread',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  email text,
  phone text,
  location text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('edch-files', 'edch-files', true)
on conflict (id) do update set public = true;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_approved_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and is_approved = true
  );
$$;

drop trigger if exists set_admin_users_updated_at on public.admin_users;
create trigger set_admin_users_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();

drop trigger if exists set_pages_updated_at on public.pages;
create trigger set_pages_updated_at
before update on public.pages
for each row execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_programs_updated_at on public.programs;
create trigger set_programs_updated_at
before update on public.programs
for each row execute function public.set_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists set_resources_updated_at on public.resources;
create trigger set_resources_updated_at
before update on public.resources
for each row execute function public.set_updated_at();

drop trigger if exists set_members_updated_at on public.members;
create trigger set_members_updated_at
before update on public.members
for each row execute function public.set_updated_at();

drop trigger if exists set_membership_applications_updated_at on public.membership_applications;
create trigger set_membership_applications_updated_at
before update on public.membership_applications
for each row execute function public.set_updated_at();

drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
create trigger set_contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.pages enable row level security;
alter table public.services enable row level security;
alter table public.programs enable row level security;
alter table public.events enable row level security;
alter table public.resources enable row level security;
alter table public.members enable row level security;
alter table public.membership_applications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Admins can read own admin status" on public.admin_users;
create policy "Admins can read own admin status"
on public.admin_users for select
to authenticated
using (user_id = auth.uid() or public.is_approved_admin());

drop policy if exists "Approved admins manage admin users" on public.admin_users;
create policy "Approved admins manage admin users"
on public.admin_users for all
to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Published pages are public" on public.pages;
create policy "Published pages are public"
on public.pages for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Active services are public" on public.services;
create policy "Active services are public"
on public.services for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Active programs are public" on public.programs;
create policy "Active programs are public"
on public.programs for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Active events are public" on public.events;
create policy "Active events are public"
on public.events for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Active resources are public" on public.resources;
create policy "Active resources are public"
on public.resources for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public can submit contact messages" on public.contact_messages;
create policy "Public can submit contact messages"
on public.contact_messages for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can submit membership applications" on public.membership_applications;
create policy "Public can submit membership applications"
on public.membership_applications for insert
to anon, authenticated
with check (true);

drop policy if exists "Approved admins manage pages" on public.pages;
create policy "Approved admins manage pages"
on public.pages for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Approved admins manage services" on public.services;
create policy "Approved admins manage services"
on public.services for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Approved admins manage programs" on public.programs;
create policy "Approved admins manage programs"
on public.programs for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Approved admins manage events" on public.events;
create policy "Approved admins manage events"
on public.events for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Approved admins manage resources" on public.resources;
create policy "Approved admins manage resources"
on public.resources for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Approved admins manage members" on public.members;
create policy "Approved admins manage members"
on public.members for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Active members are public" on public.members;
create policy "Active members are public"
on public.members for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Approved admins manage membership applications" on public.membership_applications;
create policy "Approved admins manage membership applications"
on public.membership_applications for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Approved admins manage contact messages" on public.contact_messages;
create policy "Approved admins manage contact messages"
on public.contact_messages for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());

drop policy if exists "Approved admins manage site settings" on public.site_settings;
create policy "Approved admins manage site settings"
on public.site_settings for all to authenticated
using (public.is_approved_admin())
with check (public.is_approved_admin());
