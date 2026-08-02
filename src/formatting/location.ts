import { rtl } from "../bidi.ts";
import type { Location } from '../types/location.ts';
import { formatCoordinate } from "./coordinate.ts";

export function formatLocation(i: Location) {
  return rtl`${i.name} (${formatCoordinate(i.latitude, i.longitude)})`;
}
