import { readJson } from "../json.ts";

export interface City {
  readonly latitude: string;
  readonly longitude: string;
  readonly province: string;
  readonly state: string;
  readonly city: string;
}

const cities: readonly City[] = await readJson(
  new URL("./cities.json", import.meta.url),
  [],
);

export function getCities(): readonly City[] {
  return cities;
}
