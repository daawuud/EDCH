import Link from "next/link";

export function StatCard({
  label,
  value,
  tone = "blue",
  href
}: {
  label: string;
  value: string;
  tone?: string;
  href?: string;
}) {
  const color =
    tone === "green"
      ? "border-edch-green text-edch-green"
      : "border-edch-blue text-edch-blue";
  const className = `group rounded-3xl border-l-4 ${color} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-edch-green dark:bg-white/10`;

  const content = (
    <>
      <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
        {label}
      </p>
      <p className="mt-3 text-4xl font-black">{value}</p>
      {href ? (
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-edch-blue transition group-hover:translate-x-1 dark:text-blue-300">
          Open
          <span aria-hidden="true">-&gt;</span>
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={`Open ${label}`} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <article className={`rounded-3xl border-l-4 ${color} bg-white p-6 shadow-sm dark:bg-white/10`}>
      {content}
    </article>
  );
}
