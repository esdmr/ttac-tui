import { readFile, writeFile } from "node:fs/promises";

export async function readJson(name: string | URL, fallback?: unknown) {
  try {
    const text = await readFile(name, "utf8");
    return JSON.parse(text);
  } catch (error) {
    if (fallback !== undefined) return fallback;
    throw error;
  }
}

export async function writeJson(name: string | URL, value: unknown) {
  await writeFile(name, JSON.stringify(value, null, "\t"));
}
