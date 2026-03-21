import { z } from "zod";

export const trainingAccessSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9]{16}$/, "Training access code must be 16 alphanumeric characters")
    .transform((value) => value.toUpperCase()),
});
