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

export async function approveMembershipApplication(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/members");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();
  const { data: application, error: readError } = await supabase
    .from("membership_applications")
    .select("full_name, email, phone, member_type, message")
    .eq("id", id)
    .maybeSingle();

  if (readError || !application) {
    throw new Error(`Error reading application: ${readError?.message ?? "Application not found"}`);
  }

  const { error: memberError } = await supabase.from("members").insert({
    full_name: application.full_name,
    email: application.email,
    phone: application.phone,
    member_type: application.member_type || "Community Member",
    status: "active",
    notes: application.message
  });

  if (memberError) throw new Error(`Error approving application: ${memberError.message}`);

  const { error: applicationError } = await supabase
    .from("membership_applications")
    .update({ status: "approved", reviewed_at: new Date().toISOString() })
    .eq("id", id);

  if (applicationError) {
    throw new Error(`Error updating application: ${applicationError.message}`);
  }

  revalidatePath("/admin/members");
}

export async function rejectMembershipApplication(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/members");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();
  const { error } = await supabase
    .from("membership_applications")
    .update({ status: "rejected", reviewed_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(`Error rejecting application: ${error.message}`);

  revalidatePath("/admin/members");
}

export async function deleteMembershipApplication(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidatePath("/admin/members");
    return;
  }

  const id = getText(formData, "id");
  const supabase = await getVerifiedAdminClient();
  const { error } = await supabase
    .from("membership_applications")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Error deleting application: ${error.message}`);

  revalidatePath("/admin/members");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
