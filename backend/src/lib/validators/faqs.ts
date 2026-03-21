import { ContentStatus } from "@prisma/client";
import { z } from "zod";
import { paginationQuerySchema, slugSchema } from "./common";

export const faqCategorySchema = z.string().trim().min(2).max(80);

export const faqListQuerySchema = paginationQuerySchema.extend({
  status: z.nativeEnum(ContentStatus).optional(),
  category: faqCategorySchema.optional(),
  featured: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((value) => {
      if (typeof value === "boolean" || value === undefined) {
        return value;
      }

      const normalized = value.trim().toLowerCase();
      if (normalized === "true") {
        return true;
      }
      if (normalized === "false") {
        return false;
      }

      return undefined;
    }),
});

export const createFaqSchema = z.object({
  slug: slugSchema,
  question: z.string().trim().min(5).max(200),
  answer: z.string().trim().min(10),
  category: faqCategorySchema,
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
  isFeatured: z.coerce.boolean().default(false),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
});

export const updateFaqSchema = createFaqSchema.partial();
