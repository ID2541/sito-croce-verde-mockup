import { z } from "zod";
import { paginationQuerySchema, slugSchema } from "./common";

export const locationListQuerySchema = paginationQuerySchema;

export const createLocationSchema = z.object({
  slug: slugSchema,
  name: z.string().trim().min(2).max(200),
  area: z.string().trim().min(2).max(120),
  address: z.string().trim().min(2).max(250),
  phone: z.string().trim().max(60).optional().nullable(),
  email: z.string().trim().email().optional().nullable(),
  hours: z.string().trim().max(120).optional().nullable(),
  mapUrl: z.string().trim().url().optional().nullable(),
  notes: z.string().trim().max(400).optional().nullable(),
});

export const updateLocationSchema = createLocationSchema.partial();
