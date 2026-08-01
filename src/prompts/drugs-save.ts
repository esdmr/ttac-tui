import { isCancel, multiselect } from "@clack/prompts";
import type { TtacDrugPharmacy } from "../providers/drug-pharmacy.ts";
import { appendDrugs, getDrugs } from "../stores/drugs.ts";

export async function promptToSaveDrugs(
  drugPharmacies: readonly TtacDrugPharmacy[],
) {
  const oldDrugs = getDrugs();

  const newDrugs = [
    ...new Map(drugPharmacies.map((i) => [i.irc, i])).values(),
  ].filter(
    (i) =>
      !oldDrugs.some((j) => j.irc === i.irc && j.drugIndexId === i.drugIndexId),
  );

  const selectedDrugsToSave =
    newDrugs.length > 0
      ? await multiselect({
          message: "دارو‌های جدید را برای ذخیره انتخاب کنید",
          options: newDrugs
            .map((i) => ({
              value: i,
              label: i.faBrandName,
            }))
            .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
          required: false,
        })
      : [];

  if (isCancel(selectedDrugsToSave)) return;

  if (selectedDrugsToSave.length > 0) {
    await appendDrugs(selectedDrugsToSave);
  }
}
