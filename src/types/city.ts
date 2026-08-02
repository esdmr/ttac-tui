import * as v from "valibot";
import { readonlyObject } from "../schema.ts";

export const City = readonlyObject({
  latitude: v.string(),
  longitude: v.string(),
  province: v.string(),
  state: v.string(),
  city: v.string(),
});

export type City = v.InferOutput<typeof City>;
