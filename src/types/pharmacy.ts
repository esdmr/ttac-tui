import * as v from "valibot";
import { dontCare, readonlyObject } from "../schema.ts";

export const TtacPharmacy = readonlyObject({
  id: v.number(),
  name: v.string(),
  ownerName: v.string(),
  technicalExpertName: dontCare(),
  telNumber: v.string(),
  longitude: v.number(),
  latitude: v.number(),
  hix: v.string(),
  universityName: v.string(),
  pharmacyService1: v.string(),
  pharmacyServiceType1: v.number(),
  pharmacyType: dontCare(),
  pharmacyTypeId: dontCare(),
  gln: v.string(),
  city: v.string(),
  county: v.string(),
  province: v.string(),
  address: v.string(),
});

export type TtacPharmacy = v.InferOutput<typeof TtacPharmacy>;
