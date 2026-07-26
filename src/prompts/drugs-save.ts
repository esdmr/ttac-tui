import { isCancel, multiselect } from "@clack/prompts";
import type { TtacResult } from "../providers/drug-pharmacy.ts";
import { appendDrugs, getDrugs } from "../stores/drugs.ts";

export async function promptToSaveDrugs(results: readonly TtacResult[]) {
  const oldDrugs = getDrugs();

  const newDrugs = [...new Map(results.map((i) => [i.irc, i])).values()]
    .filter(
      (i) =>
        !oldDrugs.some(
          (j) => j.irc === i.irc && j.drugIndexId === i.drugIndexId,
        ),
    )
    .sort((a, b) => a.faBrandName.localeCompare(b.faBrandName));

  const selectedDrugsToSave =
    newDrugs.length > 0
      ? await multiselect({
          message: "دارو‌های جدید را برای ذخیره انتخاب کنید",
          options: newDrugs.map((i) => ({
            value: i,
            label: i.faBrandName,
          })),
          required: false,
        })
      : [];

  if (isCancel(selectedDrugsToSave)) return;

  if (selectedDrugsToSave.length > 0) {
    await appendDrugs(selectedDrugsToSave);
  }
}
