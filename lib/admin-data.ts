import { unstable_noStore as noStore } from "next/cache";
import { adminContent } from "@/data/admin-content";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Stat = {
  label: string;
  value: string;
  tone: string;
};

type TableRow = Record<string, string>;

type Settings = typeof adminContent.settings;

export type AdminServiceRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  displayOrder: string;
  isActive: boolean;
};

export type AdminProgramRecord = AdminServiceRecord;

export type AdminEventRecord = {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  status: string;
  isActive: boolean;
};

export type AdminResourceRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  displayOrder: string;
  isActive: boolean;
};

export type AdminMessageRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
};

export type AdminMemberRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  memberType: string;
  status: string;
  notes: string;
};

export type AdminMembershipApplicationRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  memberType: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
};

export type AdminPageRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  isPublished: boolean;
  updatedAt: string;
};

export async function getAdminStats(): Promise<Stat[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.stats;
  }

  try {
    const supabase = createSupabaseServerClient();
    const [programs, events, resources, messages, members] = await Promise.all([
      countRows("programs", supabase),
      countRows("events", supabase),
      countRows("resources", supabase),
      countRows("contact_messages", supabase),
      countRows("members", supabase)
    ]);

    return [
      { label: "Total programs", value: String(programs), tone: "blue" },
      { label: "Upcoming events", value: String(events), tone: "green" },
      { label: "Resources", value: String(resources), tone: "blue" },
      { label: "Contact messages", value: String(messages), tone: "green" },
      { label: "Members", value: String(members), tone: "blue" }
    ];
  } catch {
    return adminContent.stats;
  }
}

export async function getAdminPages(): Promise<TableRow[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.pages;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("pages")
      .select("title, is_published, updated_at")
      .order("title");

    if (error || !data) return adminContent.pages;

    return data.map((page) => ({
      page: page.title ?? "Untitled page",
      status: page.is_published ? "Published" : "Draft",
      updated: formatDate(page.updated_at)
    }));
  } catch {
    return adminContent.pages;
  }
}

export async function getAdminPageRecords(): Promise<AdminPageRecord[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.pages.map((page, index) => ({
      id: `demo-${index + 1}`,
      slug: page.page.toLowerCase().replaceAll(" ", "-"),
      title: page.page,
      summary: "Demo page summary. Real content will appear here after Supabase is configured.",
      content: "Demo page content.",
      isPublished: page.status === "Published",
      updatedAt: page.updated
    }));
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("pages")
      .select("id, slug, title, summary, content, is_published, updated_at")
      .order("title");

    if (error || !data) return [];

    return data.map((page) => ({
      id: page.id ?? "",
      slug: page.slug ?? "",
      title: page.title ?? "",
      summary: page.summary ?? "",
      content: page.content ?? "",
      isPublished: Boolean(page.is_published),
      updatedAt: formatDate(page.updated_at)
    }));
  } catch {
    return [];
  }
}

export async function getAdminServices(): Promise<TableRow[]> {
  return getSimpleContentRows("services", adminContent.services);
}

export async function getAdminServiceRecords(): Promise<AdminServiceRecord[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.services.map((service, index) => ({
      id: `demo-${index + 1}`,
      title: service.title,
      description: "Demo service description. This will connect to Supabase when configured.",
      category: service.category,
      displayOrder: String(index + 1),
      isActive: service.status === "Visible"
    }));
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("services")
      .select("id, title, description, category, display_order, is_active")
      .order("display_order");

    if (error || !data) return [];

    return data.map((service) => ({
      id: service.id ?? "",
      title: service.title ?? "",
      description: service.description ?? "",
      category: service.category ?? "",
      displayOrder: String(service.display_order ?? 0),
      isActive: Boolean(service.is_active)
    }));
  } catch {
    return [];
  }
}

export async function getAdminPrograms(): Promise<TableRow[]> {
  return getSimpleContentRows("programs", adminContent.programs);
}

export async function getAdminProgramRecords(): Promise<AdminProgramRecord[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.programs.map((program, index) => ({
      id: `demo-${index + 1}`,
      title: program.title,
      description: "Demo program description. This will connect to Supabase when configured.",
      category: program.category,
      displayOrder: String(index + 1),
      isActive: program.status === "Planning"
    }));
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("programs")
      .select("id, title, description, category, display_order, is_active")
      .order("display_order");

    if (error || !data) return [];

    return data.map((program) => ({
      id: program.id ?? "",
      title: program.title ?? "",
      description: program.description ?? "",
      category: program.category ?? "",
      displayOrder: String(program.display_order ?? 0),
      isActive: Boolean(program.is_active)
    }));
  } catch {
    return [];
  }
}

export async function getAdminEvents(): Promise<TableRow[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.events;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("events")
      .select("title, event_date, location, status")
      .order("event_date", { ascending: true, nullsFirst: false });

    if (error || !data) return adminContent.events;

    return data.map((event) => ({
      title: event.title ?? "Untitled event",
      date: event.event_date ? formatDate(event.event_date) : "To be confirmed",
      location: event.location ?? "To be confirmed",
      status: event.status ?? "Draft"
    }));
  } catch {
    return adminContent.events;
  }
}

export async function getAdminEventRecords(): Promise<AdminEventRecord[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.events.map((event, index) => ({
      id: `demo-${index + 1}`,
      title: event.title,
      description: "Demo event description. This will connect to Supabase when configured.",
      eventDate: "",
      location: event.location,
      status: event.status,
      isActive: true
    }));
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("events")
      .select("id, title, description, event_date, location, status, is_active")
      .order("event_date", { ascending: true, nullsFirst: false });

    if (error || !data) return [];

    return data.map((event) => ({
      id: event.id ?? "",
      title: event.title ?? "",
      description: event.description ?? "",
      eventDate: event.event_date ?? "",
      location: event.location ?? "",
      status: event.status ?? "draft",
      isActive: Boolean(event.is_active)
    }));
  } catch {
    return [];
  }
}

export async function getAdminResources(): Promise<TableRow[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.resources;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("resources")
      .select("title, category, url")
      .order("display_order");

    if (error || !data) return adminContent.resources;

    return data.map((resource) => ({
      title: resource.title ?? "Untitled resource",
      category: resource.category ?? "General",
      link: resource.url ?? "Not added"
    }));
  } catch {
    return adminContent.resources;
  }
}

export async function getAdminResourceRecords(): Promise<AdminResourceRecord[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.resources.map((resource, index) => ({
      id: `demo-${index + 1}`,
      title: resource.title,
      description: "Demo resource description. This will connect to Supabase when configured.",
      category: resource.category,
      url: resource.link === "Placeholder" ? "" : resource.link,
      displayOrder: String(index + 1),
      isActive: true
    }));
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("resources")
      .select("id, title, description, category, url, display_order, is_active")
      .order("display_order");

    if (error || !data) return [];

    return data.map((resource) => ({
      id: resource.id ?? "",
      title: resource.title ?? "",
      description: resource.description ?? "",
      category: resource.category ?? "",
      url: resource.url ?? "",
      displayOrder: String(resource.display_order ?? 0),
      isActive: Boolean(resource.is_active)
    }));
  } catch {
    return [];
  }
}

export async function getAdminMembers(): Promise<TableRow[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.members;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("members")
      .select("full_name, member_type, status")
      .order("created_at", { ascending: false });

    if (error || !data) return adminContent.members;

    return data.map((member) => ({
      name: member.full_name ?? "Unnamed member",
      role: member.member_type ?? "Member",
      status: member.status ?? "Pending"
    }));
  } catch {
    return adminContent.members;
  }
}

export async function getAdminMembershipApplicationRecords(): Promise<
  AdminMembershipApplicationRecord[]
> {
  noStore();

  if (!hasSupabaseEnv()) {
    return [];
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("membership_applications")
      .select("id, full_name, email, phone, member_type, interest, message, status, created_at")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((application) => ({
      id: application.id ?? "",
      fullName: application.full_name ?? "",
      email: application.email ?? "",
      phone: application.phone ?? "",
      memberType: application.member_type ?? "Community Member",
      interest: application.interest ?? "",
      message: application.message ?? "",
      status: application.status ?? "pending",
      createdAt: formatDate(application.created_at)
    }));
  } catch {
    return [];
  }
}

export async function getAdminMemberRecords(): Promise<AdminMemberRecord[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.members.map((member, index) => ({
      id: `demo-${index + 1}`,
      fullName: member.name,
      email: "demo@example.com",
      phone: "Demo only",
      memberType: member.role,
      status: member.status.toLowerCase().replaceAll(" ", "-"),
      notes: "Demo member record. Real members will appear here after Supabase is configured."
    }));
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("members")
      .select("id, full_name, email, phone, member_type, status, notes")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((member) => ({
      id: member.id ?? "",
      fullName: member.full_name ?? "",
      email: member.email ?? "",
      phone: member.phone ?? "",
      memberType: member.member_type ?? "",
      status: member.status ?? "pending",
      notes: member.notes ?? ""
    }));
  } catch {
    return [];
  }
}

export async function getAdminMessages(): Promise<TableRow[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.messages;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("full_name, interest, status")
      .order("created_at", { ascending: false });

    if (error || !data) return adminContent.messages;

    return data.map((message) => ({
      name: message.full_name ?? "Unknown sender",
      interest: message.interest ?? "General",
      status: message.status ?? "Unread"
    }));
  } catch {
    return adminContent.messages;
  }
}

export async function getAdminMessageRecords(): Promise<AdminMessageRecord[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.messages.map((message, index) => ({
      id: `demo-${index + 1}`,
      name: message.name,
      email: "demo@example.com",
      phone: "Demo only",
      interest: message.interest,
      message: "Demo contact message. Real messages will appear here after Supabase is configured.",
      status: message.status.toLowerCase(),
      createdAt: "Demo data"
    }));
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("id, full_name, email, phone, interest, message, status, created_at")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((message) => ({
      id: message.id ?? "",
      name: message.full_name ?? "Unknown sender",
      email: message.email ?? "",
      phone: message.phone ?? "",
      interest: message.interest ?? "General",
      message: message.message ?? "",
      status: message.status ?? "unread",
      createdAt: formatDate(message.created_at)
    }));
  } catch {
    return [];
  }
}

export async function getAdminSettings(): Promise<Settings> {
  noStore();

  if (!hasSupabaseEnv()) {
    return adminContent.settings;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select(
        "organization_name, email, phone, location, facebook_url, instagram_url, linkedin_url"
      )
      .limit(1)
      .maybeSingle();

    if (error || !data) return adminContent.settings;

    return {
      organizationName: data.organization_name ?? adminContent.settings.organizationName,
      email: data.email ?? "",
      phone: data.phone ?? "",
      location: data.location ?? "",
      facebook: data.facebook_url ?? "",
      instagram: data.instagram_url ?? "",
      linkedin: data.linkedin_url ?? ""
    };
  } catch {
    return adminContent.settings;
  }
}

async function getSimpleContentRows(
  table: "services" | "programs",
  fallback: TableRow[]
): Promise<TableRow[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return fallback;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from(table)
      .select("title, category, is_active")
      .order("display_order");

    if (error || !data) return fallback;

    return data.map((item) => ({
      title: item.title ?? "Untitled",
      category: item.category ?? "General",
      status: item.is_active ? "Visible" : "Hidden"
    }));
  } catch {
    return fallback;
  }
}

async function countRows(table: string, supabase: ReturnType<typeof createSupabaseServerClient>) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) {
    return 0;
  }

  return count ?? 0;
}

function formatDate(value: string | null) {
  if (!value) return "Not updated";

  return new Intl.DateTimeFormat("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}
