import { readJson, writeJson } from "../json.ts";

export interface Location {
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}

let locations: Location[] = await readJson(
  new URL("./locations.json", import.meta.url),
  [],
);

export function getLocations(): readonly Location[] {
  return locations;
}

export async function appendLocations(newLocations: readonly Location[]) {
  locations.push(...newLocations);
  await writeJson(new URL("./locations.json", import.meta.url), locations);
}

export async function removeLocations(locationsToRemove: readonly Location[]) {
  locations = locations.filter((i) => !locationsToRemove.includes(i));
  await writeJson(new URL("./locations.json", import.meta.url), locations);
}
