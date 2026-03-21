CREATE TABLE "Faq" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Faq_slug_key" ON "Faq"("slug");
CREATE INDEX "Faq_status_category_sortOrder_idx" ON "Faq"("status", "category", "sortOrder");
CREATE INDEX "Faq_isFeatured_sortOrder_idx" ON "Faq"("isFeatured", "sortOrder");
