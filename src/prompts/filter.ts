import { isCancel, select } from "@clack/prompts";
import { SECONDS_PER_DAY } from "../formatting/duration.ts";
import { formatFilter } from "../formatting/filter.ts";
import type { TtacResult } from "../providers/drug-pharmacy.ts";
import type { Filter } from "../stores/filters.ts";
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

    const action = await select({
      message: "فیلتر - " + formatFilter(filter) + " - " + matchCount,
      options: [
        { value: "by-city", label: "طبق شهر" },
        { value: "by-days", label: "طبق زمان" },
        { value: "done", label: "انجام" },
      ],
    });

    if (isCancel(action)) return [];

    switch (action) {
      case "done":
        return results.filter((i) => match(i, filter));

      case "by-city":
        filter = {
          ...filter,
          city: await promptToFilterByCity(results, filter.city),
        };
        break;

      case "by-days":
        filter = { ...filter, days: await promptToFilterByDays(filter.days) };
        break;
    }
  }
}
