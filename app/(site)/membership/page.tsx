import { CallToAction } from "@/components/call-to-action";
import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";
import { submitMembershipApplication } from "@/lib/membership-actions";

const benefits = [
  "Receive community updates and program information.",
  "Participate in conversations about disability support needs.",
  "Connect with families, caregivers, volunteers, and partners.",
  "Help EDCH grow as a trusted community-led organization."
];

export default function MembershipPage({
  searchParams
}: {
  searchParams?: { applied?: string; error?: string };
}) {
  const applied = searchParams?.applied;
  const error = searchParams?.error;

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
            description="Complete the membership application form below. EDCH can review applications, follow up, and approve confirmed members from the admin dashboard."
            href="#membership-application"
            cta="Apply Now"
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
      <section
        id="membership-application"
        className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-edch-green">
              Membership application
            </p>
            <h2 className="mt-3 text-3xl font-black text-edch-ink dark:text-white">
              Apply to join the EDCH community
            </h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              Submit your interest as a community member, volunteer, supporter,
              or future board member. EDCH can review applications and follow up
              respectfully.
            </p>
            {applied ? (
              <p className="mt-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
                Thank you for applying to EDCH. Your application has been
                received and is ready for admin review.
              </p>
            ) : null}
            {error ? (
              <p className="mt-6 rounded-3xl bg-red-50 p-5 font-bold text-red-700">
                We could not submit the application right now. Please try again
                or contact EDCH directly.
              </p>
            ) : null}
          </div>

          <form
            action={submitMembershipApplication}
            className="grid gap-4 rounded-3xl bg-slate-50 p-6 shadow-sm ring-1 ring-blue-100 md:grid-cols-2 dark:bg-white/10 dark:ring-white/10"
          >
            <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              Full name
              <input
                name="fullName"
                required
                className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              Email
              <input
                name="email"
                type="email"
                required
                className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              Phone
              <input
                name="phone"
                className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              Membership type
              <select
                name="memberType"
                defaultValue="Community Member"
                className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
              >
                <option>Community Member</option>
                <option>Volunteer</option>
                <option>Supporter</option>
                <option>Future Board Member</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 dark:text-slate-200">
              I am interested in
              <select
                name="interest"
                defaultValue="Join EDCH"
                className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
              >
                <option>Join EDCH</option>
                <option>Volunteer</option>
                <option>Ask for Support</option>
                <option>Partner with EDCH</option>
                <option>Support or Donate</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2 dark:text-slate-200">
              Message
              <textarea
                name="message"
                rows={5}
                className="resize-none rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </label>
            <button className="rounded-full bg-edch-green px-6 py-3 font-black text-white md:col-span-2">
              Submit Application
            </button>
          </form>
        </div>
      </section>
      <CallToAction
        title="Become a member of EDCH"
        description="Apply online so EDCH can review your interest and keep the community organized."
        primaryLabel="Become a Member"
        primaryHref="#membership-application"
      />
    </main>
  );
}
