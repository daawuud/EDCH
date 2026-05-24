import { CallToAction } from "@/components/call-to-action";
import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About EDCH"
        title="A community-led disability support hub for Edmonton"
        description={siteContent.about.intro}
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <SectionCard title="Mission" description={siteContent.about.mission} />
          <SectionCard title="Vision" description={siteContent.about.vision} />
          <SectionCard
            title="Why EDCH matters in Edmonton"
            description={siteContent.about.whyItMatters}
          />
          <article className="rounded-3xl border border-blue-100 bg-edch-sky p-6 shadow-sm dark:border-white/10 dark:bg-white/10">
            <h2 className="text-xl font-black text-edch-ink dark:text-white">
              Community values
            </h2>
            <ul className="mt-5 grid gap-3">
              {siteContent.about.values.map((value) => (
                <li
                  key={value}
                  className="rounded-2xl bg-white p-4 font-bold text-slate-700 shadow-sm dark:bg-slate-950/70 dark:text-slate-200"
                >
                  {value}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      <CallToAction
        title="Help shape EDCH with the community"
        description="Connect with EDCH to share ideas, volunteer, or learn how this hub can support Edmonton families and partners."
        primaryLabel="Contact EDCH"
        primaryHref="/contact"
        secondaryLabel="Become a Member"
        secondaryHref="/membership"
      />
    </main>
  );
}
