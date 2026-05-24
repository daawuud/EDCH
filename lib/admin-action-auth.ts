"use server";

import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getVerifiedAdminClient() {
  const userClient = createSupabaseServerClient();
  const {
    data: { user }
  } = await userClient.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const adminClient = createSupabaseAdminClient();
  const { data: adminUser, error } = await adminClient
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .eq("is_approved", true)
    .maybeSingle();

  if (error || !adminUser) {
    redirect("/admin/login");
  }

  return adminClient;
}
