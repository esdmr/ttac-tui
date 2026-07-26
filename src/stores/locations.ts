import { readJson, writeJson } from "../json.ts";

export interface Location {
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
}

const locations: Location[] = await readJson(
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
