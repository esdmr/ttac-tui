#!/usr/bin/env node
import { intro, log, outro } from "@clack/prompts";
import process from "node:process";
import { mainPrompt } from "./prompts/main.ts";

if (import.meta.main) {
  try {
    intro("رابط برای TTAC");
    await mainPrompt();
    outro();
  } catch (error) {
    log.error(
      error instanceof Error ? (error.stack ?? error.message) : String(error),
    );
    outro();
    process.exit(1);
  }
}
