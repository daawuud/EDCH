export type BenefitLink = {
  title: string;
  href: string;
  description: string;
};

export type BenefitSection = {
  title: string;
  href: string;
  description: string;
  items: BenefitLink[];
};

export const benefitsIntro =
  "Find disability-related benefits, programs, forms, letters, and support resources for Albertans and Canadians with disabilities. EDCH focuses first on Alberta programs, while also sharing important federal disability supports.";

export const benefitSections: BenefitSection[] = [
  {
    title: "Alberta Programs",
    href: "/benefits/alberta-programs",
    description:
      "Alberta disability support pathways, health benefits, transportation, housing, and service navigation.",
    items: [
      {
        title: "ADAP Transition",
        href: "/benefits/adap-transition",
        description:
          "ADAP information, document preparation guidance, and translated support letters."
      },
      {
        title: "AISH",
        href: "/benefits/aish",
        description:
          "Placeholder guide for Assured Income for the Severely Handicapped."
      },
      {
        title: "Alberta Supports",
        href: "/benefits/alberta-supports",
        description:
          "Placeholder guide for Alberta Supports and disability-related service navigation."
      },
      {
        title: "Housing Supports",
        href: "/benefits/housing-supports",
        description:
          "Placeholder guide for housing support programs and application preparation."
      },
      {
        title: "Transportation Supports",
        href: "/benefits/transportation-supports",
        description:
          "Placeholder guide for accessible transportation and mobility support options."
      },
      {
        title: "Health Benefits",
        href: "/benefits/health-benefits",
        description:
          "Placeholder guide for health benefits, coverage questions, and related supports."
      }
    ]
  },
  {
    title: "Federal Programs",
    href: "/benefits/federal-programs",
    description:
      "Federal disability benefits, savings plans, tax credits, and income support pathways.",
    items: [
      {
        title: "Disability Tax Credit (DTC)",
        href: "/benefits/disability-tax-credit",
        description:
          "Placeholder guide for the Disability Tax Credit and supporting documents."
      },
      {
        title: "CPP Disability",
        href: "/benefits/cpp-disability",
        description:
          "Placeholder guide for Canada Pension Plan Disability benefits."
      },
      {
        title: "Registered Disability Savings Plan (RDSP)",
        href: "/benefits/rdsp",
        description:
          "Placeholder guide for RDSP basics, grants, bonds, and planning questions."
      },
      {
        title: "Canada Disability Benefit",
        href: "/benefits/canada-disability-benefit",
        description:
          "Placeholder guide for Canada Disability Benefit updates and readiness."
      }
    ]
  },
  {
    title: "Resources & Guides",
    href: "/benefits/resources-guides",
    description:
      "Forms, letters, translated documents, and plain-language frequently asked questions.",
    items: [
      {
        title: "Forms",
        href: "/benefits/forms",
        description:
          "Placeholder library for forms and form-preparation notes."
      },
      {
        title: "Government Letters",
        href: "/benefits/government-letters",
        description:
          "Placeholder library for government letter templates and examples."
      },
      {
        title: "Translated Documents",
        href: "/benefits/translated-documents",
        description:
          "Placeholder library for translated support documents and language access."
      },
      {
        title: "FAQs",
        href: "/benefits/faqs",
        description:
          "Placeholder page for common benefits and support questions."
      }
    ]
  }
];

export const benefitPages = benefitSections.flatMap((section) => [
  {
    title: section.title,
    href: section.href,
    description: section.description,
    sectionTitle: "Benefits & Supports"
  },
  ...section.items.map((item) => ({
    ...item,
    sectionTitle: section.title
  }))
]);

export const benefitMenuItems = benefitSections.flatMap((section) => section.items);

export function getBenefitPageBySlug(slug: string) {
  return benefitPages.find((page) => page.href === `/benefits/${slug}`);
}
