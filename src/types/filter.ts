import * as v from 'valibot';
import { readonlyObject } from '../schema.ts';


export const Filter = readonlyObject({
  city: v.optional(v.string()),
  days: v.optional(v.number()),
});

export type Filter = v.InferOutput<typeof Filter>;
