import Link from "next/link";
import { CommunityHubVisual } from "@/components/community-hub-visual";
import { siteContent } from "@/data/site-content";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#dff0ff,transparent_36%),linear-gradient(135deg,#ffffff_0%,#f3fbf7_48%,#e9f4ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(20,111,199,0.35),transparent_34%),linear-gradient(135deg,#071525_0%,#0b233a_50%,#082417_100%)]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8 lg:py-24">
        <div className="relative z-10">
          <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-edch-blue shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-white dark:ring-white/10">
            {siteContent.location}
          </p>
          <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight text-edch-ink sm:text-5xl dark:text-white">
            {siteContent.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-200">
            {siteContent.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/membership"
              className="rounded-full bg-edch-blue px-7 py-4 text-center font-black text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Join the Community
            </Link>
            <Link
              href="/membership"
              className="rounded-full border border-edch-green bg-white px-7 py-4 text-center font-black text-edch-green shadow-sm transition hover:-translate-y-0.5 hover:bg-edch-mint dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              Become a Member
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-blue-100 bg-white px-7 py-4 text-center font-black text-edch-ink shadow-sm transition hover:-translate-y-0.5 hover:border-edch-blue hover:text-edch-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              Contact EDCH
            </Link>
          </div>
        </div>

        <CommunityHubVisual />
      </div>
    </section>
  );
}
