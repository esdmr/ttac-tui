import { rtl } from "../bidi.ts";

export const SECONDS_PER_DAY = 60 * 60 * 24;

export function formatSecondsAsDays(i: number) {
  return rtl`${(i / SECONDS_PER_DAY).toFixed(1)} روز پیش`;
}
