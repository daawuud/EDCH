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
    <section className="bg-edch-blue px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] bg-white/10 p-8 ring-1 ring-white/15 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black">{title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-50">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
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
