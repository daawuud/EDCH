import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

export default function EventsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Events"
        title="Community activities and learning opportunities"
        description="These events are sample placeholders for now and can be updated later with confirmed dates, locations, registration details, and partners."
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {siteContent.events.map((event) => (
            <SectionCard key={event.title} title={event.title} description={event.description} />
          ))}
        </div>
      </section>
    </main>
  );
}
