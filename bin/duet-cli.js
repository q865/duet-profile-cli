#!/usr/bin/env node
import { runCLI } from "../src/cli.js";

runCLI().catch((err) => {
  console.error("Ошибка:", err);
  process.exit(1);
});
