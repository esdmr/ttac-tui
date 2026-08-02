import * as v from "valibot";
import { formatCity } from "../formatting/city.ts";
import { dmsStringToDecimal } from "../formatting/coordinate.ts";
import { readJson } from "../json.ts";
import { City } from "../types/city.ts";
import type { Location } from "../types/location.ts";

// oxlint-disable-next-line unicorn/no-await-expression-member
const cities = (
  await readJson(new URL("cities.json", import.meta.url), v.array(City), [])
)
  .map((i) => ({
    name: formatCity(i),
    latitude: dmsStringToDecimal(i.latitude),
    longitude: dmsStringToDecimal(i.longitude),
  }))
  .filter(
    (i): i is Location => i.latitude !== undefined && i.longitude !== undefined,
  );

export function getCities(): readonly Location[] {
  return cities;
}
