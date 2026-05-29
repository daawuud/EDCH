import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { SectionHeader } from "@/components/section-header";
import {
  benefitPages,
  benefitSections,
  getBenefitPageBySlug
} from "@/data/benefits-content";

type BenefitPlaceholderPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return benefitPages
    .filter((page) => page.href !== "/benefits/adap-transition")
    .map((page) => ({
      slug: page.href.replace("/benefits/", "")
    }));
}

export default function BenefitPlaceholderPage({
  params
}: BenefitPlaceholderPageProps) {
  const page = getBenefitPageBySlug(params.slug);

  if (!page || page.href === "/benefits/adap-transition") {
    notFound();
  }

  const relatedItems = benefitSections
    .find((section) => section.title === page.sectionTitle)
    ?.items.filter((item) => item.href !== page.href)
    .slice(0, 3);

  return (
    <main>
      <PageHero
        eyebrow={page.sectionTitle}
        title={page.title}
        description={page.description}
        variant="simple"
        primary={{ href: "/benefits", label: "Back to Benefits & Supports" }}
        secondary={{ href: "/contact", label: "Ask EDCH for Help" }}
      />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Coming soon"
            title={`${page.title} guide`}
            description="This page is ready for EDCH to add plain-language details, eligibility notes, links, forms, letters, and translated support documents."
          />

          <div className="grid gap-5 md:grid-cols-3">
            <SectionCard
              title="What this page will include"
              description="Program overview, eligibility notes, application steps, and practical questions to ask before applying."
              icon="1"
              meta="Guide"
              tone="green"
            />
            <SectionCard
              title="Documents and letters"
              description="Space for forms, government letters, translated documents, and EDCH support materials."
              icon="2"
              meta="Documents"
              tone="blue"
            />
            <SectionCard
              title="Community support"
              description="Contact EDCH for help understanding next steps, preparing questions, or finding the right support pathway."
              href="/contact"
              cta="Contact EDCH"
              icon="3"
              meta="Help"
            />
          </div>

          {relatedItems && relatedItems.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-2xl font-black text-edch-ink dark:text-white">
                Related supports
              </h2>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {relatedItems.map((item) => (
                  <SectionCard
                    key={item.href}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    cta="Open Guide"
                    icon="ED"
                    meta={page.sectionTitle}
                    tone="blue"
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
