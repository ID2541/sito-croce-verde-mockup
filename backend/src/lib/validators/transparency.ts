import { z } from "zod";
import { paginationQuerySchema, slugSchema } from "./common";

export const transparencyCategoryListQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
});

export const transparencyItemListQuerySchema = paginationQuerySchema.extend({
  q: z.string().trim().max(120).optional(),
  categorySlug: slugSchema.optional(),
  year: z.coerce.number().int().min(2000).max(2100).optional(),
});

export const transparencyItemSlugParamsSchema = z.object({
  slug: slugSchema,
});
