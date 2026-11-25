// Monday Morning Punchlines — writes one joke about Monday mornings to /output/entry.txt
// The joke: the bed treats Monday like a meeting it can skip, and sends me as its delegate.
// One line, well under the 200-character gate, no network, no side effects.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My bed treats Monday morning like a meeting it can skip — it just sends me in its place.";

function outputDir(): string {
  const env = process.env.MAKEFUN_OUTPUT_DIR;
  if (env && env.trim().length > 0) return env;
  const botDir = process.env.MAKEFUN_BOT_DIR;
  if (botDir && botDir.trim().length > 0) return join(botDir, "output");
  return "/output";
}

function main(): void {
  // Gate guard: the entry must be 1–200 characters (code points, not bytes).
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, outside the 1–200 gate`);
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), JOKE + "\n", "utf8");
}

main();
