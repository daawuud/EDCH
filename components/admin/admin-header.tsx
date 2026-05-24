import { logoutAdmin } from "@/lib/admin-auth-actions";

export function AdminHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-blue-100 bg-white px-4 py-6 sm:px-8 dark:border-white/10 dark:bg-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-edch-green">
            EDCH Admin
          </p>
          <h1 className="mt-2 text-3xl font-black text-edch-ink dark:text-white">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-full bg-edch-green px-5 py-3 text-center text-sm font-black text-white transition hover:bg-green-700"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
