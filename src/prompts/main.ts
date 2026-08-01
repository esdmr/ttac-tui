import { isCancel, log, select } from "@clack/prompts";
import { list } from "../formatting/list.ts";
import { listDrugPharmacyBatches } from "../stores/drug-pharmacies.ts";
import { promptForDisplay } from "./display.ts";
import { promptToSaveDrugs } from "./drugs-save.ts";
import { promptToFilter } from "./filter.ts";
import { promptToLoad } from "./load.ts";
import { promptToSearch } from "./search.ts";
import { promptToManageStorage } from "./storage.ts";

export async function mainPrompt() {
  while (true) {
    const oldDrugPharmacies = listDrugPharmacyBatches();

    const action = await select({
      message: "عملیات",
      options: [
        { value: "search", label: "جستجو" },
        {
          value: "load",
          label: "بارگذاری نتایج قدیمی",
          disabled: oldDrugPharmacies.length === 0,
        },
        {
          value: "storage",
          label: "مدیریت اطلاعات ذخیره‌شده",
        },
      ],
    });

    if (isCancel(action)) return;

    if (action === "storage") {
      await promptToManageStorage();
      continue;
    }

    const drugPharmacies =
      action === "search"
        ? await promptToSearch(oldDrugPharmacies.length)
        : await promptToLoad(oldDrugPharmacies);

    if (drugPharmacies.length === 0) {
      log.message("بدون نتیجه.");
      return;
    }

    const drugNames = new Set(drugPharmacies.map((i) => i.faBrandName));

    log.info(
      `دارو‌های موجود: ${list.format([...drugNames].toSorted((a, b) => a.localeCompare(b, "fa")))}`,
    );

    await promptToSaveDrugs(drugPharmacies);

    const filteredDrugPharmacies = await promptToFilter(drugPharmacies);

    if (filteredDrugPharmacies.length === 0) {
      log.message("بدون نتیجه.");
      return;
    }

    await promptForDisplay(filteredDrugPharmacies);
    return;
  }
}
