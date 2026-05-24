import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import { getAdminSettings } from "@/lib/admin-data";
import { saveSiteSettings } from "@/lib/admin-settings-actions";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();
  const settingsFields = [
    ["Organization name", "organizationName", settings.organizationName],
    ["Email", "email", settings.email],
    ["Phone", "phone", settings.phone],
    ["Location", "location", settings.location],
    ["Facebook", "facebook", settings.facebook],
    ["Instagram", "instagram", settings.instagram],
    ["LinkedIn", "linkedin", settings.linkedin]
  ];
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <AdminLayout title="Settings" description="Manage EDCH organization details and social links.">
      {!isSupabaseConfigured ? (
        <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so Save Settings will not
          write to a database.
        </p>
      ) : null}

      <AdminFormCard title="Site settings" description="Update organization name, contact details, location, and social links.">
        <form action={saveSiteSettings} className="grid gap-4 md:grid-cols-2">
          {settingsFields.map(([label, name, value]) => (
            <label key={label} className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              {label}
              <input
                name={name}
                defaultValue={value}
                className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </label>
          ))}
          <button className="rounded-full bg-edch-green px-6 py-3 font-black text-white md:col-span-2">
            Save Settings
          </button>
        </form>
      </AdminFormCard>
    </AdminLayout>
  );
}
