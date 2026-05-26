import Link from "next/link";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  description,
  href,
  cta,
  ctaLabel,
  ariaLabel,
  icon = "+",
  meta,
  tone = "white"
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
  ctaLabel?: string;
  ariaLabel?: string;
  icon?: string;
  meta?: string;
  tone?: "white" | "blue" | "green";
}) {
  const actionLabel = ctaLabel ?? cta ?? "Learn more";
  const className = cn(
    "group rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft",
    href &&
      "block cursor-pointer focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-edch-green",
    tone === "white" &&
      "border-blue-100 bg-white dark:border-white/10 dark:bg-white/10",
    tone === "blue" &&
      "border-blue-100 bg-edch-sky dark:border-white/10 dark:bg-white/10",
    tone === "green" &&
      "border-emerald-100 bg-edch-mint dark:border-white/10 dark:bg-white/10"
  );

  const content = (
    <>
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
      {href ? (
        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white transition group-hover:bg-blue-800">
          {actionLabel}
          <span aria-hidden="true">-&gt;</span>
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel ?? `${actionLabel}: ${title}`}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={cn(
        "rounded-3xl border p-6 shadow-sm",
        tone === "white" &&
          "border-blue-100 bg-white dark:border-white/10 dark:bg-white/10",
        tone === "blue" &&
          "border-blue-100 bg-edch-sky dark:border-white/10 dark:bg-white/10",
        tone === "green" &&
          "border-emerald-100 bg-edch-mint dark:border-white/10 dark:bg-white/10"
      )}
    >
      {content}
    </article>
  );
}
