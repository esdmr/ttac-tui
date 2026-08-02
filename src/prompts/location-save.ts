import { confirm, isCancel, text } from "@clack/prompts";
import { appendLocations } from "../stores/locations.ts";
import { type Location } from "../types/location.ts";

export interface LocationToSave {
  readonly name: string | undefined;
  readonly latitude: number;
  readonly longitude: number;
}

export async function promptToSaveLocation(loc: LocationToSave) {
  const shouldSave = await confirm({
    message: "آیا می‌خواهید که این موقعیت را ذخیره نمایید؟",
  });

  if (shouldSave === true) {
    const selectedName =
      loc.name ??
      (await text({
        message: "اسمی برای این موقعیت انتخاب کنید",
      }));

    if (!isCancel(selectedName)) {
      const locWithName: Location = { ...loc, name: selectedName };
      loc = locWithName;
      await appendLocations([locWithName]);
    }
  }

  return loc;
}
