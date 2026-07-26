import { readJson, writeJson } from "../json.ts";
import type { TtacDrug } from "../providers/drug-pharmacy.ts";

const drugs: TtacDrug[] = await readJson(
  new URL("./drugs.json", import.meta.url),
  [],
);

export function getDrugs(): readonly TtacDrug[] {
  return drugs;
}

export async function appendDrugs(newDrugs: readonly TtacDrug[]) {
  drugs.push(...newDrugs);
  await writeJson(new URL("./drugs.json", import.meta.url), drugs);
}
