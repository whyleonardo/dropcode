import { z } from "zod"

export const fetchFilesBySnippetSlugSchema = z.object({
  snippetSlug: z.string(),
})
