"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/data/site-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("edch-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;

    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("edch-theme", nextTheme ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/88">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="EDCH home">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-edch-blue text-sm font-black text-white shadow-lg shadow-blue-900/20">
            {siteContent.shortName}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-base font-black text-edch-ink dark:text-white">
              {siteContent.shortName}
            </span>
            <span className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              {siteContent.name}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          {siteContent.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-bold transition hover:text-edch-blue dark:hover:text-white",
                pathname === item.href
                  ? "text-edch-blue dark:text-white"
                  : "text-slate-600 dark:text-slate-300"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-blue-100 bg-white px-3 py-2 text-sm font-bold text-edch-ink shadow-sm transition hover:border-edch-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? "Light" : "Dark"}
          </button>
          <Link
            href="/membership"
            className="hidden rounded-full bg-edch-green px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700 sm:inline-flex"
          >
            Join the Community
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-full border border-blue-100 bg-white px-4 py-3 text-sm font-black text-edch-ink shadow-sm xl:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-blue-100 bg-white px-4 py-4 shadow-xl xl:hidden dark:border-white/10 dark:bg-slate-950",
          !menuOpen && "hidden"
        )}
      >
        <div className="mx-auto grid max-w-7xl gap-2">
          {siteContent.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-bold transition hover:bg-edch-sky hover:text-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
                pathname === item.href
                  ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
                  : "text-slate-700 dark:text-slate-200"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/membership"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-2xl bg-edch-green px-4 py-3 text-center text-sm font-black text-white"
          >
            Join the Community
          </Link>
        </div>
      </div>
    </header>
  );
}
