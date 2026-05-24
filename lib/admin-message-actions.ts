"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function markMessageRead(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/messages");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase
    .from("contact_messages")
    .update({ status: "read" })
    .eq("id", id);

  if (error) throw new Error(`Error updating message: ${error.message}`);

  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/messages");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("contact_messages").delete().eq("id", id);

  if (error) throw new Error(`Error deleting message: ${error.message}`);

  revalidatePath("/admin/messages");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
