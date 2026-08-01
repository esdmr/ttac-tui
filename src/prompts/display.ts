import { isCancel, select } from "@clack/prompts";
import clipboard from "clipboardy";
import pager from "node-pager";
import {
  formatAllDrugsSectionHeading,
  formatDrugSectionHeading,
} from "../formatting/drug.ts";
import { formatPharmacy } from "../formatting/pharmacy.ts";
import type {
  TtacDrug,
  TtacDrugPharmacy,
  TtacPharmacy,
} from "../providers/drug-pharmacy.ts";

export async function promptForDisplay(
  drugPharmacies: readonly TtacDrugPharmacy[],
) {
  const parts: string[] = [];
  const drugs = new Map<string, TtacDrug>();
  const pharmacies = new Map<
    number,
    { pharmacy: TtacPharmacy; durations: Map<string, number> }
  >();

  for (const i of drugPharmacies) {
    drugs.set(i.irc, i);
    const durations =
      pharmacies.get(i.pharmacy.id)?.durations ?? new Map<string, number>();
    durations.set(
      i.irc,
      Math.min(durations.get(i.irc) ?? Infinity, i.secondsFromLastSellDate),
    );
    pharmacies.set(i.pharmacy.id, { pharmacy: i.pharmacy, durations });
  }

  const completePharmacies = new Set<number>();

  for (const [k, { durations }] of pharmacies) {
    if (durations.size === drugs.size) completePharmacies.add(k);
  }

  for (const i of drugs.values()) {
    parts.push(formatDrugSectionHeading(i));

    const sorted = drugPharmacies
      .filter((j) => j.irc !== i.irc)
      .toSorted(
        (a, b) =>
          a.secondsFromLastSellDate - b.secondsFromLastSellDate ||
          a.pharmacy.id - b.pharmacy.id,
      );

    for (const j of sorted) {
      parts.push(formatPharmacy(j.pharmacy, j.secondsFromLastSellDate));
    }
  }

  if (completePharmacies.size > 0) {
    parts.push(formatAllDrugsSectionHeading());

    for (const i of completePharmacies) {
      const { pharmacy, durations } = pharmacies.get(i)!;
      parts.push(formatPharmacy(pharmacy, ...durations.values()));
    }
  }

  const text = parts.join("\n");

  while (true) {
    const action = await select({
      message: `نتایج - ${drugPharmacies.length}`,
      options: [
        { value: "pager", label: "نمایش با پیجر" },
        { value: "copy", label: "کپی به بریده‌دان" },
      ],
    });

    if (isCancel(action)) return;

    switch (action) {
      case "pager": {
        await pager(text);
        break;
      }

      case "copy": {
        await clipboard.write(text);
        break;
      }
    }
  }
}
