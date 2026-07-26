import type { Filter } from "../stores/filters.ts";
import { list } from "./list.ts";

export function formatFilter(filter: Filter) {
  const parts = [];
  if (filter.city) parts.push(`شهر ${filter.city}`);
  if (filter.days) parts.push(`حداکثر ${filter.days} روز پیش`);
  return list.format(parts) || "همه";
}
