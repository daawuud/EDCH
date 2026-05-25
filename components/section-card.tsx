import Link from "next/link";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  description,
  href,
  cta,
  icon = "+",
  meta,
  tone = "white"
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
  icon?: string;
  meta?: string;
  tone?: "white" | "blue" | "green";
}) {
  return (
    <article
      className={cn(
        "group rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft",
        tone === "white" &&
          "border-blue-100 bg-white dark:border-white/10 dark:bg-white/10",
        tone === "blue" &&
          "border-blue-100 bg-edch-sky dark:border-white/10 dark:bg-white/10",
        tone === "green" &&
          "border-emerald-100 bg-edch-mint dark:border-white/10 dark:bg-white/10"
      )}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-edch-mint text-lg font-black text-edch-green transition group-hover:scale-105 dark:bg-emerald-400/15 dark:text-emerald-300">
        {icon}
      </div>
      {meta ? (
        <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-edch-green">
          {meta}
        </p>
      ) : null}
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
