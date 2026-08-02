import { isCancel, log, multiselect } from "@clack/prompts";
import { UnreachableError } from "../error.ts";
import { formatDrugPharmacyBatchName } from "../formatting/drug-pharmacy.ts";
import { formatDrugLabel } from "../formatting/drug.ts";
import {
  fetchTtacDrugPharmacies,
} from "../providers/drug-pharmacy.ts";
import { SEARCH_MODES } from '../types/drug-pharmacy-option.ts';
import { type TtacDrugPharmacy } from '../types/drug-pharmacy.ts';
import { type TtacDrug } from '../types/drug.ts';
import { spin } from "../spinner.ts";
import { setDrugPharmacyBatch } from "../stores/drug-pharmacies.ts";
import { appendDrugs, getDrugs } from "../stores/drugs.ts";
import { promptForLocation } from "./location.ts";
import { searchForDrug } from "./search-drug.ts";

export async function promptToSearch(index: number) {
  let oldSelection: TtacDrug[] = [];

  while (true) {
    const drugs = getDrugs();

    const selectedDrugs = await multiselect<TtacDrug | "new-drug">({
      message: "دارو‌ها را انتخاب کنید",
      options: [
        ...drugs
          .map((i) => ({
            value: i,
            label: formatDrugLabel(i),
          }))
          .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
        {
          value: "new-drug",
          label: "داروی جدید",
        },
      ],
      initialValues: oldSelection,
    });

    if (isCancel(selectedDrugs)) {
      return [];
    }

    if (selectedDrugs.includes("new-drug")) {
      oldSelection = selectedDrugs.filter((i) => typeof i !== "string");

      const newDrug = await searchForDrug();

      if (newDrug) {
        await appendDrugs([newDrug]);
        oldSelection.push(newDrug);
      }

      continue;
    }

    const loc = await promptForLocation();
    if (!loc) continue;

    const drugPharmacies: TtacDrugPharmacy[] = [];

    for (const i of selectedDrugs) {
      if (typeof i !== "object") {
        throw new UnreachableError(
          `گزینه‌ غیر‌دارو‌ای در منو انتخاب شده ولی روی آن پردازش جدا انجام نشده: ${JSON.stringify(
            i,
          )}`,
        );
      }

      const items = await spin(`درحال بارگذاری «${i.faBrandName}»`, async () =>
        fetchTtacDrugPharmacies({
          drugIrc: i.irc,
          drugIndexId: i.drugIndexId,
          pageNumber: 1,
          pageSize: 50,
          strict: true,
          searchMode: SEARCH_MODES.ORDER_BY_DISTANCE.value,
          latitude: loc.latitude,
          longitude: loc.longitude,
        }),
      );

      if (items.length === 0) continue;

      const fileName = `/tmp/ttac.${index}.${items[0].faBrandName.toLowerCase().replaceAll(/\P{L}+/gu, "-")}.json`;

      await setDrugPharmacyBatch(fileName, items);

      log.message(
        `نتیجه ${items[0].faBrandName} به ${formatDrugPharmacyBatchName(fileName)} نوشته شد.`,
      );

      index++;
      drugPharmacies.push(...items);
    }

    return drugPharmacies;
  }
}
