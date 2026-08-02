import * as v from "valibot";
import { dontCare, readonlyObject } from "../schema.ts";

export const TtacPharmacy = readonlyObject({
  address: v.string(),
  city: v.string(),
  county: dontCare(v.string()),
  gln: dontCare(v.string()),
  hix: dontCare(v.string()),
  id: v.number(),
  latitude: v.number(),
  longitude: v.number(),
  name: v.string(),
  ownerName: dontCare(v.string()),
  pharmacyService1: v.string(),
  pharmacyServiceType1: dontCare(v.number()),
  pharmacyType: dontCare(),
  pharmacyTypeId: dontCare(),
  province: v.string(),
  technicalExpertName: dontCare(),
  telNumber: v.string(),
  universityName: dontCare(v.string()),
});

export type TtacPharmacy = v.InferOutput<typeof TtacPharmacy>;
