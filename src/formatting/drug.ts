import type { TtacDrug } from "../providers/drug-pharmacy.ts";

export function formatDrug(i: TtacDrug) {
  return "====\n" + i.faBrandName + "\n====";
}

export function formatAllDrugsSection() {
  return "====\nهمه\n====";
}
