import * as v from "valibot";
import { readonlyObject } from "../schema.ts";

export const Location = readonlyObject({
  latitude: v.number(),
  longitude: v.number(),
  name: v.string(),
});

export type Location = v.InferOutput<typeof Location>;
