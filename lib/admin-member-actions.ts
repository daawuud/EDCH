"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function createMember(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/members");
    return;
  }

  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("members").insert({
    full_name: getText(formData, "fullName"),
    email: getText(formData, "email"),
    phone: getText(formData, "phone"),
    member_type: getText(formData, "memberType"),
    status: getText(formData, "status") || "pending",
    notes: getText(formData, "notes")
  });

  if (error) throw new Error(`Error creating member: ${error.message}`);

  revalidatePath("/admin/members");
}

export async function updateMember(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/members");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase
    .from("members")
    .update({
      full_name: getText(formData, "fullName"),
      email: getText(formData, "email"),
      phone: getText(formData, "phone"),
      member_type: getText(formData, "memberType"),
      status: getText(formData, "status") || "pending",
      notes: getText(formData, "notes")
    })
    .eq("id", id);

  if (error) throw new Error(`Error updating member: ${error.message}`);

  revalidatePath("/admin/members");
}

export async function deleteMember(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/members");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();

  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) throw new Error(`Error deleting member: ${error.message}`);

  revalidatePath("/admin/members");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
