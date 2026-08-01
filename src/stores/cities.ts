import * as v from "valibot";
import { readJson } from "../json.ts";
import { readonlyObject } from "../schema.ts";

export const City = readonlyObject({
  latitude: v.string(),
  longitude: v.string(),
  province: v.string(),
  state: v.string(),
  city: v.string(),
});

export type City = v.InferOutput<typeof City>;

const cities = await readJson(
  new URL("cities.json", import.meta.url),
  v.array(City),
  [],
);

export function getCities(): readonly City[] {
  return cities;
}
