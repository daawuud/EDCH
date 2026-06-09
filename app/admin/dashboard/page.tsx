import Link from "next/link";
import { AdminDashboardCard } from "@/components/admin/admin-dashboard-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import { StatCard } from "@/components/admin/stat-card";
import { adminContent } from "@/data/admin-content";
import { getAdminStats } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <AdminLayout
      title="Admin Dashboard"
      description="Manage the EDCH website structure, Benefits & Supports dropdown, multilingual content, and community records."
    >
      <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-black text-edch-green ring-1 ring-green-100">
        Supabase-ready admin UI. If Supabase is not configured, demo data is shown automatically.
      </p>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-6" aria-label="Dashboard summary">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-8">
        <div className="mb-5">
          <h2 className="text-2xl font-black text-edch-ink dark:text-white">
            Website management
          </h2>
          <p className="mt-2 max-w-3xl font-semibold leading-7 text-slate-600 dark:text-slate-300">
            Use the cards below to manage the public navigation areas, language sections, and grouped community links.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {adminContent.dashboardCards.map((card) => (
            <AdminDashboardCard
              key={card.href}
              title={card.title}
              description={card.description}
              href={card.href}
              accent={card.accent as "blue" | "green"}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
        <h2 className="text-xl font-black text-edch-ink dark:text-white">Quick actions</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
