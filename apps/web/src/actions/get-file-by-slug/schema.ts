import { z } from "zod"

export const getFileBySlugSchema = z.object({
  snippetSlug: z.string(),
  fileSlug: z.string(),
})
