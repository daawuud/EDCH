import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InfoPanel({
  title,
  children,
  tone = "blue"
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "green" | "dark";
}) {
  return (
    <article
      className={cn(
        "rounded-[2rem] p-7 shadow-sm ring-1",
        tone === "dark" && "bg-edch-ink text-white ring-edch-ink",
        tone === "green" && "bg-edch-mint text-edch-ink ring-emerald-100 dark:bg-white/10 dark:text-white dark:ring-white/10",
        tone === "blue" && "bg-edch-sky text-edch-ink ring-blue-100 dark:bg-white/10 dark:text-white dark:ring-white/10"
      )}
    >
      <h2 className="text-2xl font-black">{title}</h2>
      <div className={cn("mt-4 leading-8", tone === "dark" ? "text-slate-200" : "text-slate-700 dark:text-slate-300")}>
        {children}
      </div>
    </article>
  );
}
