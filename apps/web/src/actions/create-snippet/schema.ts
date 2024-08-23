import { z } from "zod"

export const createSnippetSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(14, { message: "Title must be less than 14 characters" }),
  description: z
    .string()
    .trim()
    .max(72, { message: "Description must be less than 72 characters" })
    .optional(),
  tags: z.array(
    z
      .string()
      .trim()
      .min(2, { message: "Tag must be at least 2 character" })
      .max(14, { message: "Tag must be less than 14 characters" })
  ),
  isPublic: z.boolean().default(false),
  collectionSlug: z.string({ required_error: "Collection slug is required" }),
})
