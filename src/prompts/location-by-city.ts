import { autocomplete, isCancel } from "@clack/prompts";
import { UnreachableError } from "../error.ts";
import { dmsStringToDecimal } from "../formatting/coordinate.ts";
import { formatPharmacyLocation } from "../formatting/pharmacy.ts";
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
        label: formatPharmacyLocation(i),
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(selectedCity)) return undefined;

  const lat = dmsStringToDecimal(selectedCity.latitude);
  const lng = dmsStringToDecimal(selectedCity.longitude);

  if (lat === undefined || lng === undefined) {
    throw new UnreachableError(
      `مختصات در فایل شهر‌ها فرمی خارج از انتظار داشت: ${JSON.stringify({ lat, lng })}`,
    );
  }

  return {
    name: `${selectedCity.city} - ${selectedCity.province}`,
    lat,
    lng,
  };
}
