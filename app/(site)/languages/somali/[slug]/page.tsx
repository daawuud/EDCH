import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { SectionHeader } from "@/components/section-header";
import { getSomaliPageBySlug, somaliLinks } from "@/data/languages-content";

type SomaliResourcePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return somaliLinks.map((link) => ({
    slug: link.href.split("/").at(-1) ?? ""
  }));
}

export function generateMetadata({ params }: SomaliResourcePageProps) {
  const page = getSomaliPageBySlug(params.slug);

  if (!page) {
    return {
      title: "Somali Resource | EDCH"
    };
  }

  return {
    title: `${page.title} | EDCH`,
    description: page.description
  };
}

export default function SomaliResourcePage({ params }: SomaliResourcePageProps) {
  const page = getSomaliPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const relatedLinks = somaliLinks
    .filter((link) => link.category === page.category && link.href !== page.href)
    .slice(0, 3);

  return (
    <main>
      <PageHero
        eyebrow="Somali Resource"
        title={page.title}
        description={page.description}
        variant="simple"
        primary={{ href: "/languages/somali", label: "Back to Somali Hub" }}
        secondary={{ href: "/contact", label: "Ask EDCH for Help" }}
        highlights={[page.category, "Somali", "Edmonton"]}
      />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader
              eyebrow={page.category}
              title="Clear Somali-language starting point"
              description="This page is structured for translated content and community navigation. EDCH can expand it with full Somali text, downloadable forms, letter examples, and verified links."
            />
          </div>

          <article className="rounded-3xl border border-blue-100 bg-edch-sky p-6 shadow-sm dark:border-white/10 dark:bg-white/10">
            <h2 className="text-2xl font-black text-edch-ink dark:text-white">
              What this Somali resource can include
            </h2>
            <ul className="mt-6 grid gap-3">
              {[
                "A plain-language Somali explanation of the topic.",
                "Documents or details families should gather before applying or asking for help.",
                "Questions to ask EDCH, a support worker, doctor, school, or government office.",
                "Links back to English EDCH pages when community members need the original source."
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl bg-white p-4 font-bold leading-7 text-slate-700 shadow-sm dark:bg-slate-950/70 dark:text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {relatedLinks.length > 0 ? (
        <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Related Somali resources"
              title="Continue in Somali"
              description="These related pages keep Somali-language resources grouped together instead of crowding the main navigation."
              align="center"
            />
            <div className="grid gap-5 md:grid-cols-3">
              {relatedLinks.map((link) => (
                <SectionCard
                  key={link.href}
                  title={link.title}
                  description={link.description}
                  href={link.href}
                  ctaLabel="Open"
                  icon={getInitials(link.title)}
                  meta={link.category}
                  tone="white"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
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
