import { glob } from "fs/promises";
import { readJson, writeJson } from "../json.ts";
import type { TtacResult } from "../providers/drug-pharmacy.ts";

const oldResultNames = await Array.fromAsync(glob("/tmp/ttac.*.json"));
const oldResults = new Map<string, readonly TtacResult[]>();

export function getOldResultNames(): readonly string[] {
  return oldResultNames;
}

export async function getOldResult(
  name: string,
): Promise<readonly TtacResult[]> {
  if (!oldResultNames.includes(name)) return [];
  if (oldResults.has(name)) return oldResults.get(name)!;
  const result: readonly TtacResult[] = await readJson(name);
  oldResults.set(name, result);
  return result;
}

export async function setResult(name: string, value: readonly TtacResult[]) {
  oldResultNames.push(name);
  oldResults.set(name, value);
  await writeJson(name, value);
}
