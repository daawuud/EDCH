"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function saveSiteSettings(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/settings");
    return;
  }

  const supabase = await getVerifiedAdminClient();
  const settings = {
    organization_name: getText(formData, "organizationName"),
    email: getText(formData, "email"),
    phone: getText(formData, "phone"),
    location: getText(formData, "location"),
    facebook_url: getText(formData, "facebook"),
    instagram_url: getText(formData, "instagram"),
    linkedin_url: getText(formData, "linkedin")
  };

  const { data: existing } = await supabase
    .from("site_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (existing?.id) {
    const { error } = await supabase
      .from("site_settings")
      .update(settings)
      .eq("id", existing.id);

    if (error) throw new Error(`Error saving settings: ${error.message}`);
  } else {
    const { error } = await supabase.from("site_settings").insert(settings);

    if (error) throw new Error(`Error saving settings: ${error.message}`);
  }

  revalidatePath("/admin/settings");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
