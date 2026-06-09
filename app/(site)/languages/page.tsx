import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { SectionHeader } from "@/components/section-header";
import { languages, somaliIntro } from "@/data/languages-content";

export default function LanguagesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Other Languages"
        title="Translated disability resources for Edmonton communities"
        description="EDCH is organizing multilingual information so families can find disability supports, forms, letters, and community pathways without overcrowding the main English website navigation."
        variant="cards"
        primary={{ href: "/languages/somali", label: "Open Somali Resources" }}
        secondary={{ href: "/contact", label: "Request Language Help" }}
        cards={[
          {
            title: "Somali available now",
            description: somaliIntro
          },
          {
            title: "More languages planned",
            description:
              "Arabic, French, Oromo, and Amharic sections are marked coming soon while EDCH prepares content."
          }
        ]}
      />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Language directory"
            title="Choose a language"
            description="Available language sections open translated resource hubs. Planned languages are shown clearly as coming soon."
            align="center"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {languages.map((language, index) => (
              <SectionCard
                key={language.label}
                title={language.label}
                description={
                  language.available
                    ? "Somali translated EDCH pages, benefits guides, forms, government letter help, and FAQs."
                    : "This language section is planned and will be added as translated resources become available."
                }
                href={language.available ? language.href : undefined}
                ctaLabel={language.available ? "View Resources" : undefined}
                icon={language.label.slice(0, 2).toUpperCase()}
                meta={language.available ? "Available" : "Coming Soon"}
                tone={language.available ? "green" : index % 2 === 0 ? "blue" : "white"}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
