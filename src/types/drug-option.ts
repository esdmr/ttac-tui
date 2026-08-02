import * as v from "valibot";
import { readonlyObject } from "../schema.ts";

export const TtacDrugsOptions = readonlyObject({
  term: v.string(),
  pageNumber: v.number(),
  pageSize: v.number(),
});
export type TtacDrugsOptions = v.InferOutput<typeof TtacDrugsOptions>;
