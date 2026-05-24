import Link from "next/link";
import { CallToAction } from "@/components/call-to-action";
import { HeroSection } from "@/components/hero-section";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

export default function Home() {
  return (
    <main>
        <HeroSection />
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-edch-green">
                Community website
              </p>
              <h1 className="mt-3 text-3xl font-black text-edch-ink sm:text-4xl dark:text-white">
                Explore EDCH programs, services, membership, and support
              </h1>
              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                This homepage gives a clear overview. Each area has its own full
                page for community members, future board members, funders, and
                partners.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <SectionCard
                title="About EDCH"
                description={siteContent.about.intro}
                href="/about"
                cta="Learn About EDCH"
              />
              <SectionCard
                title="Community Services"
                description="Find practical disability support, navigation, advocacy awareness, caregiver help, newcomer support, and shared resources."
                href="/services"
                cta="View Services"
              />
              <SectionCard
                title="Programs"
                description="Explore community meetings, digital skills training, English support, accessibility awareness, family sessions, and leadership."
                href="/programs"
                cta="Explore Programs"
              />
              <SectionCard
                title="Membership"
                description="Join EDCH as a community member, volunteer, supporter, or future board member."
                href="/membership"
                cta="Become a Member"
              />
              <SectionCard
                title="Donation Support"
                description="Learn how donations, grants, partnerships, and volunteer support can help EDCH grow responsibly."
                href="/donate"
                cta="Support EDCH"
              />
              <SectionCard
                title="Contact EDCH"
                description="Ask a question, offer support, connect as a partner, or express interest in membership and volunteering."
                href="/contact"
                cta="Contact Us"
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
          title="Ready to connect with EDCH?"
          description="Reach out about membership, volunteering, partnership, services, or future support for community work."
          primaryLabel="Contact Us"
          primaryHref="/contact"
          secondaryLabel="View Resources"
          secondaryHref="/resources"
        />
      </main>
  );
}