import { isCancel, log, multiselect } from "@clack/prompts";
import { formatDrugLabel } from "../formatting/drug.ts";
import { getDrugs, removeDrugs } from "../stores/drugs.ts";

export async function promptToManageDrugsStorage() {
  if (getDrugs().length === 0) {
    log.error("داروی ذخیره‌شده‌ای یافت نشد.");
    return;
  }

  const items = await multiselect({
    message: "دارو‌ها را جهت حذف انتخاب کنید",
    required: false,
    options: getDrugs()
      .map((i) => ({
        value: i,
        label: formatDrugLabel(i),
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(items) || items.length === 0) return;
  await removeDrugs(items);
}
