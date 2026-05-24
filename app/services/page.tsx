import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Practical support for people, families, caregivers, and newcomers"
        description="EDCH services are designed to make support easier to understand, easier to find, and easier to access through trusted community connection."
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteContent.services.map((service) => (
            <SectionCard
              key={service.title}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
