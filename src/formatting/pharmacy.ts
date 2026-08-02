import { ltr, rtl } from "../bidi.ts";
import type { TtacPharmacy } from "../types/pharmacy.ts";
import { formatCity } from "./city.ts";
import { formatCoordinate } from "./coordinate.ts";
import { formatSecondsAsDays } from "./duration.ts";
import { list } from "./list.ts";

export function formatPharmacy(i: TtacPharmacy, ...durations: number[]) {
  return rtl`${i.name} - ${i.pharmacyService1} - ${ltr`${i.telNumber}`} - ${list.format(durations.map((i) => formatSecondsAsDays(i))) || "نامشخص"}\n${i.address}\n\n`;
}

export function formatPharmacyLocation(
  i: Pick<TtacPharmacy, "city" | "province" | "latitude" | "longitude">,
) {
  return rtl`${formatCity(i)} (${formatCoordinate(i.latitude, i.longitude)})`;
}
