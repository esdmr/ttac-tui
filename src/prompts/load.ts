import { isCancel, multiselect } from "@clack/prompts";
import { formatDrugPharmacyBatchName } from "../formatting/drug-pharmacy.ts";
import { getDrugPharmacyBatch } from "../stores/drug-pharmacies.ts";

export async function promptToLoad(files: readonly string[]) {
  const selectedFiles = await multiselect({
    message: "فایل‌ها را انتخاب کنید",
    options: files
      .map((i) => ({
        value: i,
        label: formatDrugPharmacyBatchName(i),
      }))
      .toSorted(
        (a, b) =>
          +a.label.split(".", 1)[0] - +b.label.split(".", 1)[0] ||
          a.label.localeCompare(b.label, "fa"),
      ),
  });

  if (isCancel(selectedFiles)) {
    return [];
  }

  const drugPharmacies = [];

  for (const i of selectedFiles) {
    drugPharmacies.push(...(await getDrugPharmacyBatch(i)));
  }

  return drugPharmacies;
}
