import type { TtacDrug } from "../providers/drug-pharmacy.ts";

export function formatDrugLabel(i: TtacDrug) {
  return `${i.faBrandName} (${i.irc})`;
}

export function formatDrugSectionHeading(i: TtacDrug) {
  return `====\n${i.faBrandName}\n====`;
}

export function formatAllDrugsSectionHeading() {
  return "====\nهمه\n====";
}
