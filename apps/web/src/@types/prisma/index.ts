import type { $Enums, File, Snippet, Tag } from "@soli/db/types"

export type SnippetWithFilesAndTags = Snippet & {
  files: File[]
  tags: Tag[]
  collection: { slug: string } | null
}

export type FileWithSnippetInfo = {
  snippet: {
    title: string
    isPublic: boolean
  }
} & {
  id: string
  name: string
  language: $Enums.Language
  content: string
  snippetId: string
  userId: string
  updatedAt: Date
}
