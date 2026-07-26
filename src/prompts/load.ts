import { isCancel, multiselect } from "@clack/prompts";
import { formatResultsFilename } from "../formatting/filename.ts";
import type { TtacResult } from "../providers/drug-pharmacy.ts";
import { getOldResult } from "../stores/old-results.ts";

export async function promptToLoad(files: readonly string[]) {
  const selectedFiles = await multiselect({
    message: "فایل‌ها را انتخاب کنید",
    options: files
      .map((i) => ({
        value: i,
        label: formatResultsFilename(i),
      }))
      .sort(
        (a, b) =>
          +a.label.split(".", 1)[0] - +b.label.split(".", 1)[0] ||
          a.label.localeCompare(b.label, "fa"),
      ),
  });

  if (isCancel(selectedFiles)) {
    return [];
  }

  const results = [];

  for (const i of selectedFiles) {
    results.push(...(await getOldResult(i)));
  }

  return results as TtacResult[];
}
