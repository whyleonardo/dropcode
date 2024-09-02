import { z } from "zod"

export const deleteFileBySlugSchema = z.object({
  fileSlug: z.string(),
  snippetSlug: z.string(),
})
