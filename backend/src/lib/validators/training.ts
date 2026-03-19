import { z } from "zod";

export const trainingAccessSchema = z.object({
  code: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .regex(/^[A-Z0-9]{16}$/, "Training access code must be 16 alphanumeric characters"),
});
