import * as v from "valibot";
import { TtacDrugLicense } from "./drug-license.ts";
import { TtacDrug } from "./drug.ts";

export const TtacDrugExtra = v.intersect([TtacDrug, TtacDrugLicense]);
export type TtacDrugExtra = v.InferOutput<typeof TtacDrugExtra>;
