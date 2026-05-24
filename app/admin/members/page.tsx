import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  createMember,
  deleteMember,
  updateMember
} from "@/lib/admin-member-actions";
import { getAdminMemberRecords } from "@/lib/admin-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminMembersPage() {
  const members = await getAdminMemberRecords();
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <AdminLayout title="Members" description="Create, update, and remove EDCH member records.">
      {!isSupabaseConfigured ? (
        <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so Save and Delete buttons
          will not write to a database.
        </p>
      ) : null}

      <AdminFormCard
        title="Add member"
        description="Create a placeholder member record for future database-backed membership management."
      >
        <form action={createMember} className="grid gap-4 md:grid-cols-2">
          <MemberFields />
          <button className="rounded-full bg-edch-green px-6 py-3 font-black text-white md:col-span-2">
            Add Member
          </button>
        </form>
      </AdminFormCard>

      <section className="mt-8 grid gap-5">
        {members.length > 0 ? (
          members.map((member) => (
            <article
              key={member.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
            >
              <form action={updateMember} className="grid gap-4 lg:grid-cols-4">
                <input type="hidden" name="id" value={member.id} />
                <MemberFields member={member} />
                <div className="flex flex-col gap-3 lg:col-span-4 sm:flex-row">
                  <button className="rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white">
                    Save Changes
                  </button>
                </div>
              </form>

              <form action={deleteMember} className="mt-3">
                <input type="hidden" name="id" value={member.id} />
                <button className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-red-50 hover:text-red-700">
                  Delete Member
                </button>
              </form>
            </article>
          ))
        ) : (
          <p className="rounded-3xl bg-white p-6 font-bold text-slate-600 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10">
            No members found yet. Add the first member above.
          </p>
        )}
      </section>
    </AdminLayout>
  );
}

function MemberFields({
  member
}: {
  member?: {
    fullName: string;
    email: string;
    phone: string;
    memberType: string;
    status: string;
    notes: string;
  };
}) {
  return (
    <>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Full name
        <input
          name="fullName"
          defaultValue={member?.fullName}
          required
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Email
        <input
          name="email"
          type="email"
          defaultValue={member?.email}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Phone
        <input
          name="phone"
          defaultValue={member?.phone}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Member type
        <select
          name="memberType"
          defaultValue={member?.memberType ?? "Community Member"}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        >
          <option>Community Member</option>
          <option>Volunteer</option>
          <option>Supporter</option>
          <option>Future Board Member</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Status
        <select
          name="status"
          defaultValue={member?.status ?? "pending"}
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 lg:col-span-4 dark:text-slate-200">
        Notes
        <textarea
          name="notes"
          rows={3}
          defaultValue={member?.notes}
          className="resize-none rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
    </>
  );
}
