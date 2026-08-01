import { autocomplete, isCancel } from "@clack/prompts";
import { dmsStringToDecimal } from "../formatting/coordinate.ts";
import { getCities } from "../stores/cities.ts";
import type { LocationToSave } from "./location-save.ts";

export async function promptForLocationByCity(): Promise<LocationToSave> {
  const selectedCity = await autocomplete({
    message: "شهر را انتخاب کنید",
    options: getCities()
      .map((i) => ({
        value: i,
        label: `${i.city} - ${i.province}`,
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(selectedCity)) {
    throw new Error("باید یک موقعیت انتخاب کنید");
  }

  return {
    name: `${selectedCity.city} - ${selectedCity.province}`,
    lat: dmsStringToDecimal(selectedCity.latitude),
    lng: dmsStringToDecimal(selectedCity.longitude),
  };
}
