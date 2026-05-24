import Link from "next/link";

export function SectionCard({
  title,
  description,
  href,
  cta
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-edch-mint text-lg font-black text-edch-green dark:bg-emerald-400/15 dark:text-emerald-300">
        +
      </div>
      <h2 className="text-xl font-black text-edch-ink dark:text-white">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      {href && cta ? (
        <Link
          href={href}
          className="mt-5 inline-flex rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
        >
          {cta}
        </Link>
      ) : null}
    </article>
  );
}
