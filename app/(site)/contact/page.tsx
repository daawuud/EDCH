import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { siteContent } from "@/data/site-content";

export default function ContactPage({
  searchParams
}: {
  searchParams?: { sent?: string; error?: string };
}) {
  const sent = Boolean(searchParams?.sent);
  const error = Boolean(searchParams?.error);

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Contact EDCH"
        description="Use this form to ask about joining EDCH, becoming a member, volunteering, asking for support, partnering, or future donation conversations."
        variant="split"
        primary={{ href: "#contact-form", label: "Send a Message" }}
        secondary={{ href: "/membership", label: "Become a Member" }}
        highlights={["Edmonton, Alberta", "Community-led", "Backend-ready form"]}
        cards={[
          { title: "Community inquiries", description: "Membership, volunteering, support, partnership, and funding conversations." },
          { title: "Respectful follow-up", description: "Messages can be reviewed from the admin dashboard when Supabase is connected." }
        ]}
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-edch-ink p-8 text-white shadow-soft">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
              Reach out
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Start a conversation with EDCH
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              EDCH welcomes messages from community members, families,
              caregivers, newcomers, volunteers, organizations, funders, and
              partners.
            </p>
            <p className="mt-8 text-2xl font-black">{siteContent.name}</p>
            <p className="mt-6 font-bold text-emerald-300">{siteContent.location}</p>
            <p className="mt-8 rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200">
              The form saves to Supabase when configured. Email delivery can be
              connected later.
            </p>
          </div>
          <div id="contact-form">
            <ContactForm sent={sent} error={error} />
          </div>
        </div>
      </section>
    </main>
  );
}
