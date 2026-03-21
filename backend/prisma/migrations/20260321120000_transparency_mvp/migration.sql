CREATE TYPE "TransparencyStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

CREATE TABLE "TransparencyCategory" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "parentId" UUID,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransparencyCategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TransparencyItem" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT,
    "categoryId" UUID NOT NULL,
    "referenceYear" INTEGER,
    "referenceDate" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "status" "TransparencyStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "documentFormat" TEXT NOT NULL DEFAULT 'PDF',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransparencyItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TransparencyDocument" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "publicUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSizeBytes" INTEGER,
    "checksumSha256" TEXT,
    "language" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransparencyDocument_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TransparencyCategory_slug_key" ON "TransparencyCategory"("slug");
CREATE INDEX "TransparencyCategory_parentId_idx" ON "TransparencyCategory"("parentId");
CREATE INDEX "TransparencyCategory_isActive_sortOrder_idx" ON "TransparencyCategory"("isActive", "sortOrder");

CREATE UNIQUE INDEX "TransparencyItem_slug_key" ON "TransparencyItem"("slug");
CREATE INDEX "TransparencyItem_categoryId_status_idx" ON "TransparencyItem"("categoryId", "status");
CREATE INDEX "TransparencyItem_status_publishedAt_idx" ON "TransparencyItem"("status", "publishedAt");
CREATE INDEX "TransparencyItem_referenceYear_idx" ON "TransparencyItem"("referenceYear");
CREATE INDEX "TransparencyItem_featured_sortOrder_idx" ON "TransparencyItem"("featured", "sortOrder");

CREATE UNIQUE INDEX "TransparencyDocument_publicUrl_key" ON "TransparencyDocument"("publicUrl");
CREATE INDEX "TransparencyDocument_itemId_isPrimary_sortOrder_idx" ON "TransparencyDocument"("itemId", "isPrimary", "sortOrder");

ALTER TABLE "TransparencyCategory"
ADD CONSTRAINT "TransparencyCategory_parentId_fkey"
FOREIGN KEY ("parentId") REFERENCES "TransparencyCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "TransparencyItem"
ADD CONSTRAINT "TransparencyItem_categoryId_fkey"
FOREIGN KEY ("categoryId") REFERENCES "TransparencyCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TransparencyDocument"
ADD CONSTRAINT "TransparencyDocument_itemId_fkey"
FOREIGN KEY ("itemId") REFERENCES "TransparencyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
