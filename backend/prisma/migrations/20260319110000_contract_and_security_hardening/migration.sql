ALTER TABLE "Service" ADD COLUMN "summary" TEXT;
UPDATE "Service" SET "summary" = "description";
ALTER TABLE "Service" ALTER COLUMN "summary" SET NOT NULL;
ALTER TABLE "Service" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'sanitario';
ALTER TABLE "Service" ADD COLUMN "prenotabile" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Location" ADD COLUMN "area" TEXT NOT NULL DEFAULT 'territorio';
ALTER TABLE "Location" ADD COLUMN "notes" TEXT;

DELETE FROM "Session";
ALTER TABLE "Session" DROP COLUMN "token";
ALTER TABLE "Session" ADD COLUMN "tokenHash" TEXT NOT NULL;
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

CREATE TABLE "TrainingAccessGrant" (
    "id" UUID NOT NULL,
    "codeHash" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingAccessGrant_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TrainingAccessGrant_codeHash_key" ON "TrainingAccessGrant"("codeHash");
CREATE INDEX "TrainingAccessGrant_expiresAt_idx" ON "TrainingAccessGrant"("expiresAt");
CREATE INDEX "TrainingAccessGrant_revokedAt_idx" ON "TrainingAccessGrant"("revokedAt");
