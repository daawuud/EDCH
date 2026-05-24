import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  createEvent,
  deleteEvent,
  updateEvent
} from "@/lib/admin-event-actions";
import { getAdminEventRecords } from "@/lib/admin-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminEventsPage() {
  const events = await getAdminEventRecords();
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <AdminLayout
      title="Manage Events"
      description="Create, update, and remove EDCH community events. Supabase writes activate after environment variables and admin auth are configured."
    >
      {!isSupabaseConfigured ? (
        <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so Save and Delete buttons
          will not write to a database.
        </p>
      ) : null}

      <AdminFormCard
        title="Add event"
        description="Create a new event for the public Events page."
      >
        <form action={createEvent} className="grid gap-4 md:grid-cols-2">
          <EventFields />
          <button className="rounded-full bg-edch-green px-6 py-3 font-black text-white md:col-span-2">
            Add Event
          </button>
        </form>
      </AdminFormCard>

      <section className="mt-8 grid gap-5">
        {events.length > 0 ? (
          events.map((event) => (
            <article
              key={event.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
            >
              <form action={updateEvent} className="grid gap-4 lg:grid-cols-4">
                <input type="hidden" name="id" value={event.id} />
                <EventFields event={event} />
                <div className="flex flex-col gap-3 lg:col-span-4 sm:flex-row">
                  <button className="rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white">
                    Save Changes
                  </button>
                </div>
              </form>

              <form action={deleteEvent} className="mt-3">
                <input type="hidden" name="id" value={event.id} />
                <button className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-red-50 hover:text-red-700">
                  Delete Event
                </button>
              </form>
            </article>
          ))
        ) : (
          <p className="rounded-3xl bg-white p-6 font-bold text-slate-600 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10">
            No events found yet. Add the first event above.
          </p>
        )}
      </section>
    </AdminLayout>
  );
}

function EventFields({
  event
}: {
  event?: {
    title: string;
    description: string;
    eventDate: string;
    location: string;
    status: string;
    isActive: boolean;
  };
}) {
  return (
    <>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Title
        <input
          name="title"
          defaultValue={event?.title}
          required
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Event date
        <input
          name="eventDate"
          type="date"
          defaultValue={event?.eventDate}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Location
        <input
          name="location"
          defaultValue={event?.location}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Status
        <select
          name="status"
          defaultValue={event?.status ?? "draft"}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        >
          <option value="draft">Draft</option>
          <option value="sample">Sample</option>
          <option value="planned">Planned</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>
      <label className="flex items-center gap-3 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={event?.isActive ?? true}
          className="h-5 w-5 rounded border-blue-100"
        />
        Visible
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 lg:col-span-4 dark:text-slate-200">
        Description
        <textarea
          name="description"
          rows={3}
          defaultValue={event?.description}
          className="resize-none rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
    </>
  );
}
