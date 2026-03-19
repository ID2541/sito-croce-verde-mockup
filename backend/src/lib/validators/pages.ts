import { z } from "zod";
import { paginationQuerySchema, slugSchema } from "./common";

export const pageListQuerySchema = paginationQuerySchema;

export const createPageSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(200),
  content: z.string().trim().min(2),
});

export const updatePageSchema = createPageSchema.partial();
