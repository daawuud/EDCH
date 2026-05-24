import { CallToAction } from "@/components/call-to-action";
import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

const benefits = [
  "Receive community updates and program information.",
  "Participate in conversations about disability support needs.",
  "Connect with families, caregivers, volunteers, and partners.",
  "Help EDCH grow as a trusted community-led organization."
];

export default function MembershipPage() {
  return (
    <main>
      <PageHero
        eyebrow="Membership"
        title="Join EDCH as a member, volunteer, supporter, or future leader"
        description="Membership helps EDCH stay connected to the people it serves and gives community members a clear way to participate."
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {siteContent.membershipTypes.map((type) => (
            <SectionCard key={type.title} title={type.title} description={type.description} />
          ))}
        </div>
      </section>
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <SectionCard
            title="How to join"
            description="Use the contact page to tell EDCH how you want to participate. A full membership process can be connected later when EDCH is ready for backend forms and records."
            href="/contact"
            cta="Contact EDCH"
          />
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
            <h2 className="text-xl font-black text-edch-ink dark:text-white">
              Membership benefits
            </h2>
            <ul className="mt-5 grid gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="rounded-2xl bg-edch-sky p-4 font-bold text-slate-700 dark:bg-slate-950/70 dark:text-slate-200">
                  {benefit}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      <CallToAction
        title="Become a member of EDCH"
        description="Start with a simple message. EDCH can follow up as the organization develops its membership process."
        primaryLabel="Become a Member"
        primaryHref="/contact"
      />
    </main>
  );
}
