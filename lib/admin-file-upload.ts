"use server";

import { getVerifiedAdminClient } from "@/lib/admin-action-auth";

const RESOURCE_BUCKET = "edch-files";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function uploadResourceFile(file: File) {
  if (!file || file.size === 0) {
    return "";
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Upload failed: file must be 10MB or smaller.");
  }

  const supabase = await getVerifiedAdminClient();
  const extension = getExtension(file.name);
  const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`;
  const path = `resources/${filename}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(RESOURCE_BUCKET)
    .upload(path, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from(RESOURCE_BUCKET).getPublicUrl(path);

  return data.publicUrl;
}

function getExtension(name: string) {
  const cleanName = name.trim().toLowerCase();
  const index = cleanName.lastIndexOf(".");

  if (index === -1) return "";

  return cleanName.slice(index).replace(/[^a-z0-9.]/g, "");
}
