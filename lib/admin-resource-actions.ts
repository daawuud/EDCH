"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { uploadResourceFile } from "@/lib/admin-file-upload";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function createResource(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/resources");
    return;
  }

  const supabase = await getVerifiedAdminClient();
  const uploadedUrl = await getUploadedResourceUrl(formData);

  const { error } = await supabase.from("resources").insert({
    title: getText(formData, "title"),
    description: getText(formData, "description"),
    category: getText(formData, "category"),
    url: uploadedUrl || getText(formData, "url"),
    display_order: getNumber(formData, "displayOrder"),
    is_active: formData.get("isActive") === "on"
  });

  if (error) throw new Error(`Error creating resource: ${error.message}`);

  revalidatePath("/admin/resources");
}

export async function updateResource(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/resources");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();
  const uploadedUrl = await getUploadedResourceUrl(formData);
  const currentUrl = getText(formData, "url");

  const { error } = await supabase
    .from("resources")
    .update({
      title: getText(formData, "title"),
      description: getText(formData, "description"),
      category: getText(formData, "category"),
      url: uploadedUrl || currentUrl,
      display_order: getNumber(formData, "displayOrder"),
      is_active: formData.get("isActive") === "on"
    })
    .eq("id", id);

  if (error) throw new Error(`Error updating resource: ${error.message}`);

  revalidatePath("/admin/resources");
}

export async function deleteResource(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/resources");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("resources").delete().eq("id", id);

  if (error) throw new Error(`Error deleting resource: ${error.message}`);

  revalidatePath("/admin/resources");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));

  return Number.isFinite(value) ? value : 0;
}

async function getUploadedResourceUrl(formData: FormData) {
  const file = formData.get("resourceFile");

  if (!(file instanceof File) || file.size === 0) {
    return "";
  }

  return uploadResourceFile(file);
}
