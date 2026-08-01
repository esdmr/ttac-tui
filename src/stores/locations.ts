import * as v from "valibot";
import { readJson, writeJson } from "../json.ts";
import { readonlyObject } from "../schema.ts";

export const Location = readonlyObject({
  name: v.string(),
  lat: v.number(),
  lng: v.number(),
});

export type Location = v.InferOutput<typeof Location>;

let locations: Location[] = await readJson(
  new URL("locations.json", import.meta.url),
  v.array(Location),
  [],
);

export function getLocations(): readonly Location[] {
  return locations;
}

export async function appendLocations(newLocations: readonly Location[]) {
  locations.push(...newLocations);
  await writeJson(new URL("locations.json", import.meta.url), locations);
}

export async function removeLocations(locationsToRemove: readonly Location[]) {
  locations = locations.filter((i) => !locationsToRemove.includes(i));
  await writeJson(new URL("locations.json", import.meta.url), locations);
}
