import * as v from "valibot";
import { readJson, writeJson } from "../json.ts";
import { Filter } from "../types/filter.ts";

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
