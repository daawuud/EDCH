export function StatCard({
  label,
  value,
  tone = "blue"
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  const color =
    tone === "green"
      ? "border-edch-green text-edch-green"
      : "border-edch-blue text-edch-blue";

  return (
    <article className={`rounded-3xl border-l-4 ${color} bg-white p-6 shadow-sm dark:bg-white/10`}>
      <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
        {label}
      </p>
      <p className="mt-3 text-4xl font-black">{value}</p>
    </article>
  );
}
