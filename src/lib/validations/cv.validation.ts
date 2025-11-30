// src/lib/validations/cv.validation.ts
import { z } from "zod";

export const createCvSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  cvType: z.enum(["ats", "custom", "skill-based"]),
  templateId: z.string().optional(),
  content: z.any().optional(),
});

export const updateCvSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .optional(),
  content: z.any().optional(),
  isFavorite: z.boolean().optional(),
});

export const cvIdSchema = z.object({
  id: z.string().uuid("Invalid CV ID"),
});

// Type exports
export type CreateCvInput = z.infer<typeof createCvSchema>;
export type UpdateCvInput = z.infer<typeof updateCvSchema>;
export type CvIdInput = z.infer<typeof cvIdSchema>;
