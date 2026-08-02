import * as v from "valibot";
import { readonlyObject } from "../schema.ts";

export const Location = readonlyObject({
  name: v.string(),
  lat: v.number(),
  lng: v.number(),
});

export type Location = v.InferOutput<typeof Location>;
