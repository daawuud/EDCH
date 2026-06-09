"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { benefitMenuItems } from "@/data/benefits-content";
import { siteContent } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { en } from "@/translations/en";
import { so } from "@/translations/so";

type Locale = "en" | "so";
type NavKey = keyof typeof en.nav;
type MoreKey = keyof typeof en.more;
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, so };
const locales: Locale[] = ["en", "so"];

const desktopNavItems = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "services", href: "/services" },
  { labelKey: "programs", href: "/programs" },
  { labelKey: "resources", href: "/resources" }
] satisfies { labelKey: NavKey; href: string }[];

const tabletNavItems = [
  { labelKey: "home", href: "/" },
  { labelKey: "services", href: "/services" },
  { labelKey: "resources", href: "/resources" }
] satisfies { labelKey: NavKey; href: string }[];

const moreMenuItems = [
  { labelKey: "membership", href: "/membership" },
  { labelKey: "members", href: "/members" },
  { labelKey: "events", href: "/events" },
  { labelKey: "donate", href: "/donate" }
] satisfies { labelKey: MoreKey; href: string }[];

const tabletMenuItems = [
  { labelKey: "about", href: "/about", group: "nav" },
  { labelKey: "programs", href: "/programs", group: "nav" },
  { labelKey: "contact", href: "/contact", group: "nav" },
  { labelKey: "membership", href: "/membership", group: "more" },
  { labelKey: "members", href: "/members", group: "more" },
  { labelKey: "events", href: "/events", group: "more" },
  { labelKey: "donate", href: "/donate", group: "more" }
] satisfies MenuItem[];

const mobileNavItems = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "services", href: "/services" },
  { labelKey: "programs", href: "/programs" },
  { labelKey: "resources", href: "/resources" }
] satisfies { labelKey: NavKey; href: string }[];

type NavItem = (typeof desktopNavItems)[number];
type MoreItem = (typeof moreMenuItems)[number];
type MenuItem =
  | { labelKey: NavKey; href: string; group: "nav" }
  | { labelKey: MoreKey; href: string; group: "more" };

function getLocaleFromPath(pathname: string): Locale {
  const locale = pathname.split("/")[1];

  return locale === "so" ? "so" : "en";
}

function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(en|so)(?=\/|$)/, "");

  return stripped || "/";
}

function withLocalePath(href: string, locale: Locale) {
  if (href.startsWith("http") || href.startsWith("#")) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return `/${locale}${href}`;
}

function switchLocalePath(pathname: string, locale: Locale) {
  return withLocalePath(stripLocale(pathname), locale);
}

function isActivePath(pathname: string, href: string) {
  const normalizedPathname = stripLocale(pathname);

  if (href === "/benefits") {
    return normalizedPathname === "/benefits" || normalizedPathname.startsWith("/benefits/");
  }

  if (href === "/") {
    return normalizedPathname === "/";
  }

  return normalizedPathname === href;
}

function getMenuLabel(item: NavItem | MoreItem | MenuItem, t: Translations) {
  if ("group" in item && item.group === "more") {
    return t.more[item.labelKey];
  }

  if ("group" in item && item.group === "nav") {
    return t.nav[item.labelKey];
  }

  if (item.labelKey in t.more) {
    return t.more[item.labelKey as MoreKey];
  }

  return t.nav[item.labelKey as NavKey];
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBenefitsOpen, setMobileBenefitsOpen] = useState(false);
  const [mobileLanguagesOpen, setMobileLanguagesOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const desktopBenefitsRef = useRef<HTMLDivElement>(null);
  const tabletBenefitsRef = useRef<HTMLDivElement>(null);
  const desktopMoreRef = useRef<HTMLDivElement>(null);
  const tabletMoreRef = useRef<HTMLDivElement>(null);
  const desktopLanguagesRef = useRef<HTMLDivElement>(null);
  const tabletLanguagesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = translations[locale];

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
    setMobileLanguagesOpen(false);
    setMobileMoreOpen(false);
    setBenefitsOpen(false);
    setMoreOpen(false);
    setLanguagesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!benefitsOpen && !moreOpen && !languagesOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      const insideDesktopBenefits =
        desktopBenefitsRef.current?.contains(target) ?? false;
      const insideTabletBenefits =
        tabletBenefitsRef.current?.contains(target) ?? false;
      const insideDesktopMore =
        desktopMoreRef.current?.contains(target) ?? false;
      const insideTabletMore = tabletMoreRef.current?.contains(target) ?? false;
      const insideDesktopLanguages =
        desktopLanguagesRef.current?.contains(target) ?? false;
      const insideTabletLanguages =
        tabletLanguagesRef.current?.contains(target) ?? false;

      if (!insideDesktopBenefits && !insideTabletBenefits) {
        setBenefitsOpen(false);
      }

      if (!insideDesktopMore && !insideTabletMore) {
        setMoreOpen(false);
      }

      if (!insideDesktopLanguages && !insideTabletLanguages) {
        setLanguagesOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setBenefitsOpen(false);
        setMoreOpen(false);
        setLanguagesOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [benefitsOpen, moreOpen, languagesOpen]);

  function toggleTheme() {
    const nextTheme = !isDark;

    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("edch-theme", nextTheme ? "dark" : "light");
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileBenefitsOpen(false);
    setMobileLanguagesOpen(false);
    setMobileMoreOpen(false);
  }

  function toggleMobileMenu() {
    setMobileMenuOpen((open) => {
      setMobileBenefitsOpen(false);
      setMobileLanguagesOpen(false);
      setMobileMoreOpen(false);
      return !open;
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
      <DesktopHeader
        pathname={pathname}
        locale={locale}
        t={t}
        isDark={isDark}
        mounted={mounted}
        benefitsOpen={benefitsOpen}
        moreOpen={moreOpen}
        languagesOpen={languagesOpen}
        benefitsRef={desktopBenefitsRef}
        moreRef={desktopMoreRef}
        languagesRef={desktopLanguagesRef}
        onBenefitsOpenChange={setBenefitsOpen}
        onMoreOpenChange={setMoreOpen}
        onLanguagesOpenChange={setLanguagesOpen}
        onToggleTheme={toggleTheme}
      />

      <TabletHeader
        pathname={pathname}
        locale={locale}
        t={t}
        isDark={isDark}
        mounted={mounted}
        benefitsOpen={benefitsOpen}
        moreOpen={moreOpen}
        languagesOpen={languagesOpen}
        benefitsRef={tabletBenefitsRef}
        moreRef={tabletMoreRef}
        languagesRef={tabletLanguagesRef}
        onBenefitsOpenChange={setBenefitsOpen}
        onMoreOpenChange={setMoreOpen}
        onLanguagesOpenChange={setLanguagesOpen}
        onToggleTheme={toggleTheme}
      />

      <MobileHeader
        locale={locale}
        t={t}
        isDark={isDark}
        mounted={mounted}
        mobileMenuOpen={mobileMenuOpen}
        onToggleTheme={toggleTheme}
        onToggleMenu={toggleMobileMenu}
      />

      <MobileMenu
        pathname={pathname}
        locale={locale}
        t={t}
        open={mobileMenuOpen}
        benefitsOpen={mobileBenefitsOpen}
        languagesOpen={mobileLanguagesOpen}
        moreOpen={mobileMoreOpen}
        onBenefitsToggle={() => setMobileBenefitsOpen((open) => !open)}
        onLanguagesToggle={() => setMobileLanguagesOpen((open) => !open)}
        onMoreToggle={() => setMobileMoreOpen((open) => !open)}
        onNavigate={closeMobileMenu}
      />
    </header>
  );
}

type HeaderSharedProps = {
  pathname: string;
  locale: Locale;
  t: Translations;
  isDark: boolean;
  mounted: boolean;
  benefitsOpen: boolean;
  moreOpen: boolean;
  languagesOpen: boolean;
  benefitsRef: RefObject<HTMLDivElement>;
  moreRef: RefObject<HTMLDivElement>;
  languagesRef: RefObject<HTMLDivElement>;
  onBenefitsOpenChange: (open: boolean) => void;
  onMoreOpenChange: (open: boolean) => void;
  onLanguagesOpenChange: (open: boolean) => void;
  onToggleTheme: () => void;
};

function DesktopHeader({
  pathname,
  locale,
  t,
  isDark,
  mounted,
  benefitsOpen,
  moreOpen,
  languagesOpen,
  benefitsRef,
  moreRef,
  languagesRef,
  onBenefitsOpenChange,
  onMoreOpenChange,
  onLanguagesOpenChange,
  onToggleTheme
}: HeaderSharedProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="mx-auto hidden h-20 max-w-screen-2xl items-center gap-5 px-6 2xl:flex"
    >
      <Logo locale={locale} showSubtitle />

      <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
        {desktopNavItems.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} locale={locale} t={t} />
        ))}
        <BenefitsDropdown
          id="desktop-benefits-menu"
          open={benefitsOpen}
          pathname={pathname}
          locale={locale}
          t={t}
          refObject={benefitsRef}
          panelClassName="left-1/2 w-[min(760px,calc(100vw-3rem))] -translate-x-1/2"
          variant="desktop"
          onOpenChange={onBenefitsOpenChange}
        />
        <LanguageDropdown
          id="desktop-languages-menu"
          open={languagesOpen}
          pathname={pathname}
          locale={locale}
          t={t}
          refObject={languagesRef}
          panelClassName="right-0 w-80"
          variant="desktop"
          onOpenChange={onLanguagesOpenChange}
        />
        <NavLink
          item={{ labelKey: "contact", href: "/contact" }}
          pathname={pathname}
          locale={locale}
          t={t}
        />
        <MoreDropdown
          id="desktop-more-menu"
          buttonLabel={t.nav.more}
          open={moreOpen}
          pathname={pathname}
          locale={locale}
          t={t}
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
        joinLabel={t.actions.joinCommunity}
        locale={locale}
        t={t}
        onToggleTheme={onToggleTheme}
      />
    </nav>
  );
}

function TabletHeader({
  pathname,
  locale,
  t,
  isDark,
  mounted,
  benefitsOpen,
  moreOpen,
  languagesOpen,
  benefitsRef,
  moreRef,
  languagesRef,
  onBenefitsOpenChange,
  onMoreOpenChange,
  onLanguagesOpenChange,
  onToggleTheme
}: HeaderSharedProps) {
  return (
    <nav
      aria-label="Tablet navigation"
      className="mx-auto hidden min-h-20 max-w-screen-2xl items-center gap-4 px-5 lg:flex 2xl:hidden"
    >
      <Logo locale={locale} showSubtitle />

      <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
        {tabletNavItems.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} locale={locale} t={t} compact />
        ))}
        <BenefitsDropdown
          id="tablet-benefits-menu"
          open={benefitsOpen}
          pathname={pathname}
          locale={locale}
          t={t}
          refObject={benefitsRef}
          panelClassName="right-0 w-[min(640px,calc(100vw-2.5rem))]"
          variant="tablet"
          onOpenChange={onBenefitsOpenChange}
        />
        <LanguageDropdown
          id="tablet-languages-menu"
          open={languagesOpen}
          pathname={pathname}
          locale={locale}
          t={t}
          refObject={languagesRef}
          panelClassName="right-0 w-80"
          variant="tablet"
          onOpenChange={onLanguagesOpenChange}
        />
        <MoreDropdown
          id="tablet-menu"
          buttonLabel={t.nav.menu}
          open={moreOpen}
          pathname={pathname}
          locale={locale}
          t={t}
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
        joinLabel={t.actions.join}
        locale={locale}
        t={t}
        onToggleTheme={onToggleTheme}
      />
    </nav>
  );
}

type MobileHeaderProps = {
  locale: Locale;
  t: Translations;
  isDark: boolean;
  mounted: boolean;
  mobileMenuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
};

function MobileHeader({
  locale,
  t,
  isDark,
  mounted,
  mobileMenuOpen,
  onToggleTheme,
  onToggleMenu
}: MobileHeaderProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="mx-auto flex min-h-16 max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 lg:hidden"
    >
      <Logo locale={locale} />
      <div className="flex shrink-0 items-center gap-2">
        <ThemeButton isDark={isDark} mounted={mounted} t={t} onToggleTheme={onToggleTheme} />
        <button
          type="button"
          onClick={onToggleMenu}
          className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-edch-ink shadow-sm transition hover:border-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus-visible:ring-offset-slate-950"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {t.nav.menu}
        </button>
      </div>
    </nav>
  );
}

function Logo({
  locale,
  showSubtitle = false
}: {
  locale: Locale;
  showSubtitle?: boolean;
}) {
  return (
    <Link
      href={withLocalePath("/", locale)}
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
  locale,
  t,
  onToggleTheme
}: {
  isDark: boolean;
  mounted: boolean;
  joinLabel: string;
  locale: Locale;
  t: Translations;
  onToggleTheme: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <ThemeButton isDark={isDark} mounted={mounted} t={t} onToggleTheme={onToggleTheme} />
      <Link
        href={withLocalePath("/membership", locale)}
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
  t,
  onToggleTheme
}: {
  isDark: boolean;
  mounted: boolean;
  t: Translations;
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
      {mounted && isDark ? t.actions.light : t.actions.dark}
    </button>
  );
}

function NavLink({
  item,
  pathname,
  locale,
  t,
  compact = false
}: {
  item: NavItem | { labelKey: NavKey; href: string };
  pathname: string;
  locale: Locale;
  t: Translations;
  compact?: boolean;
}) {
  return (
    <Link
      href={withLocalePath(item.href, locale)}
      className={cn(
        "whitespace-nowrap rounded-full font-bold transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue focus-visible:ring-offset-2 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-offset-slate-950",
        compact ? "px-2.5 py-2 text-sm" : "px-3 py-2 text-sm",
        isActivePath(pathname, item.href)
          ? "text-edch-blue dark:text-white"
          : "text-slate-600 dark:text-slate-300"
      )}
    >
      {t.nav[item.labelKey]}
    </Link>
  );
}

type BenefitsDropdownProps = {
  id: string;
  open: boolean;
  pathname: string;
  locale: Locale;
  t: Translations;
  refObject: RefObject<HTMLDivElement>;
  panelClassName: string;
  variant: "desktop" | "tablet";
  onOpenChange: (open: boolean) => void;
};

function BenefitsDropdown({
  id,
  open,
  pathname,
  locale,
  t,
  refObject,
  panelClassName,
  variant,
  onOpenChange
}: BenefitsDropdownProps) {
  const active = isActivePath(pathname, "/benefits");

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
          active
            ? "text-edch-blue dark:text-white"
            : "text-slate-600 dark:text-slate-300"
        )}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => onOpenChange(!open)}
      >
        {t.nav.benefits}
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          id={id}
          className={cn("absolute top-full z-[60] pt-3", panelClassName)}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="rounded-2xl bg-white p-4 text-left shadow-soft ring-1 ring-blue-100 dark:bg-slate-950 dark:ring-white/10">
            <BenefitsOptions
              pathname={pathname}
              locale={locale}
              t={t}
              onNavigate={() => onOpenChange(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BenefitsOptions({
  pathname,
  locale,
  t,
  onNavigate
}: {
  pathname: string;
  locale: Locale;
  t: Translations;
  onNavigate: () => void;
}) {
  return (
    <div className="grid gap-3">
      <Link
        href={withLocalePath("/benefits", locale)}
        onClick={onNavigate}
        className={cn(
          "rounded-xl px-3 py-2 text-sm font-black transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
          isActivePath(pathname, "/benefits")
            ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
            : "text-edch-ink dark:text-white"
        )}
      >
        {t.nav.benefitsOverview}
      </Link>
      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {benefitMenuItems.map((item) => (
          <Link
            key={item.href}
            href={withLocalePath(item.href, locale)}
            onClick={onNavigate}
            className={cn(
              "rounded-xl px-3 py-2 text-sm font-bold leading-snug transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
              isActivePath(pathname, item.href)
                ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
                : "text-slate-600 dark:text-slate-300"
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

type LanguageDropdownProps = {
  id: string;
  open: boolean;
  pathname: string;
  locale: Locale;
  t: Translations;
  refObject: RefObject<HTMLDivElement>;
  panelClassName: string;
  variant: "desktop" | "tablet";
  onOpenChange: (open: boolean) => void;
};

function LanguageDropdown({
  id,
  open,
  pathname,
  locale,
  t,
  refObject,
  panelClassName,
  variant,
  onOpenChange
}: LanguageDropdownProps) {
  const active = pathname.startsWith("/en") || pathname.startsWith("/so");

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
          active
            ? "text-edch-blue dark:text-white"
            : "text-slate-600 dark:text-slate-300"
        )}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => onOpenChange(!open)}
      >
        {t.nav.language}: {locale.toUpperCase()}
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          id={id}
          className={cn("absolute top-full z-[60] pt-3", panelClassName)}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="rounded-2xl bg-white p-4 text-left shadow-soft ring-1 ring-blue-100 dark:bg-slate-950 dark:ring-white/10">
            <div className="mb-3 rounded-2xl bg-edch-sky p-3 ring-1 ring-blue-100 dark:bg-white/5 dark:ring-white/10">
              <p className="text-sm font-black text-edch-ink dark:text-white">
                {t.nav.language}
              </p>
              <p className="mt-1 text-xs font-semibold leading-5 text-slate-600 dark:text-slate-300">
                English is the main language. Somali is available with placeholder translations.
              </p>
            </div>
            <LanguageOptions
              pathname={pathname}
              locale={locale}
              onNavigate={() => onOpenChange(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function LanguageOptions({
  pathname,
  locale,
  onNavigate
}: {
  pathname: string;
  locale: Locale;
  onNavigate: () => void;
}) {
  return (
    <div className="grid gap-1">
      {locales.map((nextLocale) => (
        <Link
          key={nextLocale}
          href={switchLocalePath(pathname, nextLocale)}
          onClick={onNavigate}
          hrefLang={nextLocale}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-black transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
            locale === nextLocale
              ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
              : "text-slate-700 dark:text-slate-200"
          )}
        >
          <span>{translations[nextLocale].languageName}</span>
          <span
            className={cn(
              "rounded-full px-2 py-1 text-[0.68rem] font-black uppercase tracking-wide",
              locale === nextLocale
                ? "bg-white text-edch-blue dark:bg-white/10 dark:text-white"
                : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
            )}
          >
            {nextLocale.toUpperCase()}
          </span>
        </Link>
      ))}
    </div>
  );
}

type MoreDropdownProps = {
  id: string;
  buttonLabel: string;
  open: boolean;
  pathname: string;
  locale: Locale;
  t: Translations;
  refObject: RefObject<HTMLDivElement>;
  items: (MoreItem | MenuItem)[];
  panelClassName: string;
  variant: "desktop" | "tablet";
  onOpenChange: (open: boolean) => void;
};

function MoreDropdown({
  id,
  buttonLabel,
  open,
  pathname,
  locale,
  t,
  refObject,
  items,
  panelClassName,
  variant,
  onOpenChange
}: MoreDropdownProps) {
  const hasActiveItem = items.some((item) => isActivePath(pathname, item.href));

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
                locale={locale}
                t={t}
                items={items}
                onNavigate={() => onOpenChange(false)}
              />
            ) : (
              <TabletMorePanel
                pathname={pathname}
                locale={locale}
                t={t}
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
  locale,
  t,
  items,
  onNavigate
}: {
  pathname: string;
  locale: Locale;
  t: Translations;
  items: (MoreItem | MenuItem)[];
  onNavigate: () => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_1.25fr]">
      <div className="grid content-start gap-1">
        {items.map((item) => (
          <PanelLink
            key={item.href}
            item={item}
            pathname={pathname}
            locale={locale}
            t={t}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-blue-100 dark:bg-white/5 dark:ring-white/10">
        <p className="text-sm font-black text-edch-ink dark:text-white">
          Community links
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
          Membership, member directory, events, and donation actions are grouped here to keep the main navigation clear.
        </p>
      </div>
    </div>
  );
}

function TabletMorePanel({
  pathname,
  locale,
  t,
  items,
  onNavigate
}: {
  pathname: string;
  locale: Locale;
  t: Translations;
  items: (MoreItem | MenuItem)[];
  onNavigate: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <PanelLink
          key={item.href}
          item={item}
          pathname={pathname}
          locale={locale}
          t={t}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

function PanelLink({
  item,
  pathname,
  locale,
  t,
  onNavigate
}: {
  item: MoreItem | MenuItem;
  pathname: string;
  locale: Locale;
  t: Translations;
  onNavigate: () => void;
}) {
  const active = isActivePath(pathname, item.href);

  return (
    <Link
      href={withLocalePath(item.href, locale)}
      onClick={onNavigate}
      className={cn(
        "rounded-xl px-3 py-2 text-sm font-black transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
        active
          ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
          : "text-slate-700 dark:text-slate-200"
      )}
    >
      {getMenuLabel(item, t)}
    </Link>
  );
}

type MobileMenuProps = {
  pathname: string;
  locale: Locale;
  t: Translations;
  open: boolean;
  benefitsOpen: boolean;
  languagesOpen: boolean;
  moreOpen: boolean;
  onBenefitsToggle: () => void;
  onLanguagesToggle: () => void;
  onMoreToggle: () => void;
  onNavigate: () => void;
};

function MobileMenu({
  pathname,
  locale,
  t,
  open,
  benefitsOpen,
  languagesOpen,
  moreOpen,
  onBenefitsToggle,
  onLanguagesToggle,
  onMoreToggle,
  onNavigate
}: MobileMenuProps) {
  const benefitsActive = isActivePath(pathname, "/benefits");
  const moreActive = moreMenuItems.some((item) => isActivePath(pathname, item.href));
  if (!open) {
    return null;
  }

  return (
    <div
      id="mobile-menu"
      className="max-h-[calc(100vh-4rem)] overflow-auto overflow-x-hidden border-t border-blue-100 bg-white px-4 py-3 shadow-xl lg:hidden dark:border-white/10 dark:bg-slate-950"
    >
      <div className="mx-auto grid max-w-screen-2xl gap-1.5">
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={withLocalePath(item.href, locale)}
            onClick={onNavigate}
            className={cn(
              "rounded-xl px-3 py-2 text-sm font-bold transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
              isActivePath(pathname, item.href)
                ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
                : "text-slate-700 dark:text-slate-200"
            )}
          >
            {t.nav[item.labelKey]}
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
          <span className="whitespace-nowrap">{t.nav.benefits}</span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition", benefitsOpen && "rotate-180")}
          />
        </button>

        {benefitsOpen ? (
          <div
            id="mobile-benefits-menu"
            className="grid gap-1 rounded-2xl bg-slate-50 p-2 ring-1 ring-blue-100 dark:bg-white/5 dark:ring-white/10"
          >
            <BenefitsOptions pathname={pathname} locale={locale} t={t} onNavigate={onNavigate} />
          </div>
        ) : null}

        <button
          type="button"
          onClick={onLanguagesToggle}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-black transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
            "text-slate-700 dark:text-slate-200"
          )}
          aria-expanded={languagesOpen}
          aria-controls="mobile-languages-menu"
        >
          <span className="whitespace-nowrap">{t.nav.language}: {locale.toUpperCase()}</span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition", languagesOpen && "rotate-180")}
          />
        </button>

        {languagesOpen ? (
          <div
            id="mobile-languages-menu"
            className="grid gap-1 rounded-2xl bg-slate-50 p-2 ring-1 ring-blue-100 dark:bg-white/5 dark:ring-white/10"
          >
            <LanguageOptions pathname={pathname} locale={locale} onNavigate={onNavigate} />
          </div>
        ) : null}

        <Link
          href={withLocalePath("/contact", locale)}
          onClick={onNavigate}
          className={cn(
            "rounded-xl px-3 py-2 text-sm font-bold transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
            isActivePath(pathname, "/contact")
              ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
              : "text-slate-700 dark:text-slate-200"
          )}
        >
          {t.nav.contact}
        </Link>

        <button
          type="button"
          onClick={onMoreToggle}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-black transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:hover:bg-white/10 dark:hover:text-white",
            moreActive
              ? "bg-edch-sky text-edch-blue dark:bg-white/10 dark:text-white"
              : "text-slate-700 dark:text-slate-200"
          )}
          aria-expanded={moreOpen}
          aria-controls="mobile-more-menu"
        >
          <span className="whitespace-nowrap">{t.nav.more}</span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition", moreOpen && "rotate-180")}
          />
        </button>

        {moreOpen ? (
          <div
            id="mobile-more-menu"
            className="grid gap-1 rounded-2xl bg-slate-50 p-2 ring-1 ring-blue-100 dark:bg-white/5 dark:ring-white/10"
          >
            {moreMenuItems.map((item) => (
              <Link
                key={item.href}
                href={withLocalePath(item.href, locale)}
                onClick={onNavigate}
                className="rounded-xl px-3 py-1.5 text-sm font-bold leading-snug text-slate-600 transition hover:bg-edch-sky hover:text-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {t.more[item.labelKey]}
              </Link>
            ))}
          </div>
        ) : null}

        <Link
          href={withLocalePath("/membership", locale)}
          onClick={onNavigate}
          className="mt-1 rounded-xl bg-edch-green px-4 py-2.5 text-center text-sm font-black text-white transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-green"
        >
          {t.actions.joinCommunity}
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
