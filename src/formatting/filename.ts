export function formatResultsFilename(file: string) {
  return file.replace(/^\/tmp\/ttac\./, "").replace(/\.json$/, "");
}
