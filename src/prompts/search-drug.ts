import { isCancel, log, select, text } from "@clack/prompts";
import { formatDrugLabel } from "../formatting/drug.ts";
import { fetchTtacDrug } from "../providers/drug.ts";
import { spin } from "../spinner.ts";

export async function searchForDrug() {
  while (true) {
    const term = await text({
      message: "نام دارو",
    });

    if (isCancel(term)) return undefined;

    const drugs = await spin("درحال دریافت لیست دارو", async () =>
      fetchTtacDrug({
        term,
        pageNumber: 1,
        pageSize: 25,
      }),
    );

    if (drugs.length === 0) {
      log.warn(`جستجو برای «${term}» نتیجه‌ای نداشت.`);
      continue;
    }

    const selectedDrug = await select({
      message: "داروی موردنظر را انتخاب کنید",
      options: drugs
        .map((i) => ({
          value: i,
          label: formatDrugLabel(i),
        }))
        .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
    });

    if (isCancel(selectedDrug)) continue;

    return selectedDrug;
  }
}
