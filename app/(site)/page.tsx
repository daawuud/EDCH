import Link from "next/link";
import { CallToAction } from "@/components/call-to-action";
import { HeroSection } from "@/components/hero-section";
import { SectionHeader } from "@/components/section-header";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";
import { getPublicAdapContent } from "@/lib/adap-data";

export default async function Home() {
  const adap = await getPublicAdapContent();

  return (
    <main>
        <HeroSection />
        {adap.alertEnabled ? (
          <section className="bg-edch-blue px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
                  ADAP update
                </p>
                <h2 className="mt-1 text-xl font-black">{adap.alertTitle}</h2>
                <p className="mt-1 max-w-4xl text-sm leading-6 text-blue-50 sm:text-base">
                  {adap.alertMessage}
                </p>
              </div>
              <Link
                href="/benefits/adap-transition"
                className="inline-flex shrink-0 justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-edch-blue transition hover:bg-edch-mint"
              >
                View Benefits & Supports
              </Link>
            </div>
          </section>
        ) : null}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Community pathways"
              title="Find the right place to start"
              description="Each area has its own full page for community members, future board members, funders, and partners."
              align="center"
            />

            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <SectionCard
                title="Benefits & Supports"
                description="Find Alberta and federal disability programs, ADAP transition details, forms, letters, and translated documents."
                href="/benefits"
                cta="View Benefits"
                icon="BS"
                meta="Benefits"
                tone="green"
              />
              <SectionCard
                title="About EDCH"
                description={siteContent.about.intro}
                href="/about"
                cta="Learn About EDCH"
                icon="ED"
                meta="Community story"
              />
              <SectionCard
                title="Community Services"
                description="Find practical disability support, navigation, advocacy awareness, caregiver help, newcomer support, and shared resources."
                href="/services"
                cta="View Services"
                icon="S"
                meta="Support"
                tone="blue"
              />
              <SectionCard
                title="Programs"
                description="Explore community meetings, digital skills training, English support, accessibility awareness, family sessions, and leadership."
                href="/programs"
                cta="Explore Programs"
                icon="P"
                meta="Learning"
              />
              <SectionCard
                title="Membership"
                description="Join EDCH as a community member, volunteer, supporter, or future board member."
                href="/membership"
                cta="Become a Member"
                icon="M"
                meta="Belonging"
                tone="green"
              />
              <SectionCard
                title="Donation Support"
                description="Learn how donations, grants, partnerships, and volunteer support can help EDCH grow responsibly."
                href="/donate"
                cta="Support EDCH"
                icon="$"
                meta="Funding"
              />
              <SectionCard
                title="Contact EDCH"
                description="Ask a question, offer support, connect as a partner, or express interest in membership and volunteering."
                href="/contact"
                cta="Contact Us"
                icon="@"
                meta="Connection"
                tone="blue"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-900">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-blue-100 md:flex-row md:items-center md:justify-between dark:bg-white/10 dark:ring-white/10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-edch-green">
                Upcoming activities
              </p>
              <h2 className="mt-3 text-3xl font-black text-edch-ink dark:text-white">
                Community events can be updated as EDCH grows
              </h2>
            </div>
            <Link
              href="/events"
              className="rounded-full bg-edch-blue px-7 py-4 text-center font-black text-white transition hover:bg-blue-800"
            >
              View Events
            </Link>
          </div>
        </section>

        <CallToAction
          title="Join the conversation"
          description="Connect with EDCH about membership, volunteering, partnership, services, or future support for community work in Edmonton."
          primaryLabel="Contact Us"
          primaryHref="/contact"
          secondaryLabel="View Resources"
          secondaryHref="/resources"
        />
      </main>
  );
}
