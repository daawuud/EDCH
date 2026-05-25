import Link from "next/link";
import { cn } from "@/lib/utils";

type HeroAction = {
  href: string;
  label: string;
};

type HeroCard = {
  title: string;
  description: string;
};

type HeroStat = {
  value: string;
  label: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  variant = "split",
  primary,
  secondary,
  highlights = [],
  stats = [],
  cards = []
}: {
  eyebrow: string;
  title: string;
  description: string;
  variant?: "split" | "centered" | "cards" | "impact" | "simple";
  primary?: HeroAction;
  secondary?: HeroAction;
  highlights?: string[];
  stats?: HeroStat[];
  cards?: HeroCard[];
}) {
  const isCentered = variant === "centered" || variant === "simple";
  const isImpact = variant === "impact";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-blue-100/80 px-4 py-12 sm:px-6 lg:px-8 dark:border-white/10",
        isImpact
          ? "bg-[#123a66] text-white"
          : "bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_48%,#eefaf4_100%)] dark:bg-[linear-gradient(135deg,#071525_0%,#0b233a_52%,#082417_100%)]"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#146fc7,#12a35b)]" />
      <div
        className={cn(
          "mx-auto grid max-w-7xl items-center gap-8",
          isCentered ? "text-center" : "lg:grid-cols-[1.05fr_0.95fr]"
        )}
      >
        <div className={cn(isCentered && "mx-auto max-w-4xl")}>
          <p
            className={cn(
              "inline-flex rounded-full px-4 py-2 text-sm font-black uppercase tracking-[0.16em] ring-1",
              isImpact
                ? "bg-white/10 text-emerald-200 ring-white/15"
                : "bg-white text-edch-green shadow-sm ring-blue-100 dark:bg-white/10 dark:text-emerald-300 dark:ring-white/10"
            )}
          >
            {eyebrow}
          </p>
          <h1
            className={cn(
              "mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl",
              isCentered && "mx-auto",
              isImpact ? "text-white" : "text-edch-ink dark:text-white"
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-5 max-w-3xl text-base leading-8 sm:text-lg",
              isCentered && "mx-auto",
              isImpact ? "text-slate-200" : "text-slate-600 dark:text-slate-200"
            )}
          >
            {description}
          </p>

          {highlights.length > 0 ? (
            <div className={cn("mt-6 flex flex-wrap gap-3", isCentered && "justify-center")}>
              {highlights.map((item) => (
                <span
                  key={item}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-black",
                    isImpact
                      ? "bg-white/10 text-white"
                      : "bg-edch-mint text-edch-green dark:bg-white/10 dark:text-white"
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}

          {primary || secondary ? (
            <div className={cn("mt-8 flex flex-col gap-3 sm:flex-row", isCentered && "justify-center")}>
              {primary ? (
                <Link
                  href={primary.href}
                  className="rounded-full bg-edch-blue px-7 py-4 text-center font-black text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  {primary.label}
                </Link>
              ) : null}
              {secondary ? (
                <Link
                  href={secondary.href}
                  className={cn(
                    "rounded-full px-7 py-4 text-center font-black shadow-sm ring-1 transition hover:-translate-y-0.5",
                    isImpact
                      ? "bg-white/10 text-white ring-white/20 hover:bg-white/15"
                      : "bg-white text-edch-green ring-edch-green/30 hover:bg-edch-mint dark:bg-white/10 dark:text-white dark:ring-white/15"
                  )}
                >
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        {!isCentered ? (
          <div className="grid gap-4">
            {stats.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "rounded-3xl p-5 shadow-sm ring-1",
                      isImpact
                        ? "bg-white/10 ring-white/15"
                        : "bg-white ring-blue-100 dark:bg-white/10 dark:ring-white/10"
                    )}
                  >
                    <p className={cn("text-3xl font-black", isImpact ? "text-emerald-200" : "text-edch-blue")}>
                      {stat.value}
                    </p>
                    <p className={cn("mt-2 text-sm font-bold", isImpact ? "text-slate-200" : "text-slate-600 dark:text-slate-300")}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {cards.length > 0 ? (
              <div className={cn("grid gap-4", variant === "cards" && "sm:grid-cols-2")}>
                {cards.map((card) => (
                  <article
                    key={card.title}
                    className={cn(
                      "rounded-3xl p-5 shadow-sm ring-1",
                      isImpact
                        ? "bg-white/10 ring-white/15"
                        : "bg-white ring-blue-100 dark:bg-white/10 dark:ring-white/10"
                    )}
                  >
                    <h2 className={cn("font-black", isImpact ? "text-white" : "text-edch-ink dark:text-white")}>
                      {card.title}
                    </h2>
                    <p className={cn("mt-2 text-sm leading-6", isImpact ? "text-slate-200" : "text-slate-600 dark:text-slate-300")}>
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
