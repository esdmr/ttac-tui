import { autocomplete, isCancel } from "@clack/prompts";
import { formatLocation } from "../formatting/location.ts";
import { getCities } from "../stores/cities.ts";
import type { LocationToSave } from "./location-save.ts";

export async function promptForLocationByCity(): Promise<
  LocationToSave | undefined
> {
  const selectedCity = await autocomplete({
    message: "شهر را انتخاب کنید",
    options: getCities()
      .map((i) => ({
        value: i,
        label: formatLocation(i),
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(selectedCity)) return undefined;

  return selectedCity;
}
