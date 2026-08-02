import { autocomplete, isCancel } from "@clack/prompts";
import { formatPharmacyLocation } from "../formatting/pharmacy.ts";
import type { TtacDrugPharmacy } from "../providers/drug-pharmacy.ts";

export async function promptToFilterByCity(
  drugPharmacies: readonly TtacDrugPharmacy[],
  oldFilter: string | undefined,
): Promise<string | undefined> {
  const options: {
    value: string | undefined;
    label: string;
  }[] = [...new Map(drugPharmacies.map((i) => [i.pharmacy.city, i])).values()]
    .map((i) => ({
      value: i.pharmacy.city,
      label: formatPharmacyLocation(i.pharmacy),
    }))
    .toSorted((a, b) => a.label.localeCompare(b.label, "fa"));

  if (oldFilter !== undefined) {
    options.unshift({
      value: undefined,
      label: "هیچکدام",
    });
  }

  const selectedCity = await autocomplete({
    message: "شهر را انتخاب کنید",
    options,
  });

  if (isCancel(selectedCity)) return oldFilter;
  return selectedCity;
}
