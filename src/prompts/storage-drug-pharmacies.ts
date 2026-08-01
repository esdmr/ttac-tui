import { isCancel, log, multiselect } from "@clack/prompts";
import { formatDrugPharmacyBatchName } from "../formatting/drug-pharmacy.ts";
import {
  listDrugPharmacyBatches,
  removeDrugPharmacyBatches,
} from "../stores/drug-pharmacies.ts";

export async function promptToManageDrugPharmaciesStorage() {
  if (listDrugPharmacyBatches().length === 0) {
    log.error("نتیجه قدیمی ذخیره‌شده‌ای یافت نشد.");
    return;
  }

  const items = await multiselect({
    message: "نتایج قدیمی را جهت حذف انتخاب کنید",
    required: false,
    options: listDrugPharmacyBatches()
      .map((i) => ({
        value: i,
        label: formatDrugPharmacyBatchName(i),
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(items) || items.length === 0) return;
  await removeDrugPharmacyBatches(items);
}
