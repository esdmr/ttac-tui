import * as v from "valibot";
import { dontCare, readonlyArray, readonlyObject } from "../schema.ts";
import { TtacDrugLicense } from "./drug-license.ts";

export const TtacDrugsResponse = readonlyObject({
  data: readonlyObject({
    drugLicenses: readonlyArray(TtacDrugLicense),
    suggestionDrugLicenses: dontCare(readonlyArray(v.string())),
    count: dontCare(v.number()),
  }),
  errors: dontCare(),
  message: dontCare(),
  statusCode: dontCare(v.number()),
  succeeded: dontCare(v.boolean()),
});
export type TtacDrugsResponse = v.InferOutput<typeof TtacDrugsResponse>;
