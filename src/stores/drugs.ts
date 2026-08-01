import * as v from "valibot";
import { readJson, writeJson } from "../json.ts";
import { TtacDrug } from "../providers/drug-pharmacy.ts";

let drugs = await readJson(
  new URL("drugs.json", import.meta.url),
  v.array(TtacDrug),
  [],
);

export function getDrugs(): readonly TtacDrug[] {
  return drugs;
}

export async function appendDrugs(newDrugs: readonly TtacDrug[]) {
  drugs.push(...newDrugs);
  await writeJson(new URL("drugs.json", import.meta.url), drugs);
}

export async function removeDrugs(drugsToRemove: readonly TtacDrug[]) {
  const ircsToRemove = new Set(drugsToRemove.map((i) => i.irc));
  drugs = drugs.filter((i) => !ircsToRemove.has(i.irc));
  await writeJson(new URL("drugs.json", import.meta.url), drugs);
}
