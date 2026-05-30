"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { benefitMenuItems } from "@/data/benefits-content";
import { siteContent } from "@/data/site-content";
import { cn } from "@/lib/utils";

const desktopNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Programs", href: "/programs" },
  { label: "Members", href: "/members" },
  { label: "Events", href: "/events" },
  { label: "Donate", href: "/donate" },
  { label: "Resources", href: "/resources" }
];

const tabletNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" }
];

const moreMenuItems = [
  { label: "Benefits & Supports", href: "/benefits" },
  { label: "Contact", href: "/contact" },
  { label: "Membership", href: "/membership" }
];

const tabletMenuItems = [
  { label: "Programs", href: "/programs" },
  { label: "Members", href: "/members" },
  { label: "Events", href: "/events" },
  { label: "Donate", href: "/donate" },
  { label: "Benefits & Supports", href: "/benefits" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" }
];

const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Programs", href: "/programs" },
  { label: "Members", href: "/members" },
  { label: "Events", href: "/events" },
  { label: "Donate", href: "/donate" },
  { label: "Resources", href: "/resources" }
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBenefitsOpen, setMobileBenefitsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const desktopMoreRef = useRef<HTMLDivElement>(null);
  const tabletMoreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("edch-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme === "dark" || (!storedTheme && prefersDark);

    setMounted(true);
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileBenefitsOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      const insideDesktopMore =
        desktopMoreRef.current?.contains(target) ?? false;
      const insideTabletMore = tabletMoreRef.current?.contains(target) ?? false;

      if (!insideDesktopMore && !insideTabletMore) {
        setMoreOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [moreOpen]);

  function toggleTheme() {
    const nextTheme = !isDark;

    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("edch-theme", nextTheme ? "dark" : "light");
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileBenefitsOpen(false);
  }

  function toggleMobileMenu() {
    setMobileMenuOpen((open) => {
      setMobileBenefitsOpen(false);
      return !open;
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
      <DesktopHeader
        pathname={pathname}
        isDark={isDark}
        mounted={mounted}
        moreOpen={moreOpen}
        moreRef={desktopMoreRef}
        onMoreOpenChange={setMoreOpen}
        onToggleTheme={toggleTheme}
      />

      <TabletHeader
        pathname={pathname}
        isDark={isDark}
        mounted={mounted}
        moreOpen={moreOpen}
        moreRef={tabletMoreRef}
        onMoreOpenChange={setMoreOpen}
        onToggleTheme={toggleTheme}
      />

      <MobileHeader
        isDark={isDark}
        mounted={mounted}
        mobileMenuOpen={mobileMenuOpen}
        onToggleTheme={toggleTheme}
        onToggleMenu={toggleMobileMenu}
      />

      <MobileMenu
        pathname={pathname}
        open={mobileMenuOpen}
        benefitsOpen={mobileBenefitsOpen}
        onBenefitsToggle={() => setMobileBenefitsOpen((open) => !open)}
        onNavigate={closeMobileMenu}
      />
    </header>
  );
}

type HeaderSharedProps = {
  pathname: string;
  isDark: boolean;
  mounted: boolean;
  moreOpen: boolean;
  moreRef: RefObject<HTMLDivElement>;
  onMoreOpenChange: (open: boolean) => void;
  onToggleTheme: () => void;
};

function DesktopHeader({
  pathname,
  isDark,
  mounted,
  moreOpen,
  moreRef,
  onMoreOpenChange,
  onToggleTheme
}: HeaderSharedProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="mx-auto hidden h-20 max-w-screen-2xl items-center gap-6 px-6 xl:flex"
    >
      <Logo showSubtitle />

      <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
        {desktopNavItems.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
        <MoreDropdown
          id="desktop-more-menu"
          buttonLabel="More"
          open={moreOpen}
          pathname={pathname}
          refObject={moreRef}
          items={moreMenuItems}
          panelClassName="right-0 w-[min(860px,calc(100vw-3rem))]"
          variant="desktop"
          onOpenChange={onMoreOpenChange}
        />
      </div>

      <HeaderActions
        isDark={isDark}
        mounted={mounted}
        joinLabel="Join the Community"
        onToggleTheme={onToggleTheme}
      />
    </nav>
  );
}

function TabletHeader({
  pathname,
  isDark,
  mounted,
  moreOpen,
  moreRef,
  onMoreOpenChange,
  onToggleTheme
}: HeaderSharedProps) {
  return (
    <nav
      aria-label="Tablet navigation"
      className="mx-auto hidden min-h-20 max-w-screen-2xl items-center gap-4 px-5 md:flex xl:hidden"
    >
      <Logo showSubtitle />

      <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
        {tabletNavItems.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} compact />
        ))}
        <MoreDropdown
          id="tablet-menu"
          buttonLabel="Menu"
          open={moreOpen}
          pathname={pathname}
          refObject={moreRef}
          items={tabletMenuItems}
          panelClassName="right-0 w-[min(720px,calc(100vw-2.5rem))]"
          variant="tablet"
          onOpenChange={onMoreOpenChange}
        />
      </div>

      <HeaderActions
        isDark={isDark}
        mounted={mounted}
        joinLabel="Join"
        onToggleTheme={onToggleTheme}
      />
    </nav>
  );
}

type MobileHeaderProps = {
  isDark: boolean;
  mounted: boolean;
  mobileMenuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
};

function MobileHeader({
  isDark,
  mounted,
  mobileMenuOpen,
  onToggleTheme,
  onToggleMenu
}: MobileHeaderProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="mx-auto flex min-h-16 max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 md:hidden"
    >
      <Logo />
      <div className="flex shrink-0 items-center gap-2">
        <ThemeButton isDark={isDark} mounted={mounted} onToggleTheme={onToggleTheme} />
        <button
          type="button"
          onClick={onToggleMenu}
          className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-edch-ink shadow-sm transition hover:border-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus-visible:ring-offset-slate-950"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </div>
    </nav>
  );
}

function Logo({ showSubtitle = false }: { showSubtitle?: boolean }) {
  return (
    <Link
      href="/"
      className="flex min-w-0 shrink-0 items-center gap-3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
      aria-label="EDCH home"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-edch-blue text-sm font-black text-white shadow-lg shadow-blue-900/20 xl:h-12 xl:w-12">
        {siteContent.shortName}
      </span>
      {showSubtitle ? (
        <span className="hidden min-w-0 leading-tight 2xl:block">
          <span className="block whitespace-nowrap text-lg font-black text-edch-ink dark:text-white">
            {siteContent.shortName}
          </span>
          <span className="block max-w-[190px] truncate text-sm font-semibold text-slate-600 dark:text-slate-300 xl:max-w-[260px]">
            {siteContent.name}
          </span>
        </span>
      ) : null}
    </Link>
  );
}

function HeaderActions({
  isDark,
  mounted,
  joinLabel,
  onToggleTheme
}: {
  isDark: boolean;
  mounted: boolean;
  joinLabel: string;
  onToggleTheme: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <ThemeButton isDark={isDark} mounted={mounted} onToggleTheme={onToggleTheme} />
      <Link
        href="/membership"
        className="inline-flex whitespace-nowrap rounded-full bg-edch-green px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-green focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 xl:px-6 xl:py-3"
      >
        {joinLabel}
      </Link>
    </div>
  );
}

function ThemeButton({
  isDark,
  mounted,
  onToggleTheme
}: {
  isDark: boolean;
  mounted: boolean;
  onToggleTheme: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className="rounded-full border border-blue-100 bg-white px-3 py-2 text-sm font-bold text-edch-ink shadow-sm transition hover:border-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus-visible:ring-offset-slate-950"
      aria-label={mounted && isDark ? "Switch to light theme" : "Switch to dark theme"}
      suppressHydrationWarning
    >
      {mounted && isDark ? "Light" : "Dark"}
    </button>
  );
}

function NavLink({
  item,
  pathname,
  compact = false
}: {
  item: { label: string; href: string };
  pathname: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "whitespace-nowrap rounded-full font-bold transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue focus-visible:ring-offset-2 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-offset-slate-950",
        compact ? "px-2.5 py-2 text-sm" : "px-3 py-2 text-sm",
        pathname === item.href
          ? "text-edch-blue dark:text-white"
          : "text-slate-600 dark:text-slate-300"
      )}
    >
      {item.label}
    </Link>
  );
}

type MoreDropdownProps = {
  id: string;
  buttonLabel: string;
  open: boolean;
  pathname: string;
  refObject: RefObject<HTMLDivElement>;
  items: { label: string; href: string }[];
  panelClassName: string;
  variant: "desktop" | "tablet";
  onOpenChange: (open: boolean) => void;
};

function MoreDropdown({
  id,
  buttonLabel,
  open,
  pathname,
  refObject,
  items,
  panelClassName,
  variant,
  onOpenChange
}: MoreDropdownProps) {
  const hasActiveItem = items.some((item) =>
    item.href === "/benefits"
      ? pathname === "/benefits" || pathname.startsWith("/benefits/")
      : pathname === item.href
  );

  return (
    <div
      ref={refObject}
      className="relative shrink-0"
      onMouseEnter={() => {
        if (variant === "desktop") {
          onOpenChange(true);
        }
      }}
      onFocus={() => {
        if (variant === "desktop") {
          onOpenChange(true);
        }
      }}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget as Node | null;

        if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
          onOpenChange(false);
        }
      }}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue focus-visible:ring-offset-2 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-offset-slate-950",
          hasActiveItem
            ? "text-edch-blue dark:text-white"
            : "text-slate-600 dark:text-slate-300"
        )}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (variant === "desktop") {
            onOpenChange(true);
            return;
          }

          onOpenChange(!open);
        }}
      >
        {buttonLabel}
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          id={id}
          className={cn("absolute top-full z-[60] pt-3", panelClassName)}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="rounded-2xl bg-white p-4 text-left shadow-soft ring-1 ring-blue-100 dark:bg-slate-950 dark:ring-white/10">
            {variant === "desktop" ? (
              <DesktopMorePanel
                pathname={pathname}
                onNavigate={() => onOpenChange(false)}
              />
            ) : (
              <TabletMorePanel
                pathname={pathname}
                items={items}
                onNavigate={() => onOpenChange(false)}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DesktopMorePanel({
  pathname,
  onNavigate
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4">
      <div className="grid content-start gap-1">
        {moreMenuItems.map((item) => (
          <PanelLink
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-50 p-3 ring-1 ring-blue-100 dark:bg-white/5 dark:ring-white/10">
        {benefitMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="rounded-xl px-3 py-2 text-sm font-bold leading-snug text-slate-600 transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function TabletMorePanel({
  pathname,
  items,
  onNavigate
}: {
  pathname: string;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <PanelLink
          key={item.href}
          item={item}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

function PanelLink({
  item,
  pathname,
  onNavigate
}: {
  item: { label: string; href: string };
  pathname: string;
  onNavigate: () => void;
}) {
  const active =
    item.href === "/benefits"
      ? pathname === "/benefits" || pathname.startsWith("/benefits/")
      : pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "rounded-xl px-3 py-2 text-sm font-black transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
        active
          ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
          : "text-slate-700 dark:text-slate-200"
      )}
    >
      {item.label}
    </Link>
  );
}

type MobileMenuProps = {
  pathname: string;
  open: boolean;
  benefitsOpen: boolean;
  onBenefitsToggle: () => void;
  onNavigate: () => void;
};

function MobileMenu({
  pathname,
  open,
  benefitsOpen,
  onBenefitsToggle,
  onNavigate
}: MobileMenuProps) {
  const benefitsActive = pathname === "/benefits" || pathname.startsWith("/benefits/");
  if (!open) {
    return null;
  }

  return (
    <div
      id="mobile-menu"
      className="max-h-[calc(100vh-4rem)] overflow-auto border-t border-blue-100 bg-white px-4 py-3 shadow-xl md:hidden dark:border-white/10 dark:bg-slate-950"
    >
      <div className="mx-auto grid max-w-screen-2xl gap-1.5">
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-xl px-3 py-2 text-sm font-bold transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
              pathname === item.href
                ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
                : "text-slate-700 dark:text-slate-200"
            )}
          >
            {item.label}
          </Link>
        ))}

        <button
          type="button"
          onClick={onBenefitsToggle}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-black transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
            benefitsActive
              ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
              : "text-slate-700 dark:text-slate-200"
          )}
          aria-expanded={benefitsOpen}
          aria-controls="mobile-benefits-menu"
        >
          <span className="whitespace-nowrap">Benefits & Supports</span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition", benefitsOpen && "rotate-180")}
          />
        </button>

        {benefitsOpen ? (
          <div
            id="mobile-benefits-menu"
            className="grid gap-1 rounded-2xl bg-slate-50 p-2 ring-1 ring-blue-100 dark:bg-white/5 dark:ring-white/10"
          >
            <Link
              href="/benefits"
              onClick={onNavigate}
              className="rounded-xl px-3 py-1.5 text-sm font-black leading-snug text-edch-ink transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:text-white dark:hover:bg-white/10"
            >
              Benefits overview
            </Link>
            {benefitMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="rounded-xl px-3 py-1.5 text-sm font-bold leading-snug text-slate-600 transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
        ) : null}

        <Link
          href="/contact"
          onClick={onNavigate}
          className={cn(
            "rounded-xl px-3 py-2 text-sm font-bold transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
            pathname === "/contact"
              ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
              : "text-slate-700 dark:text-slate-200"
          )}
        >
          Contact
        </Link>

        <Link
          href="/membership"
          onClick={onNavigate}
          className="mt-1 rounded-xl bg-edch-green px-4 py-2.5 text-center text-sm font-black text-white transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-green"
        >
          Join the Community
        </Link>
      </div>
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
