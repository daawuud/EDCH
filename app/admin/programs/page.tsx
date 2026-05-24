import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  createProgram,
  deleteProgram,
  updateProgram
} from "@/lib/admin-program-actions";
import { getAdminProgramRecords } from "@/lib/admin-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminProgramsPage() {
  const programs = await getAdminProgramRecords();
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <AdminLayout
      title="Manage Programs"
      description="Create, update, and remove EDCH community programs. Supabase writes activate after environment variables and admin auth are configured."
    >
      {!isSupabaseConfigured ? (
        <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so Save and Delete buttons
          will not write to a database.
        </p>
      ) : null}

      <AdminFormCard
        title="Add program"
        description="Create a new program card for the public Programs page."
      >
        <form action={createProgram} className="grid gap-4 md:grid-cols-2">
          <ProgramFields />
          <button className="rounded-full bg-edch-green px-6 py-3 font-black text-white md:col-span-2">
            Add Program
          </button>
        </form>
      </AdminFormCard>

      <section className="mt-8 grid gap-5">
        {programs.length > 0 ? (
          programs.map((program) => (
            <article
              key={program.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
            >
              <form action={updateProgram} className="grid gap-4 lg:grid-cols-4">
                <input type="hidden" name="id" value={program.id} />
                <ProgramFields program={program} />
                <div className="flex flex-col gap-3 lg:col-span-4 sm:flex-row">
                  <button className="rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white">
                    Save Changes
                  </button>
                </div>
              </form>

              <form action={deleteProgram} className="mt-3">
                <input type="hidden" name="id" value={program.id} />
                <button className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-red-50 hover:text-red-700">
                  Delete Program
                </button>
              </form>
            </article>
          ))
        ) : (
          <p className="rounded-3xl bg-white p-6 font-bold text-slate-600 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10">
            No programs found yet. Add the first program above.
          </p>
        )}
      </section>
    </AdminLayout>
  );
}

function ProgramFields({
  program
}: {
  program?: {
    title: string;
    description: string;
    category: string;
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
          defaultValue={program?.title}
          required
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Category
        <input
          name="category"
          defaultValue={program?.category}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Display order
        <input
          name="displayOrder"
          type="number"
          min="0"
          defaultValue={program?.displayOrder ?? "0"}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="flex items-center gap-3 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={program?.isActive ?? true}
          className="h-5 w-5 rounded border-blue-100"
        />
        Visible
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 lg:col-span-4 dark:text-slate-200">
        Description
        <textarea
          name="description"
          rows={3}
          defaultValue={program?.description}
          className="resize-none rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
    </>
  );
}
