import { isCancel, select } from "@clack/prompts";
import { getLocations, type Location } from "../stores/locations.ts";
import { promptForLocationByCity } from "./location-by-city.ts";
import { promptForLocationManual } from "./location-manual.ts";
import { promptToSaveLocation, type LocationToSave } from "./location-save.ts";

export async function promptForLocation(): Promise<LocationToSave> {
  const locations = getLocations();

  const selectedLocation = await select<Location | "by-city" | "manual">({
    message: "انتخاب موقعیت",
    options: [
      ...locations.map((i) => ({
        value: i,
        label: i.name,
      })),
      {
        value: "by-city",
        label: "جستجوی شهر",
      },
      {
        value: "manual",
        label: "ورودی دستی",
      },
    ],
  });

  if (isCancel(selectedLocation)) {
    throw new Error("باید یک موقعیت انتخاب کنید");
  }

  if (typeof selectedLocation === "object") return selectedLocation;

  const loc =
    selectedLocation === "by-city"
      ? await promptForLocationByCity()
      : await promptForLocationManual();

  return promptToSaveLocation(loc);
}
