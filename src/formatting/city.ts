import { rtl } from "../bidi.ts";
import type { City } from "../types/city.ts";

export function formatCity(i: Pick<City, "city" | "province">) {
  return rtl`${i.city} - ${i.province}`;
}
