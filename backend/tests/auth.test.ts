import assert from "node:assert/strict";
import test from "node:test";
import { hashPassword, verifyPassword } from "../src/lib/auth/password";
import { enforceRateLimit } from "../src/lib/security/rate-limit";

test("hashPassword enforces minimum length and verifyPassword validates hashes", async () => {
  const password = "una-password-molto-sicura";
  const hash = await hashPassword(password);

  assert.ok(hash.startsWith("v1:"));
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword("password-sbagliata", hash), false);
});

test("enforceRateLimit blocks requests over the configured threshold", () => {
  enforceRateLimit({
    namespace: "test-rate-limit",
    key: "127.0.0.1",
    windowMs: 60_000,
    maxRequests: 2,
  });

  enforceRateLimit({
    namespace: "test-rate-limit",
    key: "127.0.0.1",
    windowMs: 60_000,
    maxRequests: 2,
  });

  assert.throws(
    () =>
      enforceRateLimit({
        namespace: "test-rate-limit",
        key: "127.0.0.1",
        windowMs: 60_000,
        maxRequests: 2,
      }),
    /Too many requests/,
  );
});
