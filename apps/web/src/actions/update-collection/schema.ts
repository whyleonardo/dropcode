import { z } from "zod"

export const updateCollectionSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(22, { message: "Title must be at most 22 characters" }),
  id: z.string().uuid(),
})
