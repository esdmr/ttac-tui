import { isCancel, log, multiselect } from "@clack/prompts";
import { formatResultsFilename } from "../formatting/filename.ts";
import { getOldResultNames, removeOldResults } from "../stores/old-results.ts";

export async function promptToManageOldResultsStorage() {
  if (getOldResultNames().length === 0) {
    log.error("نتیجه قدیمی ذخیره‌شده‌ای یافت نشد.");
    return;
  }

  const items = await multiselect({
    message: "نتایج قدیمی را جهت حذف انتخاب کنید",
    required: false,
    options: getOldResultNames()
      .map((i) => ({
        value: i,
        label: formatResultsFilename(i),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(items) || items.length === 0) return;
  await removeOldResults(items);
}
