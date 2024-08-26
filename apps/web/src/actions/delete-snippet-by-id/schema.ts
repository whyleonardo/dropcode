import { z } from "zod"

export const deleteSnippetByIdSchema = z.object({
  collectionSlug: z.string(),
  snippetId: z.string().uuid(),
})
