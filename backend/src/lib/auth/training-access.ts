import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { ApiError } from "@/lib/http/response";

const TOKEN_CONTEXT = "training-access";

export const TRAINING_ACCESS_COOKIE_NAME = "cv_training_access";

type TrainingGrantRecord = {
  id: string;
  label: string;
  expiresAt: Date;
};

export type TrainingAccessState = {
  granted: boolean;
  validUntil: Date | null;
  grantId: string | null;
  grantLabel: string | null;
};

function getSecret(): string {
  const secret = process.env.TRAINING_ACCESS_SECRET?.trim();

  if (!secret) {
    throw new ApiError(500, "TRAINING_ACCESS_CONFIG_MISSING", "Missing TRAINING_ACCESS_SECRET configuration");
  }

  return secret;
}

function normalizeTrainingCode(code: string): string {
  return code.trim().toUpperCase();
}

function hashTrainingCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

function buildSignature(grantId: string): string {
  return createHmac("sha256", getSecret()).update(`${TOKEN_CONTEXT}:${grantId}`).digest("hex");
}

function buildCookieValue(grantId: string): string {
  return `${grantId}.${buildSignature(grantId)}`;
}

function isValidSignature(signature: string, expectedSignature: string): boolean {
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const providedBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, providedBuffer);
}

function parseCookieValue(value: string): string | null {
  const [grantId, signature] = value.split(".");

  if (!grantId || !signature) {
    return null;
  }

  if (!isValidSignature(signature, buildSignature(grantId))) {
    return null;
  }

  return grantId;
}

function toTrainingAccessState(grant: TrainingGrantRecord | null): TrainingAccessState {
  return {
    granted: grant !== null,
    validUntil: grant?.expiresAt ?? null,
    grantId: grant?.id ?? null,
    grantLabel: grant?.label ?? null,
  };
}

async function setTrainingAccessCookie(grant: TrainingGrantRecord): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: TRAINING_ACCESS_COOKIE_NAME,
    value: buildCookieValue(grant.id),
    expires: grant.expiresAt,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function generateTrainingAccessCode(): string {
  return randomBytes(8).toString("hex").toUpperCase();
}

export function hashTrainingAccessCode(code: string): string {
  return hashTrainingCode(normalizeTrainingCode(code));
}

export async function createTrainingAccessGrant(input: {
  label: string;
  expiresAt: Date;
}): Promise<{ grant: TrainingGrantRecord; code: string }> {
  const code = generateTrainingAccessCode();

  const grant = await prisma.trainingAccessGrant.create({
    data: {
      label: input.label,
      expiresAt: input.expiresAt,
      codeHash: hashTrainingAccessCode(code),
    },
    select: {
      id: true,
      label: true,
      expiresAt: true,
    },
  });

  return { grant, code };
}

export async function grantTrainingAccessByCode(code: string): Promise<TrainingAccessState> {
  const now = new Date();
  const grant = await prisma.trainingAccessGrant.findFirst({
    where: {
      codeHash: hashTrainingAccessCode(code),
      revokedAt: null,
      expiresAt: {
        gt: now,
      },
    },
    select: {
      id: true,
      label: true,
      expiresAt: true,
    },
  });

  if (!grant) {
    throw new ApiError(401, "INVALID_TRAINING_CODE", "Codice di accesso non valido");
  }

  await prisma.trainingAccessGrant.update({
    where: { id: grant.id },
    data: {
      lastUsedAt: now,
    },
  });

  await setTrainingAccessCookie(grant);
  return toTrainingAccessState(grant);
}

export async function revokeTrainingAccess(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: TRAINING_ACCESS_COOKIE_NAME,
    value: "",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function getTrainingGrantFromCookie(): Promise<TrainingGrantRecord | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(TRAINING_ACCESS_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return null;
  }

  const grantId = parseCookieValue(cookieValue);

  if (!grantId) {
    await revokeTrainingAccess();
    return null;
  }

  const grant = await prisma.trainingAccessGrant.findFirst({
    where: {
      id: grantId,
      revokedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      label: true,
      expiresAt: true,
    },
  });

  if (!grant) {
    await revokeTrainingAccess();
    return null;
  }

  return grant;
}

export async function touchTrainingAccessGrant(grantId: string): Promise<void> {
  await prisma.trainingAccessGrant.updateMany({
    where: {
      id: grantId,
      revokedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    data: {
      lastUsedAt: new Date(),
    },
  });
}

export async function getTrainingAccessState(): Promise<TrainingAccessState> {
  const grant = await getTrainingGrantFromCookie();
  return toTrainingAccessState(grant);
}
