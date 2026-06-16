import Link from "next/link";
import { siteContent } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-edch-green text-sm font-black">
              {siteContent.shortName}
            </span>
            <div>
              <p className="font-black">{siteContent.shortName}</p>
              <p className="text-sm text-slate-300">{siteContent.name}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md leading-7 text-slate-300">
            {siteContent.footer.mission}
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-300">
            {siteContent.location}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-black">Quick links</h2>
          <ul className="mt-4 grid gap-3">
            {siteContent.navigation.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-black">Information</h2>
          <ul className="mt-4 grid gap-3">
            {siteContent.footer.legalLinks.map((item) => (
              <li key={item}>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-edch-blue transition hover:bg-edch-sky"
          >
            Contact EDCH
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-slate-400">
        <p>
          Copyright © {siteContent.footer.copyrightYear} {siteContent.shortName}.
          All rights reserved.
        </p>
        <p className="mt-2">Web developer: Daud Mohamed</p>
      </div>
    </footer>
  );
}
