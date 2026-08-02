import { ltr, rtl } from "../bidi.ts";
import type { TtacDrug } from '../types/drug.ts';

export function formatDrugLabel(i: TtacDrug) {
  return rtl`${i.faBrandName} (${ltr`${i.irc}`})`;
}

export function formatDrugSectionHeading(i: TtacDrug) {
  return `====\n${i.faBrandName}\n====`;
}

export function formatAllDrugsSectionHeading() {
  return "====\nهمه\n====";
}
