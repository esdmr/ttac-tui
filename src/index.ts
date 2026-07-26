#!/usr/bin/env node
import { intro, log, outro } from "@clack/prompts";
import { mainPrompt } from "./prompts/main.ts";

if (import.meta.main) {
  try {
    intro("رابط برای TTAC");
    const status = await mainPrompt();
    outro();
    process.exit(typeof status === "number" ? status : 0);
  } catch (error) {
    log.error(
      error instanceof Error ? error.stack || error.message : String(error),
    );
    outro();
    process.exit(1);
  }
}
