import { isCancel, select } from "@clack/prompts";
import { SECONDS_PER_DAY } from "../formatting/duration.ts";
import { formatFilter, isFilterEmpty } from "../formatting/filter.ts";
import type { TtacResult } from "../providers/drug-pharmacy.ts";
import { appendFilters, getFilters, type Filter } from "../stores/filters.ts";
import { promptToFilterByCity } from "./filter-by-city.ts";
import { promptToFilterByDays } from "./filter-by-days.ts";

function match(i: TtacResult, filter: Filter): boolean {
  return (
    (!filter.city || i.pharmacy.city === filter.city) &&
    (!filter.days || i.secondsFromLastSellDate < SECONDS_PER_DAY * filter.days)
  );
}

export async function promptToFilter(results: readonly TtacResult[]) {
  let filter: Filter = {};

  while (true) {
    let matchCount = 0;

    for (const i of results) {
      if (match(i, filter)) matchCount++;
    }

    const action = await select<
      Filter | `by-${keyof Filter}` | "done" | "clear" | "save"
    >({
      message: "فیلتر - " + formatFilter(filter) + " - " + matchCount,
      options: [
        ...getFilters().map((i) => ({
          value: i,
          label: formatFilter(i),
          disabled: i === filter,
        })),
        { value: "by-city", label: "طبق شهر" },
        { value: "by-days", label: "طبق زمان" },
        { value: "done", label: "اعمال" },
        {
          value: "save",
          label: "ذخیره و اعمال",
          disabled: isFilterEmpty(filter) || getFilters().includes(filter),
        },
        {
          value: "clear",
          label: "بازنشانی",
          disabled: isFilterEmpty(filter),
        },
      ],
    });

    if (isCancel(action)) return [];

    switch (action) {
      case "save":
        await appendFilters([filter]);
      // Fallthrough.

      case "done":
        return results.filter((i) => match(i, filter));

      case "clear":
        filter = {};
        break;

      case "by-city":
        filter = {
          ...filter,
          city: await promptToFilterByCity(results, filter.city),
        };
        break;

      case "by-days":
        filter = { ...filter, days: await promptToFilterByDays(filter.days) };
        break;

      default:
        filter = action;
    }
  }
}
