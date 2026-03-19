import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export function loadLocalEnv(cwd = process.cwd()): void {
  for (const filename of [".env.local", ".env"]) {
    const filePath = path.join(cwd, filename);

    if (!existsSync(filePath)) {
      continue;
    }

    const lines = readFileSync(filePath, "utf8").split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex <= 0) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}
