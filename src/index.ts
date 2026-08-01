#!/usr/bin/env node
import { intro, log, outro } from "@clack/prompts";
import process from "node:process";
import { ApplicationError } from "./error.ts";
import { mainPrompt } from "./prompts/main.ts";

export async function main() {
  try {
    intro("رابط برای TTAC");
    await mainPrompt();
    outro();
  } catch (error) {
    log.error(
      error instanceof ApplicationError
        ? await error.prepareString()
        : error instanceof Error
          ? (error.stack ?? error.message)
          : String(error),
    );
    outro();
    process.exit(1);
  }
}

if (import.meta.main) {
  // oxlint-disable-next-line unicorn/prefer-top-level-await
  void main();
}
