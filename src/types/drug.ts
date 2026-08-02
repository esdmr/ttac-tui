import * as v from "valibot";
import { dontCare, readonlyObject } from "../schema.ts";

export const TtacDrug = readonlyObject({
  drugGenericName: dontCare(),
  drugIndexId: v.number(),
  enBrandName: dontCare(v.string()),
  faBrandName: v.string(),
  genericCode: dontCare(v.number()),
  indexEnName: dontCare(),
  indexFaName: dontCare(),
  irc: v.string(),
});

export type TtacDrug = v.InferOutput<typeof TtacDrug>;
