import { readJson, writeJson } from "../json.ts";

export interface Filter {
  readonly city?: string;
  readonly days?: number;
}

let filters: Filter[] = await readJson(
  new URL("./filters.json", import.meta.url),
  [],
);

export function getFilters(): readonly Filter[] {
  return filters;
}

export async function appendFilters(newFilters: readonly Filter[]) {
  filters.push(...newFilters);
  await writeJson(new URL("./filters.json", import.meta.url), filters);
}

export async function removeFilters(filtersToRemove: readonly Filter[]) {
  filters = filters.filter((i) => !filtersToRemove.includes(i));
  await writeJson(new URL("./filters.json", import.meta.url), filters);
}
