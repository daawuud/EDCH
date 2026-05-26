import { CallToAction } from "@/components/call-to-action";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

export default function DonatePage() {
  return (
    <main>
      <PageHero
        eyebrow="Donation and funding support"
        title="Support Our Community Work"
        description="EDCH is being developed as a community-led disability support hub. Donations, grants, partnerships, and volunteer support can help with meetings, training, outreach, accessibility support, and future programs."
        variant="impact"
        primary={{ href: "/contact", label: "Support EDCH" }}
        secondary={{ href: "/membership", label: "Volunteer" }}
        stats={[
          { value: "0", label: "Payment links on this site" },
          { value: "4", label: "Ways to support" },
          { value: "YEG", label: "Local community work" }
        ]}
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Support options"
            title="Funding and volunteer support can help EDCH become sustainable"
            description="For now, support conversations are handled through direct contact. No real payment system is connected."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {siteContent.donationSupport.map((item, index) => (
              <SectionCard
                key={item.title}
                title={item.title}
                description={item.description}
                href="/donate"
                ctaLabel="Support EDCH"
                icon={getSupportIcon(item.title)}
                meta="Support pathway"
                tone={index % 2 === 0 ? "white" : "green"}
              />
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white p-6 text-center font-bold leading-7 text-slate-700 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">
            No real payment system is connected yet. Support buttons link to the
            contact page so EDCH can discuss donations, grants, partnerships, or
            volunteer support directly.
          </p>
        </div>
      </section>
      <CallToAction
        title="Help shape EDCH with practical support"
        description="Use the contact page to discuss donations, grants, partnerships, or volunteer support. No payment processing is active on this website."
        primaryLabel="Contact EDCH"
        primaryHref="/contact"
      />
    </main>
  );
}

function getSupportIcon(title: string) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("donation")) return "DN";
  if (lowerTitle.includes("grant")) return "GF";
  if (lowerTitle.includes("partner")) return "LP";
  if (lowerTitle.includes("volunteer")) return "VS";

  return "SP";
}
