import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { SectionHeader } from "@/components/section-header";
import { benefitSections, benefitsIntro } from "@/data/benefits-content";

export default function BenefitsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Benefits & Supports"
        title="Benefits & Supports"
        description={benefitsIntro}
        variant="cards"
        primary={{ href: "/benefits/adap-transition", label: "Start with Alberta Programs" }}
        secondary={{ href: "/contact", label: "Ask EDCH for Help" }}
        cards={[
          {
            title: "Alberta first",
            description:
              "ADAP transition, AISH, Alberta Supports, housing, transportation, and health benefits."
          },
          {
            title: "Federal supports",
            description:
              "DTC, CPP Disability, RDSP, and Canada Disability Benefit information."
          },
          {
            title: "Forms and letters",
            description:
              "Guides, government letters, translated documents, and practical next steps."
          },
          {
            title: "Community navigation",
            description:
              "Plain-language support for families, newcomers, caregivers, and community members."
          }
        ]}
      />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Support directory"
            title="Choose a benefits pathway"
            description="Alberta programs are listed first, followed by federal programs and practical resource guides."
            align="center"
          />

          <div className="grid gap-8">
            {benefitSections.map((section, sectionIndex) => (
              <section key={section.href} aria-labelledby={section.href.slice(1)}>
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2
                      id={section.href.slice(1)}
                      className="text-2xl font-black text-edch-ink dark:text-white"
                    >
                      {section.title}
                    </h2>
                    <p className="mt-2 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item, itemIndex) => (
                    <SectionCard
                      key={item.href}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      cta="Open Guide"
                      icon={getBenefitIcon(item.title)}
                      meta={section.title}
                      tone={(sectionIndex + itemIndex) % 2 === 0 ? "green" : "blue"}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function getBenefitIcon(title: string) {
  return title
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}
