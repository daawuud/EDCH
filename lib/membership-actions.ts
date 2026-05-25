"use server";

import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function submitMembershipApplication(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/membership?applied=demo");
  }

  const supabase = createSupabaseServerClient();
  const payload = {
    full_name: getText(formData, "fullName"),
    email: getText(formData, "email"),
    phone: getText(formData, "phone"),
    member_type: getText(formData, "memberType") || "Community Member",
    interest: getText(formData, "interest"),
    message: getText(formData, "message"),
    status: "pending"
  };

  const { error } = await supabase.from("membership_applications").insert(payload);

  if (error) {
    redirect("/membership?error=application");
  }

  redirect("/membership?applied=1");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
