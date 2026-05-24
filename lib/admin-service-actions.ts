"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function createService(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/services");
    return;
  }

  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("services").insert({
    title: getText(formData, "title"),
    description: getText(formData, "description"),
    category: getText(formData, "category"),
    display_order: getNumber(formData, "displayOrder"),
    is_active: formData.get("isActive") === "on"
  });

  if (error) throw new Error(`Error creating service: ${error.message}`);

  revalidatePath("/admin/services");
}

export async function updateService(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/services");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase
    .from("services")
    .update({
      title: getText(formData, "title"),
      description: getText(formData, "description"),
      category: getText(formData, "category"),
      display_order: getNumber(formData, "displayOrder"),
      is_active: formData.get("isActive") === "on"
    })
    .eq("id", id);

  if (error) throw new Error(`Error updating service: ${error.message}`);

  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/services");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) throw new Error(`Error deleting service: ${error.message}`);

  revalidatePath("/admin/services");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));

  return Number.isFinite(value) ? value : 0;
}
