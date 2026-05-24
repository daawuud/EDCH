import Link from "next/link";
import { AdminLayout } from "@/components/admin/admin-layout";
import { StatCard } from "@/components/admin/stat-card";
import { adminContent } from "@/data/admin-content";
import { getAdminStats } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <AdminLayout
      title="Dashboard"
      description="Overview of EDCH website content, programs, events, messages, and demo member records."
    >
      <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-black text-edch-green ring-1 ring-green-100">
        Supabase-ready admin UI. If Supabase is not configured, demo data is shown automatically.
      </p>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
        <h2 className="text-xl font-black text-edch-ink dark:text-white">Quick actions</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {adminContent.quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-2xl bg-edch-blue px-5 py-4 text-center text-sm font-black text-white transition hover:bg-blue-800"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
