import * as v from "valibot";
import { dontCare, readonlyObject } from "../schema.ts";

export const TtacDrug = readonlyObject({
  irc: v.string(),
  enBrandName: v.string(),
  faBrandName: v.string(),
  drugGenericName: dontCare(),
  indexFaName: dontCare(),
  indexEnName: dontCare(),
  genericCode: v.number(),
  drugIndexId: v.number(),
});

export type TtacDrug = v.InferOutput<typeof TtacDrug>;
