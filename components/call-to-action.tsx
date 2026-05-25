import Link from "next/link";

export function CallToAction({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-[#123a66] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] bg-white/10 p-6 ring-1 ring-white/15 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-200">
            Connect with EDCH
          </p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-50">{description}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={primaryHref}
            className="rounded-full bg-white px-6 py-4 text-center font-black text-edch-blue transition hover:bg-edch-sky"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/30 px-6 py-4 text-center font-black text-white transition hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
