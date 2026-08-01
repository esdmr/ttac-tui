import { isCancel, log, multiselect } from "@clack/prompts";
import { formatFilter } from "../formatting/filter.ts";
import { getFilters, removeFilters } from "../stores/filters.ts";

export async function promptToManageFiltersStorage() {
  if (getFilters().length === 0) {
    log.error("فیلتر ذخیره‌شده‌ای یافت نشد.");
    return;
  }

  const items = await multiselect({
    message: "فیلترها را جهت حذف انتخاب کنید",
    required: false,
    options: getFilters()
      .map((i) => ({
        value: i,
        label: formatFilter(i),
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(items) || items.length === 0) return;
  await removeFilters(items);
}
