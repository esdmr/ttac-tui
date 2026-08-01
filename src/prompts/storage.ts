import { isCancel, select } from "@clack/prompts";
import { listDrugPharmacyBatches } from "../stores/drug-pharmacies.ts";
import { getDrugs } from "../stores/drugs.ts";
import { getFilters } from "../stores/filters.ts";
import { getLocations } from "../stores/locations.ts";
import { promptToManageDrugPharmaciesStorage } from "./storage-drug-pharmacies.ts";
import { promptToManageDrugsStorage } from "./storage-drugs.ts";
import { promptToManageFiltersStorage } from "./storage-filters.ts";
import { promptToManageLocationsStorage } from "./storage-locations.ts";

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
          value: "drug-pharmacies",
          label: "نتایج",
          disabled: listDrugPharmacyBatches().length === 0,
        },
        { value: "back", label: "بازگشت" },
      ],
    });

    if (isCancel(kind)) return;

    switch (kind) {
      case "drugs": {
        await promptToManageDrugsStorage();
        break;
      }

      case "filters": {
        await promptToManageFiltersStorage();
        break;
      }

      case "locations": {
        await promptToManageLocationsStorage();
        break;
      }

      case "drug-pharmacies": {
        await promptToManageDrugPharmaciesStorage();
        break;
      }

      case "back": {
        return;
      }
    }
  }
}
