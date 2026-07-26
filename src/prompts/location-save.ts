import { confirm, isCancel, text } from "@clack/prompts";
import { appendLocations } from "../stores/locations.ts";

export interface LocationToSave {
  readonly name: string | undefined;
  readonly lat: number;
  readonly lng: number;
}

export async function promptToSaveLocation(loc: LocationToSave) {
  const shouldSave = await confirm({
    message: "آیا می‌خواهید که این موقعیت را ذخیره نمایید؟",
  });

  if (shouldSave === true) {
    const selectedName =
      loc.name ||
      (await text({
        message: "اسمی برای این موقعیت انتخاب کنید",
      }));

    if (!isCancel(selectedName)) {
      loc = { ...loc, name: selectedName };

      appendLocations([loc]);
    }
  }

  return loc;
}
