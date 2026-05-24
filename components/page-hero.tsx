export function PageHero({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-[linear-gradient(135deg,#e8f4ff_0%,#ffffff_50%,#eaf8f0_100%)] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[linear-gradient(135deg,#071525_0%,#0b233a_52%,#082417_100%)]">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-edch-green">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-edch-ink sm:text-5xl dark:text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-200">
          {description}
        </p>
      </div>
    </section>
  );
}
