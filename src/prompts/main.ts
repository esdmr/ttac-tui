import { isCancel, log, select } from "@clack/prompts";
import { list } from "../formatting/list.ts";
import { getOldResultNames } from "../stores/old-results.ts";
import { promptForDisplay } from "./display.ts";
import { promptToSaveDrugs } from "./drugs-save.ts";
import { promptToFilter } from "./filter.ts";
import { promptToLoad } from "./load.ts";
import { promptToSearch } from "./search.ts";

export async function mainPrompt() {
  const oldFiles = getOldResultNames();

  const action = await select({
    message: "عملیات",
    options: [
      { value: "search", label: "جستجو" },
      {
        value: "load",
        label: "بارگذاری نتایج قدیمی",
        disabled: oldFiles.length === 0,
      },
    ],
  });

  if (isCancel(action)) return;

  const results =
    action === "search"
      ? await promptToSearch(oldFiles.length)
      : await promptToLoad(oldFiles);

  if (results.length === 0) {
    log.message("بدون نتیجه.");
    return;
  }

  const drugNames = new Set(results.map((i) => i.faBrandName));

  log.info(
    `دارو‌های موجود: ${list.format([...drugNames].sort((a, b) => a.localeCompare(b, "fa")))}`,
  );

  await promptToSaveDrugs(results);

  const filteredResults = await promptToFilter(results);

  if (filteredResults.length === 0) {
    log.message("بدون نتیجه.");
    return;
  }

  await promptForDisplay(filteredResults);
}
