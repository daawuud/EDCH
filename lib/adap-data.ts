import { unstable_noStore as noStore } from "next/cache";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdapContent = {
  id: string;
  alertEnabled: boolean;
  alertTitle: string;
  alertMessage: string;
  pageTitle: string;
  pageSummary: string;
  eligibility: string;
  applicationSteps: string;
  documentChecklist: string;
  mainPdfUrl: string;
  englishLetterUrl: string;
  somaliLetterUrl: string;
  arabicLetterUrl: string;
  updatedAt: string;
};

export const fallbackAdapContent: AdapContent = {
  id: "demo-adap",
  alertEnabled: true,
  alertTitle: "ADAP support is available through EDCH",
  alertMessage:
    "Find plain-language ADAP information, document checklists, and translated support letters in English, Somali, and Arabic.",
  pageTitle: "ADAP information and document support",
  pageSummary:
    "EDCH helps community members understand ADAP and disability support pathways, prepare documents, and access translated letters for family or service conversations.",
  eligibility:
    "ADAP and related disability supports may depend on disability needs, residency, income, equipment requirements, health documentation, and program-specific rules. EDCH can help families prepare questions before contacting official program staff.",
  applicationSteps:
    "Review the program information.\nGather identification and health documents.\nAsk a doctor, therapist, or service provider what documentation is needed.\nUse the translated support letters when language access is helpful.\nContact EDCH if you need help understanding next steps.",
  documentChecklist:
    "Government ID or immigration documents\nAlberta Health Care card\nMedical or therapy notes when available\nProof of address\nIncome or benefit information if requested\nExisting equipment, prescription, or assessment details",
  mainPdfUrl: "",
  englishLetterUrl: "",
  somaliLetterUrl: "",
  arabicLetterUrl: "",
  updatedAt: "Demo content"
};

export async function getPublicAdapContent(): Promise<AdapContent> {
  noStore();

  if (!hasSupabaseEnv()) {
    return fallbackAdapContent;
  }

  return getAdapContentFromSupabase();
}

export async function getAdminAdapContent(): Promise<AdapContent> {
  noStore();

  if (!hasSupabaseEnv()) {
    return fallbackAdapContent;
  }

  return getAdapContentFromSupabase();
}

async function getAdapContentFromSupabase() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("adap_content")
      .select(
        "id, alert_enabled, alert_title, alert_message, page_title, page_summary, eligibility, application_steps, document_checklist, main_pdf_url, english_letter_url, somali_letter_url, arabic_letter_url, updated_at"
      )
      .order("created_at")
      .limit(1)
      .maybeSingle();

    if (error || !data) return { ...fallbackAdapContent, id: "" };

    return {
      id: data.id ?? fallbackAdapContent.id,
      alertEnabled: Boolean(data.alert_enabled),
      alertTitle: data.alert_title ?? fallbackAdapContent.alertTitle,
      alertMessage: data.alert_message ?? fallbackAdapContent.alertMessage,
      pageTitle: data.page_title ?? fallbackAdapContent.pageTitle,
      pageSummary: data.page_summary ?? fallbackAdapContent.pageSummary,
      eligibility: data.eligibility ?? fallbackAdapContent.eligibility,
      applicationSteps: data.application_steps ?? fallbackAdapContent.applicationSteps,
      documentChecklist: data.document_checklist ?? fallbackAdapContent.documentChecklist,
      mainPdfUrl: data.main_pdf_url ?? "",
      englishLetterUrl: data.english_letter_url ?? "",
      somaliLetterUrl: data.somali_letter_url ?? "",
      arabicLetterUrl: data.arabic_letter_url ?? "",
      updatedAt: formatDate(data.updated_at)
    };
  } catch {
    return fallbackAdapContent;
  }
}

function formatDate(value: string | null) {
  if (!value) return "Not updated";

  return new Intl.DateTimeFormat("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}
