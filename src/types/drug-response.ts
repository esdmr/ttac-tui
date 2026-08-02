import * as v from "valibot";
import { dontCare, readonlyArray, readonlyObject } from '../schema.ts';
import { TtacDrugLicense } from './drug-license.ts';


export const TtacDrugsResponse = readonlyObject({
  data: readonlyObject({
    drugLicenses: readonlyArray(TtacDrugLicense),
    suggestionDrugLicenses: readonlyArray(v.string()),
    count: v.number(),
  }),
  succeeded: v.boolean(),
  message: dontCare(),
  statusCode: v.number(),
  errors: dontCare(),
});
export type TtacDrugsResponse = v.InferOutput<typeof TtacDrugsResponse>;
