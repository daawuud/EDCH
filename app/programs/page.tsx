import { PageHero } from "@/components/page-hero";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/data/site-content";

export default function ProgramsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Programs"
        title="Inclusive programs built around learning, support, and leadership"
        description="EDCH programs can grow with community needs while staying focused on connection, accessibility, practical skills, and participation."
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteContent.programs.map((program) => (
            <SectionCard
              key={program.title}
              title={program.title}
              description={program.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
