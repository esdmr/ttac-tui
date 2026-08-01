import { autocomplete, isCancel } from "@clack/prompts";
import type { TtacResult } from "../providers/drug-pharmacy.ts";

export async function promptToFilterByCity(
  results: readonly TtacResult[],
  oldFilter: string | undefined,
): Promise<string | undefined> {
  const options: {
    value: TtacResult | undefined;
    label: string;
  }[] = [...new Map(results.map((i) => [i.pharmacy.city, i])).values()]
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

  const selectedResult = await autocomplete({
    message: "شهر را انتخاب کنید",
    options,
  });

  if (isCancel(selectedResult)) return oldFilter;
  return selectedResult?.pharmacy.city;
}
