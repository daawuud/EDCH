-- Public members directory policy
-- Allows visitors to read only active member rows.
-- The app selects only safe public fields: full_name, member_type, and status.

drop policy if exists "Active members are public" on public.members;
create policy "Active members are public"
on public.members for select
to anon, authenticated
using (status = 'active');
