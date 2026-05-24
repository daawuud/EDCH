import { AdminLayout } from "@/components/admin/admin-layout";
import {
  deleteMessage,
  markMessageRead
} from "@/lib/admin-message-actions";
import { getAdminMessageRecords } from "@/lib/admin-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminMessagesPage() {
  const messages = await getAdminMessageRecords();
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <AdminLayout title="Messages" description="Review contact form messages submitted from the public website.">
      {!isSupabaseConfigured ? (
        <p className="mb-5 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so Mark Read and Delete
          buttons will not write to a database.
        </p>
      ) : null}

      <section className="grid gap-5">
        {messages.length > 0 ? (
          messages.map((message) => (
            <article
              key={message.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-edch-green">
                    {message.status}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-edch-ink dark:text-white">
                    {message.name}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {message.email}
                    {message.phone ? ` | ${message.phone}` : ""}
                  </p>
                  <p className="mt-2 text-sm font-bold text-edch-blue dark:text-blue-200">
                    {message.interest} · {message.createdAt}
                  </p>
                  <p className="mt-4 max-w-3xl leading-7 text-slate-700 dark:text-slate-200">
                    {message.message}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={message.id} />
                    <button className="rounded-full bg-edch-blue px-4 py-3 text-sm font-black text-white">
                      Mark Read
                    </button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={message.id} />
                    <button className="rounded-full bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-red-50 hover:text-red-700">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-3xl bg-white p-6 font-bold text-slate-600 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10">
            No messages yet.
          </p>
        )}
      </section>
    </AdminLayout>
  );
}
