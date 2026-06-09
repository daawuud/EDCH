"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type AccessibilityProfile = "calm" | "lowVision" | "reading" | "keyboard" | "screenReader";

type Settings = {
  highContrast: boolean;
  largeText: boolean;
  readableFont: boolean;
  reduceMotion: boolean;
  focusGuide: boolean;
  simplifiedNav: boolean;
};

type PageInsight = {
  title: string;
  summary: string;
  headings: string[];
  links: Array<{ label: string; href: string }>;
};

const storageKey = "edch-accessibility-assistant";

const defaultSettings: Settings = {
  highContrast: false,
  largeText: false,
  readableFont: false,
  reduceMotion: false,
  focusGuide: false,
  simplifiedNav: false
};

const profiles: Record<
  AccessibilityProfile,
  {
    label: string;
    description: string;
    settings: Settings;
  }
> = {
  calm: {
    label: "Calm",
    description: "Softens motion and keeps the current layout familiar.",
    settings: { ...defaultSettings, reduceMotion: true }
  },
  lowVision: {
    label: "Low vision",
    description: "Boosts contrast, text size, and focus outlines.",
    settings: {
      ...defaultSettings,
      highContrast: true,
      largeText: true,
      focusGuide: true
    }
  },
  reading: {
    label: "Reading support",
    description: "Uses a more readable type style with larger text.",
    settings: {
      ...defaultSettings,
      largeText: true,
      readableFont: true,
      reduceMotion: true
    }
  },
  keyboard: {
    label: "Keyboard navigation",
    description: "Highlights focus and opens a simplified page menu.",
    settings: {
      ...defaultSettings,
      focusGuide: true,
      simplifiedNav: true,
      reduceMotion: true
    }
  },
  screenReader: {
    label: "Listen",
    description: "Prioritizes page summary, reading controls, and quick links.",
    settings: {
      ...defaultSettings,
      focusGuide: true,
      simplifiedNav: true
    }
  }
};

function getStoredSettings() {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function getPageInsight(): PageInsight {
  const main = document.querySelector("main") ?? document.body;
  const title =
    document.querySelector("h1")?.textContent?.trim() ||
    document.title.replace("EDCH | ", "") ||
    "Current page";
  const headings = Array.from(main.querySelectorAll("h1, h2, h3"))
    .map((heading) => heading.textContent?.trim() ?? "")
    .filter(Boolean)
    .slice(0, 8);
  const links = Array.from(main.querySelectorAll<HTMLAnchorElement>("a[href]"))
    .map((link) => ({
      label: link.textContent?.replace(/\s+/g, " ").trim() || "Open link",
      href: link.href
    }))
    .filter((link, index, allLinks) => {
      const firstIndex = allLinks.findIndex((candidate) => candidate.href === link.href);
      return link.label.length > 2 && firstIndex === index;
    })
    .slice(0, 6);
  const paragraphs = Array.from(main.querySelectorAll("p, li"))
    .map((node) => node.textContent?.replace(/\s+/g, " ").trim() ?? "")
    .filter((text) => text.length > 40)
    .slice(0, 3);

  return {
    title,
    headings,
    links,
    summary:
      paragraphs.join(" ").slice(0, 360) ||
      "This page contains EDCH community information, services, resources, and ways to connect."
  };
}

function getTextToRead(insight: PageInsight) {
  const selectedText = window.getSelection()?.toString().trim();

  if (selectedText) {
    return selectedText;
  }

  return [insight.title, insight.summary, ...insight.headings.slice(0, 5)].join(". ");
}

function inferProfile(settings: Settings): AccessibilityProfile {
  if (settings.highContrast || settings.largeText) {
    return "lowVision";
  }

  if (settings.readableFont) {
    return "reading";
  }

  if (settings.simplifiedNav) {
    return "keyboard";
  }

  return "calm";
}

export function AccessibilityAssistant() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [insight, setInsight] = useState<PageInsight>({
    title: "Current page",
    summary: "",
    headings: [],
    links: []
  });
  const [isReading, setIsReading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const recommendedProfile = useMemo(() => {
    if (settings.highContrast || settings.largeText || settings.readableFont || settings.simplifiedNav) {
      return inferProfile(settings);
    }

    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return "calm";
      }

      if (window.matchMedia("(prefers-contrast: more)").matches) {
        return "lowVision";
      }
    }

    return "keyboard";
  }, [settings]);

  useEffect(() => {
    setMounted(true);
    setSettings(getStoredSettings());
  }, []);

  useEffect(() => {
    const nextInsight = getPageInsight();
    setInsight(nextInsight);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle("a11y-high-contrast", settings.highContrast);
    root.classList.toggle("a11y-large-text", settings.largeText);
    root.classList.toggle("a11y-readable-font", settings.readableFont);
    root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
    root.classList.toggle("a11y-focus-guide", settings.focusGuide);
    root.classList.toggle("a11y-simplified-nav", settings.simplifiedNav);
    window.localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [mounted, settings]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function updateSetting(key: keyof Settings) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  function applyProfile(profile: AccessibilityProfile) {
    setSettings(profiles[profile].settings);
  }

  function readPage() {
    if (!("speechSynthesis" in window)) {
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(getTextToRead(insight));
    utterance.rate = settings.readableFont || settings.largeText ? 0.88 : 0.95;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  }

  if (!mounted) {
    return null;
  }

  return (
    <aside
      aria-label="AI accessibility assistant"
      className="fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3"
    >
      {open ? (
        <div className="w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-white/10 dark:bg-slate-950">
          <div className="border-b border-slate-200 bg-edch-ink p-4 text-white dark:border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-edch-sky">
                  Adaptive access
                </p>
                <h2 className="mt-1 text-lg font-black">AI display and navigation</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 px-3 py-1 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Close
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-blue-50">
              Suggested: {profiles[recommendedProfile].label}. The assistant adapts this page on
              your device and keeps your choices private.
            </p>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-4">
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(profiles) as AccessibilityProfile[]).map((profile) => (
                <button
                  key={profile}
                  type="button"
                  onClick={() => applyProfile(profile)}
                  className={cn(
                    "rounded-lg border p-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue",
                    recommendedProfile === profile
                      ? "border-edch-blue bg-edch-sky text-edch-ink"
                      : "border-slate-200 bg-white text-slate-800 hover:border-edch-blue dark:border-white/10 dark:bg-white/5 dark:text-white"
                  )}
                >
                  <span className="block text-sm font-black">{profiles[profile].label}</span>
                  <span className="mt-1 block text-xs leading-5 opacity-80">
                    {profiles[profile].description}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-2">
              <ToggleRow
                label="Higher contrast"
                active={settings.highContrast}
                onClick={() => updateSetting("highContrast")}
              />
              <ToggleRow
                label="Larger text"
                active={settings.largeText}
                onClick={() => updateSetting("largeText")}
              />
              <ToggleRow
                label="Readable font"
                active={settings.readableFont}
                onClick={() => updateSetting("readableFont")}
              />
              <ToggleRow
                label="Reduce motion"
                active={settings.reduceMotion}
                onClick={() => updateSetting("reduceMotion")}
              />
              <ToggleRow
                label="Focus guide"
                active={settings.focusGuide}
                onClick={() => updateSetting("focusGuide")}
              />
              <ToggleRow
                label="Simplified navigation"
                active={settings.simplifiedNav}
                onClick={() => updateSetting("simplifiedNav")}
              />
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-black text-edch-ink dark:text-white">
                  Page guide
                </h3>
                <button
                  type="button"
                  onClick={readPage}
                  className="rounded-full bg-edch-green px-4 py-2 text-sm font-black text-white transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-green focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                >
                  {isReading ? "Stop" : "Read aloud"}
                </button>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {insight.summary}
              </p>
              {insight.headings.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {insight.headings.slice(0, 5).map((heading) => (
                    <span
                      key={heading}
                      className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-white/10"
                    >
                      {heading}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {settings.simplifiedNav && insight.links.length > 0 ? (
              <nav
                aria-label="Simplified page navigation"
                className="mt-4 grid gap-2 rounded-lg border border-slate-200 p-3 dark:border-white/10"
              >
                {insight.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-bold text-edch-blue transition hover:bg-edch-sky focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:text-blue-200 dark:hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/25 transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-edch-green focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
        aria-expanded={open}
      >
        Accessibility
      </button>
    </aside>
  );
}

function ToggleRow({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-800 transition hover:border-edch-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-edch-blue dark:border-white/10 dark:bg-white/5 dark:text-white"
      aria-pressed={active}
    >
      <span>{label}</span>
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition",
          active ? "bg-edch-green" : "bg-slate-300 dark:bg-slate-700"
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-white transition",
            active ? "left-6" : "left-1"
          )}
        />
      </span>
    </button>
  );
}
