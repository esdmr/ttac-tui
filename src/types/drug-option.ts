import * as v from "valibot";
import { readonlyObject } from "../schema.ts";

export const TtacDrugsOptions = readonlyObject({
  pageNumber: v.number(),
  pageSize: v.number(),
  term: v.string(),
});
export type TtacDrugsOptions = v.InferOutput<typeof TtacDrugsOptions>;
