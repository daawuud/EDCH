import { CallToAction } from "@/components/call-to-action";
import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

export default function DonatePage() {
  return (
    <main>
      <PageHero
        eyebrow="Donation and funding support"
        title="Support Our Community Work"
        description="EDCH is being developed as a community-led disability support hub. Donations, grants, partnerships, and volunteer support can help with meetings, training, outreach, accessibility support, and future programs."
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {siteContent.donationSupport.map((item) => (
            <SectionCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white p-6 text-center font-bold leading-7 text-slate-700 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">
          No real payment system is connected yet. Support buttons link to the
          contact page so EDCH can discuss donations, grants, partnerships, or
          volunteer support directly.
        </p>
      </section>
      <CallToAction
        title="Talk with EDCH about support"
        description="Use the contact page to discuss donations, grants, partnerships, or volunteer support. No payment processing is active on this website."
        primaryLabel="Contact EDCH"
        primaryHref="/contact"
      />
    </main>
  );
}
