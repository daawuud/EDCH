import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { getPublicMembers } from "@/lib/public-data";

export default async function MembersPage() {
  const members = await getPublicMembers();

  return (
    <main>
      <PageHero
        eyebrow="Members"
        title="EDCH community members"
        description="Meet the people who are helping EDCH grow as a welcoming disability community hub. Only safe public information is shown here."
        variant="centered"
        primary={{ href: "/membership", label: "Become a Member" }}
        secondary={{ href: "/contact", label: "Contact EDCH" }}
        highlights={["Approved active members only", "Private details protected", "Community directory"]}
      />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Public directory"
            title="Active members"
            description="This directory shows approved active members only. Private details like email, phone, notes, and application messages stay protected in the admin dashboard."
          />

          {members.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
              <article
                key={`${member.fullName}-${member.memberType}`}
                className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-edch-mint text-lg font-black text-edch-green">
                    {getInitials(member.fullName)}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-edch-ink dark:text-white">
                      {member.fullName}
                    </h2>
                    <p className="mt-2 font-bold text-edch-blue dark:text-blue-300">
                      {member.memberType}
                    </p>
                  </div>
                </div>
                <span className="mt-5 inline-flex rounded-full bg-edch-sky px-4 py-2 text-xs font-black uppercase text-edch-blue dark:bg-white/10 dark:text-white">
                  {member.status}
                </span>
              </article>
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-blue-100 bg-slate-50 p-6 font-bold text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
              No active public members are listed yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
