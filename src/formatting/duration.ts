export const SECONDS_PER_DAY = 60 * 60 * 24;

export function formatSecondsAsDays(i: number) {
  return (i / SECONDS_PER_DAY).toFixed(1) + " روز پیش";
}
