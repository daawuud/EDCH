import Link from "next/link";

const stats = [
  {
    value: "6",
    label: "Service Areas",
    icon: "SV",
    description:
      "Community support, navigation, advocacy, family support, newcomer support, and resources.",
    href: "/services"
  },
  {
    value: "100%",
    label: "Community-Led",
    icon: "CL",
    description:
      "Built around the voices and needs of people with disabilities, families, and caregivers.",
    href: "/about"
  },
  {
    value: "YEG",
    label: "Edmonton-Based",
    icon: "ED",
    description:
      "Focused on local disability support, connection, and inclusion in Edmonton.",
    href: "/about"
  }
];

const hubModelItems = [
  {
    title: "Disability support navigation",
    icon: "RN",
    description:
      "Helping community members understand services, forms, and available supports."
  },
  {
    title: "Community meetings and training",
    icon: "TR",
    description:
      "Creating space for shared learning, discussion, and practical workshops."
  },
  {
    title: "Family, newcomer, and caregiver support",
    icon: "FS",
    description:
      "Supporting families and newcomers with clear information and community connection."
  }
];

export function CommunityHubVisual() {
  return (
    <div className="relative z-10">
      <div className="rounded-[2rem] border border-white bg-white/90 p-4 shadow-soft backdrop-blur sm:p-5 dark:border-white/10 dark:bg-white/10">
        <div className="rounded-[1.5rem] bg-[#123a66] p-5 text-white sm:p-6 dark:bg-slate-900">
          <div className="mb-5 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-200">
              Edmonton Disability Community Hub
            </p>
            <p className="mt-3 leading-7 text-slate-200">
              A local place for practical support, shared learning, and
              community leadership.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={`Learn more about EDCH ${item.label}`}
                className="group flex min-h-48 flex-col rounded-2xl bg-white p-5 text-edch-ink shadow-sm ring-1 ring-white/20 transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 dark:bg-white/10 dark:text-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-edch-mint text-xs font-black text-edch-green dark:bg-emerald-400/15 dark:text-emerald-200">
                    {item.icon}
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-edch-blue transition group-hover:text-edch-green dark:text-blue-200">
                    View
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black text-edch-green dark:text-emerald-300">
                  {item.value}
                </p>
                <h2 className="mt-1 text-sm font-black uppercase tracking-[0.12em] text-edch-ink dark:text-white">
                  {item.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-200">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-3xl bg-white p-5 text-edch-ink shadow-sm sm:p-6 dark:bg-white/10 dark:text-white">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-edch-green dark:text-emerald-300">
              Community hub model
            </p>
            <div className="mt-5 grid gap-3">
              {hubModelItems.map((item) => (
                <article
                  key={item.title}
                  className="flex gap-4 rounded-2xl bg-edch-sky p-4 text-edch-ink dark:bg-white/10 dark:text-white"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-edch-green text-xs font-black text-white">
                    {item.icon}
                  </span>
                  <div>
                    <h2 className="font-black">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
