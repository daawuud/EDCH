export type LanguageLink = {
  title: string;
  href: string;
  description: string;
  category: "EDCH" | "Benefits & Supports" | "Resources";
};

export const languages = [
  { label: "Somali", href: "/languages/somali", available: true },
  { label: "Arabic", href: "/languages", available: false },
  { label: "French", href: "/languages", available: false },
  { label: "Oromo", href: "/languages", available: false },
  { label: "Amharic", href: "/languages", available: false }
];

export const somaliIntro =
  "EDCH provides translated disability resources for Somali-speaking newcomers, refugees, families, caregivers, and persons with disabilities in Edmonton.";

export const somaliLinks: LanguageLink[] = [
  {
    title: "About EDCH in Somali",
    href: "/languages/somali/about",
    description:
      "A Somali overview of EDCH, our community purpose, and how families can connect with support.",
    category: "EDCH"
  },
  {
    title: "Services in Somali",
    href: "/languages/somali/services",
    description:
      "Plain-language information about EDCH service navigation, referrals, and community help.",
    category: "EDCH"
  },
  {
    title: "Programs in Somali",
    href: "/languages/somali/programs",
    description:
      "Translated information about learning sessions, community activities, and future programs.",
    category: "EDCH"
  },
  {
    title: "Membership in Somali",
    href: "/languages/somali/membership",
    description:
      "How Somali-speaking community members, families, and allies can become part of EDCH.",
    category: "EDCH"
  },
  {
    title: "Benefits & Supports in Somali",
    href: "/languages/somali/benefits",
    description:
      "A Somali starting point for disability benefits, application pathways, and support options.",
    category: "Benefits & Supports"
  },
  {
    title: "ADAP in Somali",
    href: "/languages/somali/adap",
    description:
      "Somali guidance for Alberta disability assistance transition information and next steps.",
    category: "Benefits & Supports"
  },
  {
    title: "AISH in Somali",
    href: "/languages/somali/aish",
    description:
      "Somali information about Assured Income for the Severely Handicapped and application preparation.",
    category: "Benefits & Supports"
  },
  {
    title: "Alberta Supports in Somali",
    href: "/languages/somali/alberta-supports",
    description:
      "Somali information about Alberta Supports and where to begin when looking for help.",
    category: "Benefits & Supports"
  },
  {
    title: "Disability Tax Credit (DTC) in Somali",
    href: "/languages/somali/dtc",
    description:
      "Somali information about the Disability Tax Credit and documents families may need.",
    category: "Benefits & Supports"
  },
  {
    title: "Registered Disability Savings Plan (RDSP) in Somali",
    href: "/languages/somali/rdsp",
    description:
      "Somali information about RDSP basics, grants, bonds, and long-term planning questions.",
    category: "Benefits & Supports"
  },
  {
    title: "Government Letters in Somali",
    href: "/languages/somali/government-letters",
    description:
      "Somali support for understanding government letters and preparing follow-up questions.",
    category: "Resources"
  },
  {
    title: "Forms in Somali",
    href: "/languages/somali/forms",
    description:
      "Somali guidance for common forms, what information to gather, and how EDCH may help.",
    category: "Resources"
  },
  {
    title: "FAQs in Somali",
    href: "/languages/somali/faqs",
    description:
      "Frequently asked questions in Somali for disability supports, forms, and community navigation.",
    category: "Resources"
  }
];

export function getSomaliPageBySlug(slug: string) {
  return somaliLinks.find((link) => link.href === `/languages/somali/${slug}`);
}
