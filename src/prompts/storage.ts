import { isCancel, select } from "@clack/prompts";
import { getDrugs } from "../stores/drugs.ts";
import { getFilters } from "../stores/filters.ts";
import { getLocations } from "../stores/locations.ts";
import { getOldResultNames } from "../stores/old-results.ts";
import { promptToManageDrugsStorage } from "./storage-drugs.ts";
import { promptToManageFiltersStorage } from "./storage-filters.ts";
import { promptToManageLocationsStorage } from "./storage-locations.ts";
import { promptToManageOldResultsStorage } from "./storage-old-results.ts";

export async function promptToManageStorage() {
  while (true) {
    const kind = await select({
      message: "مدیریت اطلاعات ذخیره‌شده",
      options: [
        { value: "drugs", label: "دارو‌ها", disabled: getDrugs().length === 0 },
        {
          value: "filters",
          label: "فیلتر‌ها",
          disabled: getFilters().length === 0,
        },
        {
          value: "locations",
          label: "مکان‌ها",
          disabled: getLocations().length === 0,
        },
        {
          value: "old-results",
          label: "نتایج",
          disabled: getOldResultNames().length === 0,
        },
        { value: "back", label: "بازگشت" },
      ],
    });

    if (isCancel(kind)) return;

    switch (kind) {
      case "drugs":
        await promptToManageDrugsStorage();
        break;

      case "filters":
        await promptToManageFiltersStorage();
        break;

      case "locations":
        await promptToManageLocationsStorage();
        break;

      case "old-results":
        await promptToManageOldResultsStorage();
        break;

      case "back":
        return;
    }
  }
}
