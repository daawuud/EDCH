import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { getPublicAdapContent } from "@/lib/adap-data";

const languageLetters = [
  { key: "englishLetterUrl", language: "English", label: "English support letter" },
  { key: "somaliLetterUrl", language: "Somali", label: "Somali translated letter" },
  { key: "arabicLetterUrl", language: "Arabic", label: "Arabic translated letter" }
] as const;

export default async function AdapPage() {
  const adap = await getPublicAdapContent();
  const checklist = toLines(adap.documentChecklist);
  const steps = toLines(adap.applicationSteps);

  return (
    <main>
      <PageHero
        eyebrow="Alberta Program"
        title={adap.pageTitle}
        description={adap.pageSummary}
        variant="cards"
        primary={{ href: "/contact", label: "Ask EDCH for Help" }}
        secondary={{ href: "#adap-documents", label: "View Documents" }}
        cards={[
          {
            title: "Plain-language guidance",
            description: "Understand what to ask before applying or contacting official program staff."
          },
          {
            title: "Translated letters",
            description: "Download English, Somali, and Arabic support letters when they are available."
          },
          {
            title: "Document checklist",
            description: "Prepare identification, health documents, and other common paperwork."
          },
          {
            title: "Community support",
            description: "Connect with EDCH for navigation help and culturally aware support."
          }
        ]}
      />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeader
              eyebrow="Eligibility notes"
              title="Start with clear questions"
              description={adap.eligibility}
            />
          </div>
          <div className="grid gap-5">
            <InfoBox title="Common next steps" items={steps} />
            <InfoBox title="Document checklist" items={checklist} tone="green" />
          </div>
        </div>
      </section>

      <section
        id="adap-documents"
        className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Document upload area"
            title="Download ADAP information and translated letters"
            description="EDCH admins can upload the main ADAP information PDF and translated letters from the dashboard. Community members can open or download the latest files here."
            align="center"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            <DocumentCard
              title="ADAP information PDF"
              description="Main ADAP guide, checklist, or information package uploaded by EDCH."
              href={adap.mainPdfUrl}
              action="Open ADAP PDF"
              highlighted
            />
            {languageLetters.map((letter) => (
              <DocumentCard
                key={letter.key}
                title={letter.label}
                description={`${letter.language} letter for families, service providers, or support conversations.`}
                href={adap[letter.key]}
                action={`Open ${letter.language} PDF`}
              />
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
            <h2 className="text-xl font-black text-edch-ink dark:text-white">
              Need help preparing documents?
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-600 dark:text-slate-300">
              Contact EDCH before sharing personal documents online. We can help
              you understand what may be needed, what questions to ask, and how
              to prepare safely for an appointment or application.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-full bg-edch-green px-6 py-3 font-black text-white transition hover:bg-green-700"
            >
              Contact EDCH
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoBox({
  title,
  items,
  tone = "blue"
}: {
  title: string;
  items: string[];
  tone?: "blue" | "green";
}) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10">
      <h2 className="text-xl font-black text-edch-ink dark:text-white">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-slate-600 dark:text-slate-300">
            <span
              aria-hidden="true"
              className={
                tone === "green"
                  ? "mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-edch-green"
                  : "mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-edch-blue"
              }
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function DocumentCard({
  title,
  description,
  href,
  action,
  highlighted = false
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  highlighted?: boolean;
}) {
  return (
    <article
      className={
        highlighted
          ? "rounded-3xl bg-edch-blue p-6 text-white shadow-soft"
          : "rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blue-100 dark:bg-white/10 dark:ring-white/10"
      }
    >
      <p
        className={
          highlighted
            ? "text-xs font-black uppercase tracking-[0.16em] text-emerald-100"
            : "text-xs font-black uppercase tracking-[0.16em] text-edch-green"
        }
      >
        PDF
      </p>
      <h2 className={highlighted ? "mt-3 text-xl font-black" : "mt-3 text-xl font-black text-edch-ink dark:text-white"}>
        {title}
      </h2>
      <p className={highlighted ? "mt-3 leading-7 text-blue-50" : "mt-3 leading-7 text-slate-600 dark:text-slate-300"}>
        {description}
      </p>
      {href ? (
        <Link
          href={href}
          className={
            highlighted
              ? "mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-edch-blue transition hover:bg-edch-mint"
              : "mt-5 inline-flex rounded-full bg-edch-blue px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
          }
        >
          {action}
        </Link>
      ) : (
        <p
          className={
            highlighted
              ? "mt-5 rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white"
              : "mt-5 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600 dark:bg-white/10 dark:text-slate-300"
          }
        >
          Upload pending
        </p>
      )}
    </article>
  );
}

function toLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
