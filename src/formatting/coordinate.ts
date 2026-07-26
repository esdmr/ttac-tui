
export function dmsStringToDecimal (dmsStr) {
  const m = dmsStr
    .trim()
    .match(
      /^([+-]?\d+(?:\.\d+)?)\s*°\s*([+-]?\d+(?:\.\d+)?)\s*'\s*([+-]?\d+(?:\.\d+)?)\s*"?$/
    );

  if (!m) throw new Error(`Invalid DMS string: ${dmsStr}`);

  const deg = Number(m[1]);
  const min = Number(m[2]);
  const sec = Number(m[3]);

  const sign = deg < 0 ? -1 : 1;
  const absDeg = Math.abs(deg);

  return sign * (absDeg + min / 60 + sec / 3600);
}
