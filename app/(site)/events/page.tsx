import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { SectionCard } from "@/components/section-card";
import { getPublicEvents } from "@/lib/public-data";

export default async function EventsPage() {
  const events = await getPublicEvents();

  return (
    <main>
      <PageHero
        eyebrow="Events"
        title="Community activities and learning opportunities"
        description="These events are sample placeholders for now and can be updated later with confirmed dates, locations, registration details, and partners."
        variant="split"
        primary={{ href: "/contact", label: "Ask About Events" }}
        secondary={{ href: "/membership", label: "Join EDCH" }}
        cards={[
          { title: "Information sessions", description: "Welcoming sessions for learning about EDCH and community needs." },
          { title: "Workshops", description: "Practical learning around disability supports, accessibility, and digital skills." }
        ]}
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Upcoming activities"
            title="A community calendar that can grow with EDCH"
            description="Event information is editable from the admin dashboard once details are confirmed."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {events.map((event) => (
              <SectionCard
                key={event.title}
                title={event.title}
                description={event.description}
                href="/events"
                ctaLabel="View event"
                icon="EV"
                meta={event.meta || "Editable event"}
                tone="blue"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
