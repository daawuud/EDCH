"use server";

import { revalidatePath } from "next/cache";
import { getVerifiedAdminClient } from "@/lib/admin-action-auth";
import { uploadAdapFile } from "@/lib/admin-file-upload";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function updateAdapContent(formData: FormData) {
  if (!hasSupabaseEnv()) {
    revalidateAdapPaths();
    return;
  }

  const supabase = await getVerifiedAdminClient();
  const id = getText(formData, "id");
  const uploads = await getAdapUploads(formData);

  const values = {
    alert_enabled: formData.get("alertEnabled") === "on",
    alert_title: getText(formData, "alertTitle"),
    alert_message: getText(formData, "alertMessage"),
    page_title: getText(formData, "pageTitle"),
    page_summary: getText(formData, "pageSummary"),
    eligibility: getText(formData, "eligibility"),
    application_steps: getText(formData, "applicationSteps"),
    document_checklist: getText(formData, "documentChecklist"),
    main_pdf_url: uploads.mainPdfUrl || getText(formData, "mainPdfUrl"),
    english_letter_url:
      uploads.englishLetterUrl || getText(formData, "englishLetterUrl"),
    somali_letter_url:
      uploads.somaliLetterUrl || getText(formData, "somaliLetterUrl"),
    arabic_letter_url:
      uploads.arabicLetterUrl || getText(formData, "arabicLetterUrl")
  };

  const { error } = id
    ? await supabase.from("adap_content").update(values).eq("id", id)
    : await supabase.from("adap_content").insert(values);

  if (error) throw new Error(`Error updating ADAP content: ${error.message}`);

  revalidateAdapPaths();
}

function revalidateAdapPaths() {
  revalidatePath("/");
  revalidatePath("/adap");
  revalidatePath("/benefits");
  revalidatePath("/benefits/adap-transition");
  revalidatePath("/admin/adap");
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function getAdapUploads(formData: FormData) {
  const uploadFields = [
    ["mainPdfFile", "mainPdfUrl"],
    ["englishLetterFile", "englishLetterUrl"],
    ["somaliLetterFile", "somaliLetterUrl"],
    ["arabicLetterFile", "arabicLetterUrl"]
  ] as const;

  const urls = {
    mainPdfUrl: "",
    englishLetterUrl: "",
    somaliLetterUrl: "",
    arabicLetterUrl: ""
  };

  for (const [fieldName, urlKey] of uploadFields) {
    const file = formData.get(fieldName);

    if (file instanceof File && file.size > 0) {
      urls[urlKey] = await uploadAdapFile(file);
    }
  }

  return urls;
}
