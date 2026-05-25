import { CallToAction } from "@/components/call-to-action";
import { InfoPanel } from "@/components/info-panel";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About EDCH"
        title="A community-led disability support hub for Edmonton"
        description={siteContent.about.intro}
        variant="split"
        primary={{ href: "/membership", label: "Join the Community" }}
        secondary={{ href: "/contact", label: "Contact EDCH" }}
        highlights={siteContent.about.values.slice(0, 3)}
        cards={[
          {
            title: "Local and community-led",
            description: "Built around Edmonton families, caregivers, newcomers, volunteers, and partners."
          },
          {
            title: "Practical and welcoming",
            description: "Focused on clear information, connection, and respectful support."
          }
        ]}
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Purpose"
            title="A trusted local space for support, learning, and leadership"
            description="EDCH is being shaped as a practical community hub, not just an information website."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <InfoPanel title="Mission" tone="blue">
              {siteContent.about.mission}
            </InfoPanel>
            <InfoPanel title="Vision" tone="green">
              {siteContent.about.vision}
            </InfoPanel>
            <InfoPanel title="Why it matters" tone="dark">
              {siteContent.about.whyItMatters}
            </InfoPanel>
          </div>
        </div>
      </section>
      <section className="bg-edch-sky px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What EDCH is building"
            title="Practical community infrastructure for Edmonton"
            description="EDCH is being shaped step by step with people, families, volunteers, and partners who understand local needs."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <SectionCard
              title="A trusted local support network"
              description="A warm place for people to connect, ask questions, and find reliable next steps."
              icon="CS"
              meta="Community support"
              tone="white"
            />
            <SectionCard
              title="Accessible community meetings"
              description="Inclusive gatherings where members can share needs, learn together, and reduce isolation."
              icon="AC"
              meta="Accessibility"
              tone="green"
            />
            <SectionCard
              title="Training and information sessions"
              description="Plain-language sessions for digital skills, rights awareness, services, and family support."
              icon="TR"
              meta="Training"
              tone="white"
            />
            <SectionCard
              title="Help navigating disability services"
              description="Clear guidance for understanding service pathways, referrals, forms, and support options."
              icon="RN"
              meta="Resources"
              tone="blue"
            />
          </div>
        </div>
      </section>
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="Values"
              title="How EDCH wants to work with community"
              description="These values guide conversations, programs, services, and future partnerships."
            />
          </div>
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
        description="Share ideas, volunteer, or learn how this hub can support Edmonton families, caregivers, newcomers, and partners."
        primaryLabel="Contact EDCH"
        primaryHref="/contact"
        secondaryLabel="Become a Member"
        secondaryHref="/membership"
      />
    </main>
  );
}
