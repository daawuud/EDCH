import Link from "next/link";
import { loginAdmin } from "@/lib/admin-auth-actions";

export default function AdminLoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#e8f4ff_0%,#ffffff_52%,#eaf8f0_100%)] px-4 py-16 dark:bg-[linear-gradient(135deg,#071525_0%,#0b233a_52%,#082417_100%)]">
      <section className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-edch-blue text-sm font-black text-white">
            EDCH
          </span>
          <h1 className="mt-5 text-3xl font-black text-edch-ink dark:text-white">
            Admin Login
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
            Demo login only. Real authentication will be connected later.
          </p>
        </div>

        {searchParams?.error ? (
          <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
            Login failed or this account is not approved for admin access yet.
          </p>
        ) : null}

        <form action={loginAdmin} className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            Email
            <input
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
              className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink outline-none focus:border-edch-green dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            Password
            <input
              name="password"
              type="password"
              placeholder="Demo only"
              required
              className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink outline-none focus:border-edch-green dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-edch-blue px-6 py-4 text-center font-black text-white transition hover:bg-blue-800"
          >
            Login to Admin
          </button>
        </form>

        <p className="mt-5 text-center text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">
          If Supabase keys are missing, this form opens the demo dashboard. Once
          Supabase is configured, only approved admin users can continue.
        </p>

        <Link
          href="/"
          className="mt-5 block text-center text-sm font-black text-edch-blue dark:text-white"
        >
          Back to public website
        </Link>
      </section>
    </main>
  );
}
