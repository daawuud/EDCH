"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function createProgram(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/programs");
    return;
  }

  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("programs").insert({
    title: getText(formData, "title"),
    description: getText(formData, "description"),
    category: getText(formData, "category"),
    display_order: getNumber(formData, "displayOrder"),
    is_active: formData.get("isActive") === "on"
  });

  if (error) throw new Error(`Error creating program: ${error.message}`);

  revalidatePath("/admin/programs");
}

export async function updateProgram(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/programs");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase
    .from("programs")
    .update({
      title: getText(formData, "title"),
      description: getText(formData, "description"),
      category: getText(formData, "category"),
      display_order: getNumber(formData, "displayOrder"),
      is_active: formData.get("isActive") === "on"
    })
    .eq("id", id);

  if (error) throw new Error(`Error updating program: ${error.message}`);

  revalidatePath("/admin/programs");
}

export async function deleteProgram(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/programs");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("programs").delete().eq("id", id);

  if (error) throw new Error(`Error deleting program: ${error.message}`);

  revalidatePath("/admin/programs");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));

  return Number.isFinite(value) ? value : 0;
}
