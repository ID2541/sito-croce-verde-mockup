import { z } from "zod";
import { paginationQuerySchema } from "./common";

export const serviceListQuerySchema = paginationQuerySchema;

export const serviceCategorySchema = z.enum([
  "sanitario",
  "sociale",
  "trasporto",
  "formazione",
  "protezione-civile",
]);

export const createServiceSchema = z.object({
  slug: z.string().trim().min(2).max(120),
  title: z.string().trim().min(2).max(200),
  summary: z.string().trim().min(2).max(300),
  description: z.string().trim().min(2).max(500),
  content: z.string().trim().min(2),
  category: serviceCategorySchema,
  prenotabile: z.boolean().default(false),
  icon: z.string().trim().max(80).optional().nullable(),
});

export const updateServiceSchema = createServiceSchema.partial();
