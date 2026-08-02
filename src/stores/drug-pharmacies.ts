import { glob, rm } from "fs/promises";
import { readJson, writeJson } from "../json.ts";
import { TtacDrugPharmacy } from '../types/drug-pharmacy.ts';
import { readonlyArray } from "../schema.ts";

let batches = await Array.fromAsync(glob("/tmp/ttac.*.json"));
const cache = new Map<string, readonly TtacDrugPharmacy[]>();

export function listDrugPharmacyBatches(): readonly string[] {
  return batches;
}

export async function getDrugPharmacyBatch(
  batch: string,
): Promise<readonly TtacDrugPharmacy[]> {
  if (!batches.includes(batch)) return [];
  if (cache.has(batch)) return cache.get(batch)!;
  const drugPharmacies = await readJson(batch, readonlyArray(TtacDrugPharmacy));
  cache.set(batch, drugPharmacies);
  return drugPharmacies;
}

export async function setDrugPharmacyBatch(
  batch: string,
  value: readonly TtacDrugPharmacy[],
) {
  batches.push(batch);
  cache.set(batch, value);
  await writeJson(batch, value);
}

export async function removeDrugPharmacyBatches(
  batchesToRemove: readonly string[],
) {
  for (const i of batchesToRemove) {
    if (!batches.includes(i)) continue;
    await rm(i, { force: true });
    cache.delete(i);
  }

  batches = batches.filter((i) => !batchesToRemove.includes(i));
}
