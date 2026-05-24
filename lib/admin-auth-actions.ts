"use server";

import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function loginAdmin(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/dashboard");
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirect("/admin/login?error=invalid");
  }

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  if (hasSupabaseEnv()) {
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}
