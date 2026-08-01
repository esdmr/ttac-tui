import { glob, rm } from "fs/promises";
import { readJson, writeJson } from "../json.ts";
import type { TtacResult } from "../providers/drug-pharmacy.ts";

let oldResultNames = await Array.fromAsync(glob("/tmp/ttac.*.json"));
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

export async function removeOldResults(namesToRemove: readonly string[]) {
  for (const i of namesToRemove) {
    if (!oldResultNames.includes(i)) continue;
    await rm(i, { force: true });
    oldResults.delete(i);
  }

  oldResultNames = oldResultNames.filter((i) => !namesToRemove.includes(i));
}
