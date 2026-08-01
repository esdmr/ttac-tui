import { isCancel, text } from "@clack/prompts";
import type { LocationToSave } from "./location-save.ts";

const IRAN_BOUNDS = [
  44.109_225_294_8, 25.078_237_006_1, 63.316_631_707_6, 39.713_002_631_2,
] as const;

export async function promptForLocationManual(): Promise<
  LocationToSave | undefined
> {
  const selectedLat = await text({
    message: "عرض جغرافیایی",
    placeholder: `${(IRAN_BOUNDS[3] + IRAN_BOUNDS[1]) / 2}`,
    validate(value) {
      const parsed = Number.parseFloat(value ?? "0");
      if (!Number.isFinite(parsed)) return "لطفا یک عدد وارد کنید";
      if (parsed < IRAN_BOUNDS[1]) return "مختصات بیش‌از‌حد پایین است";
      if (parsed > IRAN_BOUNDS[3]) return "مختصات بیش‌از‌حد بالا است";
      return undefined;
    },
  });

  if (isCancel(selectedLat)) return undefined;

  const selectedLng = await text({
    message: "طول جغرافیایی",
    placeholder: `${(IRAN_BOUNDS[1] + IRAN_BOUNDS[0]) / 2}`,
    validate(value) {
      const parsed = Number.parseFloat(value ?? "0");
      if (!Number.isFinite(parsed)) return "لطفا یک عدد وارد کنید";
      if (parsed < IRAN_BOUNDS[0]) return "مختصات بیش‌از‌حد پایین است";
      if (parsed > IRAN_BOUNDS[2]) return "مختصات بیش‌از‌حد بالا است";
      return undefined;
    },
  });

  if (isCancel(selectedLng)) return undefined;

  return {
    name: undefined,
    lat: +selectedLat,
    lng: +selectedLng,
  };
}
