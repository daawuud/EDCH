import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
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
        variant="cards"
        primary={{ href: "/contact", label: "Ask for Help" }}
        secondary={{ href: "/services", label: "View Services" }}
        cards={[
          { title: "Alberta supports", description: "Starting points for disability programs, AISH, ADAP, and public service pathways." },
          { title: "Edmonton access", description: "Local information for transportation, settlement, legal support, and community connection." },
          { title: "Plain language", description: "Resources can be expanded into clear guides for families and newcomers." },
          { title: "Admin editable", description: "Resource cards can be updated as EDCH verifies new information." }
        ]}
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Resource directory"
            title="Clear starting points for community members"
            description="Resource entries come from Supabase when configured and fall back safely during local setup."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <SectionCard
                key={resource.title}
                title={resource.title}
                description={resource.description}
                href={resource.href}
                cta={resource.href ? "Open Resource" : undefined}
                icon={getResourceIcon(resource.title)}
                meta="Resource"
                tone={index % 2 === 0 ? "blue" : "white"}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function getResourceIcon(title: string) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("disability") || lowerTitle.includes("adap")) return "DS";
  if (lowerTitle.includes("aish")) return "AI";
  if (lowerTitle.includes("transport")) return "AT";
  if (lowerTitle.includes("legal") || lowerTitle.includes("rights")) return "LR";
  if (lowerTitle.includes("settlement")) return "NS";

  return "RS";
}
