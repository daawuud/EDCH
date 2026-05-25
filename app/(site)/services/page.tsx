import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { SectionCard } from "@/components/section-card";
import { getPublicServices } from "@/lib/public-data";

export default async function ServicesPage() {
  const services = await getPublicServices();

  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Practical support for people, families, caregivers, and newcomers"
        description="EDCH services are designed to make support easier to understand, easier to find, and easier to access through trusted community connection."
        variant="cards"
        primary={{ href: "/contact", label: "Ask for Support" }}
        secondary={{ href: "/resources", label: "View Resources" }}
        cards={[
          { title: "Clear next steps", description: "Plain-language help for understanding local and provincial support options." },
          { title: "Community connection", description: "A welcoming path into programs, meetings, referrals, and shared learning." },
          { title: "Family support", description: "Support for caregivers, families, newcomers, and community members." },
          { title: "Rights awareness", description: "Information that supports dignity, inclusion, and accessibility." }
        ]}
      />
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Service areas"
            title="Support that helps people move from confusion to connection"
            description="These service areas can be managed in Supabase from the admin dashboard."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <SectionCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={getServiceIcon(service.title)}
                meta="EDCH service"
                tone={index % 2 === 0 ? "white" : "blue"}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function getServiceIcon(title: string) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("community")) return "CS";
  if (lowerTitle.includes("navigation")) return "RN";
  if (lowerTitle.includes("advocacy") || lowerTitle.includes("rights")) return "AC";
  if (lowerTitle.includes("family") || lowerTitle.includes("caregiver")) return "FS";
  if (lowerTitle.includes("newcomer")) return "NC";
  if (lowerTitle.includes("resource")) return "RS";

  return "ED";
}
