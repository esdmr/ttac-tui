import { isCancel, select } from "@clack/prompts";
import clipboard from "clipboardy";
import pager from "node-pager";
import { formatDrugPharmacies } from "../formatting/drug-pharmacy.ts";
import type { TtacDrugPharmacy } from "../providers/drug-pharmacy.ts";

export async function promptForDisplay(
  drugPharmacies: readonly TtacDrugPharmacy[],
) {
  const text = formatDrugPharmacies(drugPharmacies);

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
