import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { SectionHeader } from "@/components/section-header";
import { somaliIntro, somaliLinks } from "@/data/languages-content";

const categories = ["EDCH", "Benefits & Supports", "Resources"] as const;

export default function SomaliLanguagePage() {
  return (
    <main>
      <PageHero
        eyebrow="Somali Resources"
        title="Macluumaad Soomaali ah oo ku saabsan taageerada naafada"
        description={somaliIntro}
        variant="cards"
        primary={{ href: "/languages/somali/benefits", label: "Start with Benefits" }}
        secondary={{ href: "/contact", label: "Contact EDCH" }}
        cards={[
          {
            title: "For families and newcomers",
            description:
              "Plain-language Somali resources for settlement, disability support, benefits, and community navigation."
          },
          {
            title: "Grouped by topic",
            description:
              "EDCH information, benefit programs, forms, government letters, and common questions are organized below."
          }
        ]}
      />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Somali directory"
            title="Translated pages and resources"
            description="Choose a Somali resource below. These pages provide clear starting points and can be expanded with full translations over time."
            align="center"
          />

          <div className="grid gap-10">
            {categories.map((category) => {
              const links = somaliLinks.filter((link) => link.category === category);

              return (
                <section key={category} aria-labelledby={`${category}-somali`}>
                  <h2
                    id={`${category}-somali`}
                    className="mb-5 text-2xl font-black text-edch-ink dark:text-white"
                  >
                    {category}
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {links.map((link, index) => (
                      <SectionCard
                        key={link.href}
                        title={link.title}
                        description={link.description}
                        href={link.href}
                        ctaLabel="Open Somali Page"
                        icon={getInitials(link.title)}
                        meta={category}
                        tone={index % 2 === 0 ? "green" : "blue"}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function getInitials(title: string) {
  return title
    .replace(/\([^)]*\)/g, "")
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}
