import { ContentStatus } from "@prisma/client";
import { z } from "zod";
import { paginationQuerySchema, slugSchema } from "./common";

export const postListQuerySchema = paginationQuerySchema.extend({
  status: z.nativeEnum(ContentStatus).optional(),
});

export const createPostSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(200),
  excerpt: z.string().trim().min(2).max(300),
  content: z.string().trim().min(2),
  coverImage: z.string().trim().url().optional().nullable(),
  category: z.string().trim().max(80).optional().nullable(),
  publishedAt: z.coerce.date().optional().nullable(),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
});

export const updatePostSchema = createPostSchema.partial();
