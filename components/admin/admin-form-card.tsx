export function AdminFormCard({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
      <h2 className="text-xl font-black text-edch-ink dark:text-white">{title}</h2>
      <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
