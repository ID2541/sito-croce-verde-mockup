import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const HASH_VERSION = "v1";
const KEY_LENGTH = 64;

function assertPassword(password: string) {
  if (!password || password.length < 12) {
    throw new Error("Password must be at least 12 characters long");
  }
}

export async function hashPassword(password: string): Promise<string> {
  assertPassword(password);

  const salt = randomBytes(16);
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return `${HASH_VERSION}:${salt.toString("hex")}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  const [version, saltHex, hashHex] = passwordHash.split(":");

  if (version !== HASH_VERSION || !saltHex || !hashHex) {
    return false;
  }

  const salt = Buffer.from(saltHex, "hex");
  const storedHash = Buffer.from(hashHex, "hex");
  const derivedKey = (await scrypt(password, salt, storedHash.length)) as Buffer;

  if (storedHash.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedHash, derivedKey);
}
