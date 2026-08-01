import * as v from "valibot";
import { readJson, writeJson } from "../json.ts";
import { readonlyObject } from "../schema.ts";

export const Filter = readonlyObject({
  city: v.optional(v.string()),
  days: v.optional(v.number()),
});

export type Filter = v.InferOutput<typeof Filter>;

let filters = await readJson(
  new URL("filters.json", import.meta.url),
  v.array(Filter),
  [],
);

export function getFilters(): readonly Filter[] {
  return filters;
}

export async function appendFilters(newFilters: readonly Filter[]) {
  filters.push(...newFilters);
  await writeJson(new URL("filters.json", import.meta.url), filters);
}

export async function removeFilters(filtersToRemove: readonly Filter[]) {
  filters = filters.filter((i) => !filtersToRemove.includes(i));
  await writeJson(new URL("filters.json", import.meta.url), filters);
}
