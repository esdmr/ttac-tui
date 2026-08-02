import * as v from "valibot";
import { dontCare, readonlyArray, readonlyObject } from "../schema.ts";
import { TtacDrugPharmacy } from "./drug-pharmacy.ts";

export const TtacDrugPharmaciesResponse = readonlyObject({
  count: dontCare(v.number()),
  results: readonlyArray(TtacDrugPharmacy),
});

export type TtacDrugPharmaciesResponse = v.InferOutput<
  typeof TtacDrugPharmaciesResponse
>;
