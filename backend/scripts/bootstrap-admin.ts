import { UserRole } from "@prisma/client";
import { loadLocalEnv } from "./_lib/load-local-env";

loadLocalEnv();

async function main() {
  const [{ prisma }, { hashPassword }] = await Promise.all([
    import("../src/lib/db/prisma"),
    import("../src/lib/auth/password"),
  ]);

  const [emailArg, passwordArg, roleArg] = process.argv.slice(2);

  if (!emailArg || !passwordArg) {
    throw new Error("Usage: pnpm admin:bootstrap -- <email> <password> [admin|editor]");
  }

  const roleInput = roleArg?.trim().toUpperCase();
  const role = roleInput === UserRole.EDITOR ? UserRole.EDITOR : UserRole.ADMIN;
  const email = emailArg.trim().toLowerCase();
  const passwordHash = await hashPassword(passwordArg);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role,
    },
    create: {
      email,
      passwordHash,
      role,
    },
    select: {
      email: true,
      role: true,
    },
  });

  console.log(`Bootstrap account ready: ${user.email} (${user.role})`);
}

main().catch((error) => {
  console.error("Unable to bootstrap admin account", error);
  process.exit(1);
});
