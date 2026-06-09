"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminSections = [
  {
    title: "Main navigation",
    links: [
      { label: "Dashboard", href: "/admin/dashboard" },
      { label: "Pages", href: "/admin/pages" },
      { label: "Services", href: "/admin/services" },
      { label: "Programs", href: "/admin/programs" },
      { label: "Resources", href: "/admin/resources" },
      { label: "Benefits & Supports", href: "/admin/benefits" },
      { label: "Other Languages", href: "/admin/languages" },
      { label: "Messages", href: "/admin/messages" },
      { label: "Settings", href: "/admin/settings" }
    ]
  },
  {
    title: "More",
    links: [
      { label: "Membership & Members", href: "/admin/members" },
      { label: "Events", href: "/admin/events" },
      { label: "ADAP", href: "/admin/adap" }
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-blue-100 bg-white p-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r dark:border-white/10 dark:bg-slate-950">
      <Link href="/admin/dashboard" className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-edch-blue text-sm font-black text-white">
          EDCH
        </span>
        <span>
          <span className="block text-base font-black text-edch-ink dark:text-white">
            Admin
          </span>
          <span className="block text-xs font-bold text-slate-500 dark:text-slate-400">
            Demo dashboard
          </span>
        </span>
      </Link>

      <nav aria-label="Admin navigation" className="mt-6 grid gap-5">
        {adminSections.map((section) => (
          <div key={section.title} className="grid gap-2">
            <p className="px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              {section.title}
            </p>
            {section.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-black transition",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-edch-blue text-white"
                    : "text-slate-600 hover:bg-edch-sky hover:text-edch-blue dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <Link
        href="/"
        className="mt-6 inline-flex w-full justify-center rounded-2xl border border-blue-100 px-4 py-3 text-sm font-black text-edch-blue transition hover:bg-edch-sky dark:border-white/10 dark:text-white dark:hover:bg-white/10"
      >
        View Public Site
      </Link>
    </aside>
  );
}
