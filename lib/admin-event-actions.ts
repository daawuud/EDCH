"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function createEvent(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/events");
    return;
  }

  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("events").insert({
    title: getText(formData, "title"),
    description: getText(formData, "description"),
    event_date: getNullableText(formData, "eventDate"),
    location: getText(formData, "location"),
    status: getText(formData, "status") || "draft",
    is_active: formData.get("isActive") === "on"
  });

  if (error) throw new Error(`Error creating event: ${error.message}`);

  revalidatePath("/admin/events");
}

export async function updateEvent(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/events");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase
    .from("events")
    .update({
      title: getText(formData, "title"),
      description: getText(formData, "description"),
      event_date: getNullableText(formData, "eventDate"),
      location: getText(formData, "location"),
      status: getText(formData, "status") || "draft",
      is_active: formData.get("isActive") === "on"
    })
    .eq("id", id);

  if (error) throw new Error(`Error updating event: ${error.message}`);

  revalidatePath("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/events");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) throw new Error(`Error deleting event: ${error.message}`);

  revalidatePath("/admin/events");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNullableText(formData: FormData, key: string) {
  const value = getText(formData, key);

  return value || null;
}
