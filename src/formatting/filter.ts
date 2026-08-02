import { rtl } from "../bidi.ts";
import type { Filter } from "../types/filter.ts";
import { list } from "./list.ts";

export function formatFilter(filter: Filter) {
  const parts = [];
  // oxlint-disable-next-line typescript/strict-boolean-expressions
  if (filter.city) parts.push(`شهر ${filter.city}`);
  // oxlint-disable-next-line typescript/strict-boolean-expressions
  if (filter.days) parts.push(`حداکثر ${filter.days} روز پیش`);
  return rtl`${list.format(parts) || "همه"}`;
}

export function isFilterEmpty(filter: Filter) {
  // oxlint-disable-next-line typescript/strict-boolean-expressions
  return !filter.city && !filter.days;
}
