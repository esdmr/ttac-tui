import * as v from "valibot";
import { dontCare, readonlyArray, readonlyObject } from "../schema.ts";
import { TtacDrugPharmacy } from "./drug-pharmacy.ts";

export const TtacDrugPharmaciesResponse = readonlyObject({
  results: readonlyArray(TtacDrugPharmacy),
  count: dontCare(v.number()),
});

export type TtacDrugPharmaciesResponse = v.InferOutput<
  typeof TtacDrugPharmaciesResponse
>;
