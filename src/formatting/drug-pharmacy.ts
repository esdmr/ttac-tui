export function formatDrugPharmacyBatchName(file: string) {
  return file.replace(/^\/tmp\/ttac\./, "").replace(/\.json$/, "");
}
