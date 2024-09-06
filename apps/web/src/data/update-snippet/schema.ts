import { z } from "zod"

export const updateSnippetSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(22, { message: "Title must be less than 22 characters" }),
  description: z
    .string()
    .trim()
    .max(72, { message: "Description must be less than 72 characters" })
    .optional(),
  isPublic: z.boolean().default(false),
})
