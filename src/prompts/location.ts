import { isCancel, select } from "@clack/prompts";
import { formatLocation } from "../formatting/location.ts";
import { getLocations } from "../stores/locations.ts";
import { type Location } from '../types/location.ts';
import { promptForLocationByCity } from "./location-by-city.ts";
import { promptForLocationManual } from "./location-manual.ts";
import { promptToSaveLocation, type LocationToSave } from "./location-save.ts";

export async function promptForLocation(): Promise<LocationToSave | undefined> {
  while (true) {
    const locations = getLocations();

    const selectedLocation = await select<Location | "by-city" | "manual">({
      message: "انتخاب موقعیت",
      options: [
        ...locations
          .map((i) => ({
            value: i,
            label: formatLocation(i),
          }))
          .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
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

    if (isCancel(selectedLocation)) return undefined;

    if (typeof selectedLocation === "object") return selectedLocation;

    const loc =
      selectedLocation === "by-city"
        ? await promptForLocationByCity()
        : await promptForLocationManual();

    if (loc === undefined) continue;

    return promptToSaveLocation(loc);
  }
}
