-- EDCH starter content seed
-- Safe to run more than once. It updates matching starter rows instead of duplicating them.
-- Uses MERGE so no extra table constraints are required.

merge into public.services target
using (
  values
    ('Community Support', 'Friendly first-step support for people with disabilities, families, caregivers, newcomers, and community members looking for connection and guidance.', 'Support', 1, true),
    ('Disability Service Navigation', 'Help understanding available disability supports, public programs, community services, and where to start when looking for assistance.', 'Navigation', 2, true),
    ('Advocacy and Rights Awareness', 'Plain-language information sessions and community conversations about accessibility, rights, inclusion, and respectful self-advocacy.', 'Advocacy', 3, true),
    ('Family and Caregiver Support', 'Supportive space for families and caregivers to share questions, learn about services, and reduce isolation.', 'Family Support', 4, true),
    ('Newcomer Disability Support', 'Guidance for newcomers and immigrant families learning how disability supports, community services, and accessibility systems work in Alberta.', 'Newcomer Support', 5, true),
    ('Resource Sharing', 'Curated links, guides, referrals, and community information to help people find trusted support faster.', 'Resources', 6, true)
) as seed(title, description, category, display_order, is_active)
on target.title = seed.title
when matched then update set
  description = seed.description,
  category = seed.category,
  display_order = seed.display_order,
  is_active = seed.is_active,
  updated_at = now()
when not matched then insert (title, description, category, display_order, is_active)
values (seed.title, seed.description, seed.category, seed.display_order, seed.is_active);

merge into public.programs target
using (
  values
    ('Monthly Community Meetings', 'Regular gatherings where community members can connect, share updates, ask questions, and help shape EDCH priorities.', 'Community', 1, true),
    ('Digital Skills Training', 'Practical support for using phones, email, online forms, accessibility tools, and digital services safely and confidently.', 'Training', 2, true),
    ('English and Citizenship Support', 'Introductory learning support for newcomers who want to strengthen English communication and understand Canadian civic life.', 'Learning', 3, true),
    ('Accessibility Awareness', 'Workshops and conversations that help community members, volunteers, and partners understand accessibility and inclusion.', 'Accessibility', 4, true),
    ('Family Support Sessions', 'Group sessions for families and caregivers to learn, share experiences, and connect with useful supports.', 'Family Support', 5, true),
    ('Volunteer Leadership', 'Training and mentoring for volunteers who want to support EDCH events, outreach, navigation, and community leadership.', 'Volunteer', 6, true)
) as seed(title, description, category, display_order, is_active)
on target.title = seed.title
when matched then update set
  description = seed.description,
  category = seed.category,
  display_order = seed.display_order,
  is_active = seed.is_active,
  updated_at = now()
when not matched then insert (title, description, category, display_order, is_active)
values (seed.title, seed.description, seed.category, seed.display_order, seed.is_active);

merge into public.events target
using (
  values
    ('Community Information Session', 'A sample upcoming activity where community members can learn about EDCH, ask questions, and share local disability support needs.', null::date, 'Edmonton, Alberta', 'sample', true),
    ('Disability Services Workshop', 'A sample workshop focused on understanding disability supports, navigation steps, and community resources in Alberta.', null::date, 'Edmonton, Alberta', 'sample', true),
    ('Digital Skills Training Day', 'A sample training day for learning basic digital tools, online forms, email, mobile accessibility features, and safe internet use.', null::date, 'Edmonton, Alberta', 'sample', true)
) as seed(title, description, event_date, location, status, is_active)
on target.title = seed.title
when matched then update set
  description = seed.description,
  event_date = seed.event_date,
  location = seed.location,
  status = seed.status,
  is_active = seed.is_active,
  updated_at = now()
when not matched then insert (title, description, event_date, location, status, is_active)
values (seed.title, seed.description, seed.event_date, seed.location, seed.status, seed.is_active);

merge into public.resources target
using (
  values
    ('Alberta Disability Services', 'Official Alberta government information about disability supports, programs, and services.', 'Government', 'https://www.alberta.ca/disability-services', 1, true),
    ('AISH Information', 'Official information about Assured Income for the Severely Handicapped, including eligibility and application details.', 'Income Support', 'https://www.alberta.ca/aish', 2, true),
    ('Alberta Disability Assistance Program (ADAP)', 'Official Alberta government information about the Alberta Disability Assistance Program, a disability support program scheduled for launch in 2026.', 'Income Support', 'https://www.alberta.ca/alberta-disability-assistance-program', 3, true),
    ('Accessible Transportation', 'Starting point for accessible public transportation information and paratransit options in Edmonton.', 'Transportation', 'https://www.edmonton.ca/ets/dats', 4, true),
    ('Community Legal Support', 'Information about community legal support and referrals for people who need help understanding rights and options.', 'Legal', 'https://www.eclc.ca', 5, true),
    ('Settlement Services', 'Starting point for newcomer settlement support and community connections in Edmonton.', 'Newcomer Support', 'https://newcomercentre.com', 6, true),
    ('Accessibility Rights', 'Information about accessibility, human rights, and inclusion responsibilities in Alberta.', 'Rights', 'https://albertahumanrights.ab.ca', 7, true)
) as seed(title, description, category, url, display_order, is_active)
on target.title = seed.title
when matched then update set
  description = seed.description,
  category = seed.category,
  url = seed.url,
  display_order = seed.display_order,
  is_active = seed.is_active,
  updated_at = now()
when not matched then insert (title, description, category, url, display_order, is_active)
values (seed.title, seed.description, seed.category, seed.url, seed.display_order, seed.is_active);

merge into public.pages target
using (
  values
    ('home', 'EDCH Home', 'Overview of Edmonton Disability Community Hub.', 'EDCH connects people with disabilities, families, caregivers, newcomers, volunteers, and community partners through support, information, advocacy, training, and inclusive community programs.', true),
    ('about', 'About EDCH', 'Who EDCH is and why the community hub matters.', 'EDCH is a community-led disability support hub being developed in Edmonton to help people connect, understand services, reduce isolation, and build community leadership.', true),
    ('donate', 'Support EDCH', 'Donation, grant, partnership, and volunteer support information.', 'EDCH is being developed as a community-led disability support hub. Donations, grants, partnerships, and volunteer support can help with meetings, training, outreach, accessibility support, and future programs.', true),
    ('contact', 'Contact EDCH', 'How to connect with Edmonton Disability Community Hub.', 'Contact EDCH to ask a question, become a member, volunteer, request support, partner with the community, or discuss future funding support.', true)
) as seed(slug, title, summary, content, is_published)
on target.slug = seed.slug
when matched then update set
  title = seed.title,
  summary = seed.summary,
  content = seed.content,
  is_published = seed.is_published,
  updated_at = now()
when not matched then insert (slug, title, summary, content, is_published)
values (seed.slug, seed.title, seed.summary, seed.content, seed.is_published);

insert into public.site_settings (
  organization_name,
  email,
  phone,
  location,
  facebook_url,
  instagram_url,
  linkedin_url
)
select
  'Edmonton Disability Community Hub',
  'info@edch.ca',
  '',
  'Edmonton, Alberta, Canada',
  '',
  '',
  ''
where not exists (select 1 from public.site_settings);
