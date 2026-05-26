import Link from "next/link";

export function AdminDashboardCard({
  title,
  description,
  href,
  accent = "blue"
}: {
  title: string;
  description: string;
  href: string;
  accent?: "blue" | "green";
}) {
  const accentClass =
    accent === "green"
      ? "bg-edch-green text-white group-hover:bg-green-700"
      : "bg-edch-blue text-white group-hover:bg-blue-800";

  return (
    <Link
      href={href}
      aria-label={`Manage ${title}`}
      className="group flex min-h-64 flex-col rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-edch-blue hover:shadow-soft focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-edch-green dark:border-white/10 dark:bg-white/10 dark:hover:border-white/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black transition ${accentClass}`}
        >
          {title.slice(0, 2).toUpperCase()}
        </div>
        <span className="rounded-full bg-edch-mint px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-edch-green transition group-hover:bg-edch-green group-hover:text-white dark:bg-white/10 dark:text-white">
          Manage
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h2 className="text-xl font-black text-edch-ink dark:text-white">
          {title}
        </h2>
        <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">
          {description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-edch-blue transition group-hover:translate-x-1 dark:text-blue-300">
          Open management page
          <span aria-hidden="true">-&gt;</span>
        </span>
      </div>
    </Link>
  );
}
