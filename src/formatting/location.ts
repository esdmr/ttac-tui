import { rtl } from "../bidi.ts";
import type { Location } from "../stores/locations.ts";
import { formatCoordinate } from "./coordinate.ts";

export function formatLocation(i: Location) {
  return rtl`${i.name} (${formatCoordinate(i.lat, i.lng)})`;
}
