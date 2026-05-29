import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminLayout } from "@/components/admin/admin-layout";
import { updateAdapContent } from "@/lib/admin-adap-actions";
import { getAdminAdapContent } from "@/lib/adap-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export default async function AdminAdapPage() {
  const adap = await getAdminAdapContent();
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <AdminLayout
      title="Manage ADAP"
      description="Update the public ADAP page, homepage alert, main ADAP PDF, and translated English, Somali, and Arabic letters."
    >
      {!isSupabaseConfigured ? (
        <p className="mb-6 rounded-3xl bg-edch-mint p-5 font-bold text-edch-green">
          Demo mode: Supabase is not configured yet, so Save will not write to a database.
        </p>
      ) : null}

      <AdminFormCard
        title="ADAP information"
        description="These fields power the homepage alert and the public ADAP page."
      >
        <form action={updateAdapContent} className="grid gap-4">
          <input type="hidden" name="id" value={adap.id} />

          <label className="flex items-center gap-3 rounded-2xl border border-blue-100 px-4 py-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200">
            <input
              name="alertEnabled"
              type="checkbox"
              defaultChecked={adap.alertEnabled}
              className="h-5 w-5 rounded border-blue-100"
            />
            Show homepage ADAP alert
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField name="alertTitle" label="Homepage alert title" value={adap.alertTitle} />
            <TextField name="pageTitle" label="ADAP page title" value={adap.pageTitle} />
          </div>

          <TextareaField
            name="alertMessage"
            label="Homepage alert message"
            value={adap.alertMessage}
            rows={3}
          />
          <TextareaField
            name="pageSummary"
            label="ADAP page summary"
            value={adap.pageSummary}
            rows={4}
          />
          <TextareaField
            name="eligibility"
            label="Eligibility and guidance notes"
            value={adap.eligibility}
            rows={5}
          />
          <TextareaField
            name="applicationSteps"
            label="Application steps"
            value={adap.applicationSteps}
            rows={6}
            help="Put each step on its own line."
          />
          <TextareaField
            name="documentChecklist"
            label="Document checklist"
            value={adap.documentChecklist}
            rows={6}
            help="Put each checklist item on its own line."
          />

          <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-blue-100 dark:bg-white/5 dark:ring-white/10">
            <h2 className="text-lg font-black text-edch-ink dark:text-white">
              ADAP PDFs and translated letters
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
              Uploading a new file replaces the saved URL for that document. PDFs are recommended.
            </p>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <UploadField
                label="Main ADAP PDF"
                urlName="mainPdfUrl"
                fileName="mainPdfFile"
                value={adap.mainPdfUrl}
              />
              <UploadField
                label="English letter PDF"
                urlName="englishLetterUrl"
                fileName="englishLetterFile"
                value={adap.englishLetterUrl}
              />
              <UploadField
                label="Somali translated letter PDF"
                urlName="somaliLetterUrl"
                fileName="somaliLetterFile"
                value={adap.somaliLetterUrl}
              />
              <UploadField
                label="Arabic translated letter PDF"
                urlName="arabicLetterUrl"
                fileName="arabicLetterFile"
                value={adap.arabicLetterUrl}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="rounded-full bg-edch-blue px-6 py-3 font-black text-white transition hover:bg-blue-800">
              Save ADAP Updates
            </button>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Last updated: {adap.updatedAt}
            </p>
          </div>
        </form>
      </AdminFormCard>
    </AdminLayout>
  );
}

function TextField({
  name,
  label,
  value
}: {
  name: string;
  label: string;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
      {label}
      <input
        name={name}
        defaultValue={value}
        className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
      />
    </label>
  );
}

function TextareaField({
  name,
  label,
  value,
  rows,
  help
}: {
  name: string;
  label: string;
  value: string;
  rows: number;
  help?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
      {label}
      <textarea
        name={name}
        rows={rows}
        defaultValue={value}
        className="resize-y rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
      />
      {help ? (
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {help}
        </span>
      ) : null}
    </label>
  );
}

function UploadField({
  label,
  urlName,
  fileName,
  value
}: {
  label: string;
  urlName: string;
  fileName: string;
  value: string;
}) {
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-blue-100 dark:bg-slate-950 dark:ring-white/10">
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        {label} URL
        <input
          name={urlName}
          type="url"
          defaultValue={value}
          placeholder="https://..."
          className="rounded-2xl border border-blue-100 px-4 py-3 text-edch-ink dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        Upload replacement
        <input
          name={fileName}
          type="file"
          accept=".pdf,application/pdf"
          className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-edch-ink file:mr-4 file:rounded-full file:border-0 file:bg-edch-mint file:px-4 file:py-2 file:font-black file:text-edch-green dark:border-white/10 dark:bg-slate-950 dark:text-white"
        />
      </label>
      {value ? (
        <a
          href={value}
          className="text-sm font-black text-edch-blue underline underline-offset-4 dark:text-emerald-300"
        >
          View current file
        </a>
      ) : (
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          No file uploaded yet.
        </p>
      )}
    </div>
  );
}
