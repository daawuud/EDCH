import Link from "next/link";
import type { ReactNode } from "react";
import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import { languages, somaliIntro, somaliLinks } from "@/data/languages-content";

const categories = ["EDCH", "Benefits & Supports", "Resources"] as const;

export default function AdminLanguagesPage() {
  const availableLanguages = languages.filter((language) => language.available);
  const comingSoonLanguages = languages.filter((language) => !language.available);

  return (
    <AdminLayout
      title="Manage Other Languages"
      description="Review the multilingual navigation structure, Somali resources, and coming-soon language sections."
    >
      <section className="grid gap-5 md:grid-cols-3">
        <SummaryCard label="Available languages" value={String(availableLanguages.length)} />
        <SummaryCard label="Somali resources" value={String(somaliLinks.length)} />
        <SummaryCard label="Coming soon" value={String(comingSoonLanguages.length)} />
      </section>

      <AdminFormCard
        title="Other Languages overview"
        description="The public header now keeps translated content inside a separate Other Languages dropdown. Somali is the only active language section for now."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AdminLink href="/languages">View language hub</AdminLink>
          <AdminLink href="/languages/somali">View Somali hub</AdminLink>
          <AdminLink href="/admin/pages">Manage editable page records</AdminLink>
        </div>
      </AdminFormCard>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-edch-green">
          Somali landing page
        </p>
        <h2 className="mt-2 text-2xl font-black text-edch-ink dark:text-white">
          Somali resources are grouped separately from the English menu
        </h2>
        <p className="mt-3 max-w-4xl font-semibold leading-7 text-slate-600 dark:text-slate-300">
          {somaliIntro}
        </p>
      </section>

      <section className="mt-8 grid gap-6">
        {categories.map((category) => {
          const links = somaliLinks.filter((link) => link.category === category);

          return (
            <article
              key={category}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-edch-green">
                    Somali group
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-edch-ink dark:text-white">
                    {category}
                  </h2>
                </div>
                <span className="rounded-full bg-edch-mint px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-edch-green dark:bg-white/10 dark:text-white">
                  {links.length} pages
                </span>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {links.map((link) => (
                  <div
                    key={link.href}
                    className="rounded-2xl border border-blue-100 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/60"
                  >
                    <h3 className="text-lg font-black text-edch-ink dark:text-white">
                      {link.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                      {link.description}
                    </p>
                    <Link
                      href={link.href}
                      className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-edch-blue ring-1 ring-blue-100 transition hover:bg-edch-sky dark:bg-white/10 dark:text-white dark:ring-white/10"
                    >
                      View public page
                    </Link>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-edch-green">
          Planned languages
        </p>
        <h2 className="mt-2 text-2xl font-black text-edch-ink dark:text-white">
          Coming soon language sections
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {comingSoonLanguages.map((language) => (
            <span
              key={language.label}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-600 dark:bg-white/10 dark:text-slate-300"
            >
              {language.label} - Coming Soon
            </span>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black text-edch-blue dark:text-blue-300">
        {value}
      </p>
    </div>
  );
}

function AdminLink({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-edch-blue px-5 py-4 text-center text-sm font-black text-white transition hover:bg-blue-800"
    >
      {children}
    </Link>
  );
}
