import type { File, Snippet, Tag } from "@soli/db/types"

export type SnippetWithFilesAndTags = Snippet & {
  files: File[]
  tags: Tag[]
  collection: { slug: string } | null
}
