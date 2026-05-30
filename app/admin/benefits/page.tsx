import Link from "next/link";
import type { ReactNode } from "react";
import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import { benefitSections, benefitsIntro } from "@/data/benefits-content";
import { updateBenefitGuideContent } from "@/lib/admin-page-actions";
import { getAdminBenefitGuideRecords } from "@/lib/admin-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminBenefitsPage() {
  const guides = await getAdminBenefitGuideRecords();
  const isSupabaseConfigured = hasSupabaseEnv();
  const guideCount = benefitSections.reduce(
    (total, section) => total + section.items.length,
    0
  );

  return (
    <AdminLayout
      title="Manage Benefits & Supports"
      description="Review the public Benefits & Supports menu, submenu guide pages, and related admin management areas."
    >
      {!isSupabaseConfigured ? (
        <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so guide edits will not
          write to a database.
        </p>
      ) : null}

      <section className="grid gap-5 md:grid-cols-3">
        <SummaryCard label="Sections" value={String(benefitSections.length)} />
        <SummaryCard label="Submenu guides" value={String(guideCount)} />
        <SummaryCard label="Primary admin form" value="ADAP" />
      </section>

      <AdminFormCard
        title="Benefits & Supports overview"
        description={benefitsIntro}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AdminLink href="/benefits">View public benefits page</AdminLink>
          <AdminLink href="/admin/adap">Manage ADAP content</AdminLink>
          <AdminLink href="/admin/resources">Manage resource links</AdminLink>
        </div>
      </AdminFormCard>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-edch-green">
          AISH letters
        </p>
        <h2 className="mt-2 text-xl font-black text-edch-ink dark:text-white">
          Upload letters for people remaining on AISH
        </h2>
        <div className="mt-3 grid gap-4 leading-7 text-slate-600 md:grid-cols-[1.2fr_0.8fr] dark:text-slate-300">
          <div>
            <p>
              Use Resources for English and Somali AISH letter files. After
              uploading each file, copy the saved file URL into the AISH guide
              content below so community members can find both letters from the
              Benefits & Supports menu.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 font-semibold">
              <li>Open Manage resource links.</li>
              <li>Create one resource named AISH remaining support letter - English.</li>
              <li>Create one resource named AISH remaining support letter - Somali.</li>
              <li>Use category AISH Letters and upload each PDF or document.</li>
              <li>Paste both uploaded URLs into the AISH guide content.</li>
            </ol>
          </div>
          <div className="grid content-start gap-3">
            <AdminLink href="/admin/resources">Upload AISH letters</AdminLink>
            <AdminLink href="#guide-benefits-aish">Edit AISH guide</AdminLink>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6">
        {benefitSections.map((section) => (
          <article
            key={section.href}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-edch-green">
                  Benefits section
                </p>
                <h2 className="mt-2 text-2xl font-black text-edch-ink dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
                  {section.description}
                </p>
              </div>
              <Link
                href={section.href}
                className="inline-flex shrink-0 justify-center rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
              >
                View Section
              </Link>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {section.items.map((item) => (
                <GuideSummaryCard key={item.href} item={item} />
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-6">
        <div>
          <h2 className="text-2xl font-black text-edch-ink dark:text-white">
            Edit submenu guide pages
          </h2>
          <p className="mt-2 max-w-3xl font-semibold leading-7 text-slate-600 dark:text-slate-300">
            These records power individual Benefits & Supports submenu pages
            such as AISH, Alberta Supports, Housing Supports, and FAQs.
          </p>
        </div>

        {guides.map((guide) => (
          <article
            key={guide.slug}
            id={`guide-${guide.slug.replaceAll("/", "-")}`}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
          >
            <form action={updateBenefitGuideContent} className="grid gap-4 lg:grid-cols-4">
              <input type="hidden" name="slug" value={guide.slug} />
              <div className="lg:col-span-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-edch-green">
                      {guide.hasSavedContent ? "Saved guide" : "Not saved yet"}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-edch-ink dark:text-white">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                      Public path: {guide.href}
                    </p>
                  </div>
                  <Link
                    href={guide.href}
                    className="inline-flex justify-center rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-700 transition hover:bg-edch-sky hover:text-edch-blue dark:bg-white/10 dark:text-white"
                  >
                    View Public Guide
                  </Link>
                </div>
              </div>

              <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                Guide title
                <input
                  name="title"
                  defaultValue={guide.title}
                  required
                  className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200">
                <input
                  name="isPublished"
                  type="checkbox"
                  defaultChecked={guide.isPublished}
                  className="h-5 w-5 rounded border-blue-100"
                />
                Published
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-700 lg:col-span-4 dark:text-slate-200">
                Short summary
                <textarea
                  name="summary"
                  rows={2}
                  defaultValue={guide.summary}
                  className="resize-none rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-700 lg:col-span-4 dark:text-slate-200">
                Page content
                <textarea
                  name="content"
                  rows={7}
                  defaultValue={guide.content}
                  className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
                />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Add plain-language content. Line breaks will be preserved on
                  the public page.
                </span>
              </label>

              <div className="flex flex-col gap-3 lg:col-span-4 sm:flex-row sm:items-center">
                <button className="rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800">
                  Save Guide
                </button>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Last updated: {guide.updatedAt}
                </p>
              </div>
            </form>
          </article>
        ))}
      </section>
    </AdminLayout>
  );
}

function GuideSummaryCard({
  item
}: {
  item: { title: string; href: string; description: string };
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/60">
      <h3 className="text-lg font-black text-edch-ink dark:text-white">
        {item.title}
      </h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
        {item.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={item.href}
          className="rounded-full bg-white px-4 py-2 text-xs font-black text-edch-blue ring-1 ring-blue-100 transition hover:bg-edch-sky dark:bg-white/10 dark:text-white dark:ring-white/10"
        >
          View Guide
        </Link>
        {item.href === "/benefits/adap-transition" ? (
          <Link
            href="/admin/adap"
            className="rounded-full bg-edch-green px-4 py-2 text-xs font-black text-white transition hover:bg-green-700"
          >
            Edit ADAP
          </Link>
        ) : null}
      </div>
    </div>
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
