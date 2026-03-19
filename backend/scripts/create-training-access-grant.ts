import { loadLocalEnv } from "./_lib/load-local-env";

loadLocalEnv();

function parseExpiry(input?: string): Date {
  if (!input) {
    const defaultExpiry = new Date();
    defaultExpiry.setDate(defaultExpiry.getDate() + 180);
    return defaultExpiry;
  }

  const parsed = new Date(input);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid expiration date: ${input}`);
  }

  return parsed;
}

async function main() {
  const { createTrainingAccessGrant } = await import("../src/lib/auth/training-access");
  const [labelArg, expiresArg] = process.argv.slice(2);

  if (!labelArg) {
    throw new Error("Usage: pnpm training:grant -- <label> [expiresAtISO]");
  }

  const expiresAt = parseExpiry(expiresArg);
  const { grant, code } = await createTrainingAccessGrant({
    label: labelArg.trim(),
    expiresAt,
  });

  console.log(`Grant created: ${grant.label}`);
  console.log(`Grant ID: ${grant.id}`);
  console.log(`Valid until: ${grant.expiresAt.toISOString()}`);
  console.log(`Access code: ${code}`);
}

main().catch((error) => {
  console.error("Unable to create training access grant", error);
  process.exit(1);
});
