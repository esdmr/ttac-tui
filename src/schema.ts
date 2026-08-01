import * as v from "valibot";

export function readonlyObject<const T extends v.ObjectEntries>(entries: T) {
  return v.pipe(v.object(entries), v.readonly());
}

export function readonlyArray<
  const T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(item: T) {
  return v.pipe(v.array(item), v.readonly());
}
