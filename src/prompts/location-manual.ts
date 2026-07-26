import { isCancel, text } from "@clack/prompts";
import type { LocationToSave } from "./location-save.ts";

const IRAN_BOUNDS = [
  44.1092252948, 25.0782370061, 63.3166317076, 39.7130026312,
] as const;

export async function promptForLocationManual(): Promise<LocationToSave> {
  const selectedLat = await text({
    message: "عرض جغرافیایی",
    placeholder: `${(IRAN_BOUNDS[3] + IRAN_BOUNDS[1]) / 2}`,
    validate(value) {
      const parsed = Number.parseFloat(value || "0");
      if (!Number.isFinite(parsed)) return "لطفا یک عدد وارد کنید";
      if (parsed < IRAN_BOUNDS[1]) return "مختصات بیش‌از‌حد پایین است";
      if (parsed > IRAN_BOUNDS[3]) return "مختصات بیش‌از‌حد بالا است";
    },
  });

  if (isCancel(selectedLat)) {
    throw new Error("باید یک موقعیت انتخاب کنید");
  }

  const selectedLng = await text({
    message: "طول جغرافیایی",
    placeholder: `${(IRAN_BOUNDS[1] + IRAN_BOUNDS[0]) / 2}`,
    validate(value) {
      const parsed = Number.parseFloat(value || "0");
      if (!Number.isFinite(parsed)) return "لطفا یک عدد وارد کنید";
      if (parsed < IRAN_BOUNDS[0]) return "مختصات بیش‌از‌حد پایین است";
      if (parsed > IRAN_BOUNDS[2]) return "مختصات بیش‌از‌حد بالا است";
    },
  });

  if (isCancel(selectedLng)) {
    throw new Error("باید یک موقعیت انتخاب کنید");
  }

  return {
    name: undefined,
    lat: +selectedLat,
    lng: +selectedLng,
  };
}
