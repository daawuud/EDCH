"use server";

import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function submitContactMessage(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/contact?sent=demo");
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("contact_messages").insert({
    full_name: getText(formData, "fullName"),
    email: getText(formData, "email"),
    phone: getText(formData, "phone"),
    interest: getText(formData, "interest"),
    message: getText(formData, "message"),
    status: "unread"
  });

  if (error) {
    redirect("/contact?error=message");
  }

  redirect("/contact?sent=1");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
