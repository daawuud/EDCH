import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-edch-green">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-edch-ink sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}
