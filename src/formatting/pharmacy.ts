import { rtl } from "../bidi.ts";
import type { TtacPharmacy } from "../providers/drug-pharmacy.ts";
import { formatSecondsAsDays } from "./duration.ts";
import { list } from "./list.ts";

export function formatPharmacy(i: TtacPharmacy, ...durations: number[]) {
  return `${i.name} - ${i.pharmacyService1} - ${i.telNumber} - ${list.format(durations.map((i) => formatSecondsAsDays(i))) || "نامشخص"}\n${i.address}\n\n`;
}

export function formatPharmacyLocation(
  i: Pick<TtacPharmacy, "city" | "province">,
) {
  return rtl`${i.city} - ${i.province}`;
}
