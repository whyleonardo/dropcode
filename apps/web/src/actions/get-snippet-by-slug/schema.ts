import { z } from "zod"

export const getSnippetBySlugSchema = z.object({
  snippetSlug: z.string(),
})
