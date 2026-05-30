"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function createPageContent(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/pages");
    return;
  }

  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("pages").insert({
    slug: getText(formData, "slug"),
    title: getText(formData, "title"),
    summary: getText(formData, "summary"),
    content: getText(formData, "content"),
    is_published: formData.get("isPublished") === "on"
  });

  if (error) throw new Error(`Error creating page: ${error.message}`);

  revalidatePath("/admin/pages");
}

export async function updatePageContent(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/pages");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase
    .from("pages")
    .update({
      slug: getText(formData, "slug"),
      title: getText(formData, "title"),
      summary: getText(formData, "summary"),
      content: getText(formData, "content"),
      is_published: formData.get("isPublished") === "on"
    })
    .eq("id", id);

  if (error) throw new Error(`Error updating page: ${error.message}`);

  revalidatePath("/admin/pages");
}

export async function updateBenefitGuideContent(formData: FormData) {
  const slug = getText(formData, "slug");

  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/benefits");
    revalidatePath(`/benefits/${slug.replace("benefits/", "")}`);
    return;
  }

  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("pages").upsert(
    {
      slug,
      title: getText(formData, "title"),
      summary: getText(formData, "summary"),
      content: getText(formData, "content"),
      is_published: formData.get("isPublished") === "on"
    },
    { onConflict: "slug" }
  );

  if (error) throw new Error(`Error updating benefit guide: ${error.message}`);

  revalidatePath("/admin/benefits");
  revalidatePath("/admin/pages");
  revalidatePath("/benefits");
  revalidatePath(`/benefits/${slug.replace("benefits/", "")}`);
}

export async function deletePageContent(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/pages");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("pages").delete().eq("id", id);

  if (error) throw new Error(`Error deleting page: ${error.message}`);

  revalidatePath("/admin/pages");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
