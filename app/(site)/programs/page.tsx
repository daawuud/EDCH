import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { SectionCard } from "@/components/section-card";
import { getPublicPrograms } from "@/lib/public-data";

export default async function ProgramsPage() {
  const programs = await getPublicPrograms();

  return (
    <main>
      <PageHero
        eyebrow="Programs"
        title="Inclusive programs built around learning, support, and leadership"
        description="EDCH programs can grow with community needs while staying focused on connection, accessibility, practical skills, and participation."
        variant="impact"
        primary={{ href: "/membership", label: "Become a Member" }}
        secondary={{ href: "/events", label: "View Events" }}
        stats={[
          { value: `${programs.length}`, label: "Program areas" },
          { value: "YEG", label: "Edmonton focused" },
          { value: "All", label: "Community welcome" }
        ]}
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Program areas"
            title="Community activities with a practical purpose"
            description="Programs combine connection, learning, accessibility awareness, and volunteer leadership."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <SectionCard
                key={program.title}
                title={program.title}
                description={program.description}
                icon={getProgramIcon(program.title)}
                meta="Program"
                tone={index % 3 === 1 ? "green" : "white"}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function getProgramIcon(title: string) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("meeting")) return "CM";
  if (lowerTitle.includes("digital")) return "DS";
  if (lowerTitle.includes("english")) return "EN";
  if (lowerTitle.includes("accessibility")) return "AC";
  if (lowerTitle.includes("family")) return "FS";
  if (lowerTitle.includes("volunteer")) return "VL";

  return "PG";
}
