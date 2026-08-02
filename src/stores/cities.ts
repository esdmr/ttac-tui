import * as v from "valibot";
import { readJson } from "../json.ts";
import { City } from "../types/city.ts";

const cities = await readJson(
  new URL("cities.json", import.meta.url),
  v.array(City),
  [],
);

export function getCities(): readonly City[] {
  return cities;
}
