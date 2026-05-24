import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  createPageContent,
  deletePageContent,
  updatePageContent
} from "@/lib/admin-page-actions";
import { getAdminPageRecords } from "@/lib/admin-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminPagesPage() {
  const pages = await getAdminPageRecords();
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <AdminLayout title="Manage Pages" description="Create, update, and remove editable public page content records.">
      {!isSupabaseConfigured ? (
        <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so Save and Delete buttons
          will not write to a database.
        </p>
      ) : null}

      <AdminFormCard title="Add page content" description="Create an editable page record for future dynamic public pages.">
        <form action={createPageContent} className="grid gap-4 md:grid-cols-2">
          <PageFields />
          <button className="rounded-full bg-edch-green px-6 py-3 font-black text-white md:col-span-2">
            Add Page
          </button>
        </form>
      </AdminFormCard>

      <section className="mt-8 grid gap-5">
        {pages.length > 0 ? (
          pages.map((page) => (
            <article
              key={page.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
            >
              <form action={updatePageContent} className="grid gap-4 lg:grid-cols-4">
                <input type="hidden" name="id" value={page.id} />
                <PageFields page={page} />
                <p className="text-sm font-bold text-slate-500 lg:col-span-4 dark:text-slate-400">
                  Last updated: {page.updatedAt}
                </p>
                <button className="rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white lg:col-span-4">
                  Save Changes
                </button>
              </form>

              <form action={deletePageContent} className="mt-3">
                <input type="hidden" name="id" value={page.id} />
                <button className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-red-50 hover:text-red-700">
                  Delete Page
                </button>
              </form>
            </article>
          ))
        ) : (
          <p className="rounded-3xl bg-white p-6 font-bold text-slate-600 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10">
            No page records found yet. Add the first page above.
          </p>
        )}
      </section>
    </AdminLayout>
  );
}

function PageFields({
  page
}: {
  page?: {
    slug: string;
    title: string;
    summary: string;
    content: string;
    isPublished: boolean;
  };
}) {
  return (
    <>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Page title
        <input
          name="title"
          defaultValue={page?.title}
          required
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Slug
        <input
          name="slug"
          defaultValue={page?.slug}
          placeholder="about"
          required
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="flex items-center gap-3 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200">
        <input
          name="isPublished"
          type="checkbox"
          defaultChecked={page?.isPublished ?? false}
          className="h-5 w-5 rounded border-blue-100"
        />
        Published
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 lg:col-span-4 dark:text-slate-200">
        Short summary
        <textarea
          name="summary"
          rows={2}
          defaultValue={page?.summary}
          className="resize-none rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 lg:col-span-4 dark:text-slate-200">
        Page content
        <textarea
          name="content"
          rows={5}
          defaultValue={page?.content}
          className="resize-none rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
    </>
  );
}
