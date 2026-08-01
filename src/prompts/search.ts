import { isCancel, log, multiselect, spinner } from "@clack/prompts";
import { formatDrugPharmacyBatchName } from "../formatting/drug-pharmacy.ts";
import {
  callTtac,
  SEARCH_MODES,
  type TtacDrugPharmacy,
} from "../providers/drug-pharmacy.ts";
import { getDrugs } from "../stores/drugs.ts";
import { setDrugPharmacyBatch } from "../stores/drug-pharmacies.ts";
import { promptForLocation } from "./location.ts";

export async function promptToSearch(index: number) {
  const drugs = getDrugs();

  const selectedDrugs = await multiselect({
    message: "دارو‌ها را انتخاب کنید",
    options: drugs
      .map((i) => ({
        value: i,
        label: i.faBrandName,
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(selectedDrugs)) {
    return [];
  }

  const { lat, lng } = await promptForLocation();

  const drugPharmacies: TtacDrugPharmacy[] = [];

  const s = spinner();

  for (const i of selectedDrugs) {
    s.start(`درحال بارگذاری ${i.faBrandName}`);

    // oxlint-disable-next-line init-declarations
    let items;

    try {
      items = await callTtac({
        drugIrc: i.irc,
        drugIndexId: i.drugIndexId,
        pageNumber: 1,
        pageSize: 50,
        strict: true,
        searchMode: SEARCH_MODES.ORDER_BY_DISTANCE.value,
        latitude: lat,
        longitude: lng,
      });
    } finally {
      s.stop();
    }

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
