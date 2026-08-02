import { isCancel, log, multiselect } from "@clack/prompts";
import { formatLocation } from "../formatting/location.ts";
import { getLocations, removeLocations } from "../stores/locations.ts";

export async function promptToManageLocationsStorage() {
  if (getLocations().length === 0) {
    log.error("مکان ذخیره‌شده‌ای یافت نشد.");
    return;
  }

  const items = await multiselect({
    message: "مکان‌ها را جهت حذف انتخاب کنید",
    required: false,
    options: getLocations()
      .map((i) => ({
        value: i,
        label: formatLocation(i),
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label, "fa")),
  });

  if (isCancel(items) || items.length === 0) return;
  await removeLocations(items);
}
