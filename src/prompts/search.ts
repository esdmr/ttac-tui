import { isCancel, log, multiselect } from "@clack/prompts";
import { formatDrugPharmacyBatchName } from "../formatting/drug-pharmacy.ts";
import {
  fetchTtacDrugPharmacies,
  SEARCH_MODES,
  type TtacDrug,
  type TtacDrugPharmacy,
} from "../providers/drug-pharmacy.ts";
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
            label: i.faBrandName,
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

    const { lat, lng } = await promptForLocation();

    const drugPharmacies: TtacDrugPharmacy[] = [];

    for (const i of selectedDrugs) {
      if (typeof i !== "object") throw new TypeError("Unreachable");

      const items = await spin(`درحال بارگذاری ${i.faBrandName}`, async () =>
        fetchTtacDrugPharmacies({
          drugIrc: i.irc,
          drugIndexId: i.drugIndexId,
          pageNumber: 1,
          pageSize: 50,
          strict: true,
          searchMode: SEARCH_MODES.ORDER_BY_DISTANCE.value,
          latitude: lat,
          longitude: lng,
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
