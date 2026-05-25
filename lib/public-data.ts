import { unstable_noStore as noStore } from "next/cache";
import { siteContent } from "@/data/site-content";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PublicCard = {
  title: string;
  description: string;
  href?: string;
};

type PublicEvent = PublicCard & {
  meta: string;
};

type PublicMember = {
  fullName: string;
  memberType: string;
  status: string;
};

export async function getPublicServices(): Promise<PublicCard[]> {
  return getPublicCards("services", siteContent.services);
}

export async function getPublicPrograms(): Promise<PublicCard[]> {
  return getPublicCards("programs", siteContent.programs);
}

export async function getPublicResources(): Promise<PublicCard[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return siteContent.resources;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("resources")
      .select("title, description, url")
      .eq("is_active", true)
      .order("display_order");

    if (error || !data || data.length === 0) return siteContent.resources;

    return data.map((resource) => ({
      title: resource.title ?? "Untitled resource",
      description: resource.description ?? "",
      href: resource.url ?? undefined
    }));
  } catch {
    return siteContent.resources;
  }
}

export async function getPublicEvents(): Promise<PublicEvent[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return siteContent.events.map((event) => ({
      ...event,
      meta: "Sample activity"
    }));
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("events")
      .select("title, description, event_date, location")
      .eq("is_active", true)
      .order("event_date", { ascending: true, nullsFirst: false });

    if (error || !data || data.length === 0) {
      return siteContent.events.map((event) => ({
        ...event,
        meta: "Sample activity"
      }));
    }

    return data.map((event) => ({
      title: event.title ?? "Untitled event",
      description: event.description ?? "",
      meta: [formatDate(event.event_date), event.location]
        .filter(Boolean)
        .join(" · ")
    }));
  } catch {
    return siteContent.events.map((event) => ({
      ...event,
      meta: "Sample activity"
    }));
  }
}

export async function getPublicMembers(): Promise<PublicMember[]> {
  noStore();

  if (!hasSupabaseEnv()) {
    return siteContent.membersFallback;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("members")
      .select("full_name, member_type, status")
      .eq("status", "active")
      .order("full_name");

    if (error || !data || data.length === 0) {
      return siteContent.membersFallback;
    }

    return data.map((member) => ({
      fullName: member.full_name ?? "Community member",
      memberType: member.member_type ?? "Member",
      status: member.status ?? "Active"
    }));
  } catch {
    return siteContent.membersFallback;
  }
}

async function getPublicCards(
  table: "services" | "programs",
  fallback: PublicCard[]
) {
  noStore();

  if (!hasSupabaseEnv()) {
    return fallback;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from(table)
      .select("title, description")
      .eq("is_active", true)
      .order("display_order");

    if (error || !data || data.length === 0) return fallback;

    return data.map((item) => ({
      title: item.title ?? "Untitled",
      description: item.description ?? ""
    }));
  } catch {
    return fallback;
  }
}

function formatDate(value: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}
