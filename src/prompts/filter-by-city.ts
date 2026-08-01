import { autocomplete, isCancel } from "@clack/prompts";
import type { TtacDrugPharmacy } from "../providers/drug-pharmacy.ts";

export async function promptToFilterByCity(
  drugPharmacies: readonly TtacDrugPharmacy[],
  oldFilter: string | undefined,
): Promise<string | undefined> {
  const options: {
    value: TtacDrugPharmacy | undefined;
    label: string;
  }[] = [...new Map(drugPharmacies.map((i) => [i.pharmacy.city, i])).values()]
    .map((i) => ({
      value: i,
      label: `${i.pharmacy.city} - ${i.pharmacy.province}`,
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
  return selectedCity?.pharmacy.city;
}
