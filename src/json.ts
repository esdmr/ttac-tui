import { readFile, writeFile } from "node:fs/promises";
import * as v from "valibot";

export async function readJson<T>(
  name: string | URL,
  schema: v.GenericSchema<T>,
  fallback?: T,
): Promise<T> {
  try {
    const text = await readFile(name, "utf8");
    return v.parse(schema, JSON.parse(text));
  } catch (error) {
    if (fallback !== undefined) return fallback;
    throw error;
  }
}

export async function writeJson(name: string | URL, value: unknown) {
  await writeFile(name, JSON.stringify(value, null, "\t"));
}
