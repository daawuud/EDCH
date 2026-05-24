import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  createResource,
  deleteResource,
  updateResource
} from "@/lib/admin-resource-actions";
import { getAdminResourceRecords } from "@/lib/admin-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminResourcesPage() {
  const resources = await getAdminResourceRecords();
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <AdminLayout
      title="Manage Resources"
      description="Create, update, and remove EDCH resource cards. Supabase writes activate after environment variables and admin auth are configured."
    >
      {!isSupabaseConfigured ? (
        <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so Save and Delete buttons
          will not write to a database.
        </p>
      ) : null}

      <AdminFormCard
        title="Add resource"
        description="Create a new resource card for the public Resources page."
      >
        <form action={createResource} className="grid gap-4 md:grid-cols-2">
          <ResourceFields />
          <button className="rounded-full bg-edch-green px-6 py-3 font-black text-white md:col-span-2">
            Add Resource
          </button>
        </form>
      </AdminFormCard>

      <section className="mt-8 grid gap-5">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <article
              key={resource.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
            >
              <form action={updateResource} className="grid gap-4 lg:grid-cols-4">
                <input type="hidden" name="id" value={resource.id} />
                <ResourceFields resource={resource} />
                <div className="flex flex-col gap-3 lg:col-span-4 sm:flex-row">
                  <button className="rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white">
                    Save Changes
                  </button>
                </div>
              </form>

              <form action={deleteResource} className="mt-3">
                <input type="hidden" name="id" value={resource.id} />
                <button className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-red-50 hover:text-red-700">
                  Delete Resource
                </button>
              </form>
            </article>
          ))
        ) : (
          <p className="rounded-3xl bg-white p-6 font-bold text-slate-600 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10">
            No resources found yet. Add the first resource above.
          </p>
        )}
      </section>
    </AdminLayout>
  );
}

function ResourceFields({
  resource
}: {
  resource?: {
    title: string;
    description: string;
    category: string;
    url: string;
    displayOrder: string;
    isActive: boolean;
  };
}) {
  return (
    <>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Title
        <input
          name="title"
          defaultValue={resource?.title}
          required
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Category
        <input
          name="category"
          defaultValue={resource?.category}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        URL
        <input
          name="url"
          type="url"
          defaultValue={resource?.url}
          placeholder="https://example.ca or upload a file below"
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Display order
        <input
          name="displayOrder"
          type="number"
          min="0"
          defaultValue={resource?.displayOrder ?? "0"}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="flex items-center gap-3 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={resource?.isActive ?? true}
          className="h-5 w-5 rounded border-blue-100"
        />
        Visible
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 lg:col-span-4 dark:text-slate-200">
        Upload file
        <input
          name="resourceFile"
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,image/*,application/pdf"
          className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-edch-ink file:mr-4 file:rounded-full file:border-0 file:bg-edch-mint file:px-4 file:py-2 file:font-black file:text-edch-green dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Optional. Uploading a file will replace the URL with the uploaded file link. Maximum 10MB.
        </span>
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 lg:col-span-4 dark:text-slate-200">
        Description
        <textarea
          name="description"
          rows={3}
          defaultValue={resource?.description}
          className="resize-none rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
    </>
  );
}
