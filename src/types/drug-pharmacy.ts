import * as v from "valibot";
import { readonlyObject } from "../schema.ts";
import { TtacDrug } from "./drug.ts";
import { TtacPharmacy } from "./pharmacy.ts";

export const TtacDrugPharmacy = v.intersect([
  TtacDrug,
  readonlyObject({
    secondsFromLastSellDate: v.number(),
    pharmacy: TtacPharmacy,
  }),
]);

export type TtacDrugPharmacy = v.InferOutput<typeof TtacDrugPharmacy>;
