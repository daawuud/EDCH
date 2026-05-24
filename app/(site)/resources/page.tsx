import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { getPublicResources } from "@/lib/public-data";

export default async function ResourcesPage() {
  const resources = await getPublicResources();

  return (
    <main>
      <PageHero
        eyebrow="Resources"
        title="Helpful starting points for disability and community support"
        description="These placeholder resource cards can later become a full resource directory with verified links, descriptions, and downloadable guides."
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <SectionCard
              key={resource.title}
              title={resource.title}
              description={resource.description}
              href={resource.href}
              cta={resource.href ? "Open Resource" : undefined}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
