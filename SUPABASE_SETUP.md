# EDCH Supabase Setup

This project is prepared for Supabase Auth and Supabase PostgreSQL, but it does
not require a live Supabase project yet. When you are ready, follow these steps.

## 1. Create a Supabase Project

1. Go to Supabase and create a new project.
2. Save the project password somewhere safe.
3. Open Project Settings, then API.
4. Copy the project URL, anon key, and service role key.

## 2. Create `.env.local`

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Restart the Next.js dev server after adding these values.

## 3. Run the SQL Schema

1. In Supabase, open SQL Editor.
2. Open `supabase/schema.sql` from this project.
3. Paste the full SQL into Supabase SQL Editor.
4. Run it.

This creates:

- `admin_users`
- `pages`
- `services`
- `programs`
- `events`
- `resources`
- `members`
- `membership_applications`
- `contact_messages`
- `site_settings`

It also enables Row Level Security and adds policies for approved admins.

## 4. Create the First Admin User

1. In Supabase, go to Authentication.
2. Create a user with email and password.
3. Copy that user's UUID.
4. Run this SQL in Supabase SQL Editor:

```sql
insert into public.admin_users (user_id, email, full_name, role, is_approved)
values (
  'PASTE_AUTH_USER_UUID_HERE',
  'admin@example.com',
  'First Admin',
  'admin',
  true
);
```

After this, that approved admin can log in at `/admin/login`.

## 5. How Admin Protection Works

- `/admin/login` stays public.
- All other `/admin` routes are protected when Supabase env variables exist.
- If env variables are missing, the dashboard remains available as demo UI.
- Only users with an approved row in `admin_users` can enter the dashboard.

## 6. Admin Data Connection

The admin dashboard pages are prepared to read from Supabase when environment
variables are configured:

- Dashboard stats read table counts.
- Pages reads from `pages`.
- Services reads from `services`.
- Programs reads from `programs`.
- Events reads from `events`.
- Resources reads from `resources`.
- Members reads from `members`.
- Membership applications read from `membership_applications` and can be
  approved into `members`.
- Messages reads from `contact_messages`.
- Settings reads from `site_settings`.
- Public Services, Programs, Events, and Resources pages read active Supabase
  records when configured.

If Supabase is not configured, the admin pages automatically use local demo data
from `data/admin-content.ts`.

## 7. Admin Write Actions

The Services, Programs, Events, and Resources admin pages now use the CRUD pattern:

- Add item
- Edit item
- Delete item
- Revalidate the matching admin page after changes
- Uses demo no-op behavior when Supabase is not configured

Site Settings can now be saved to Supabase with the same fallback approach.
Pages, Members, and Messages can follow the same server-action pattern.

## 8. Current Limits

- No real public content editing is connected yet.
- No payment processing is connected.
- No file upload is connected.
- The contact form saves to `contact_messages` when Supabase is configured,
  and falls back to demo success behavior when Supabase is missing.
- Admin Add/Edit/Delete buttons outside Services, Programs, Events, Resources,
  and Settings are still demo UI until write actions are added.
