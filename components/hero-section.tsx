export function HeroSection() {
  return (
    <section
      id="home"
      className="border-b border-blue-100/80 bg-[linear-gradient(135deg,#ffffff_0%,#f3fbf7_58%,#e9f4ff_100%)] dark:border-white/10 dark:bg-[linear-gradient(135deg,#071525_0%,#0b233a_58%,#082417_100%)]"
    >
      <div className="mx-auto flex min-h-[210px] max-w-7xl flex-col justify-center px-4 py-8 sm:min-h-[230px] sm:px-6 lg:min-h-[240px] lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-edch-green">
          EDCH
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight text-edch-ink sm:text-4xl dark:text-white">
          Edmonton Disability Community Hub
        </h1>
        <p className="mt-3 max-w-3xl text-lg font-bold leading-7 text-edch-blue sm:text-xl dark:text-emerald-200">
          Supporting Albertans with Disabilities
        </p>
      </div>
    </section>
  );
}
