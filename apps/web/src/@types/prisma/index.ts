import type { $Enums } from "@soli/db/types"

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

export type SnippetWithFilesAndTags = {
  files: {
    id: string
    name: string
    language: $Enums.Language
    content: string
    snippetId: string
    userId: string
    updatedAt: Date
  }[]
  tags: {
    id: string
    slug: string
    userId: string
    createdAt: Date
    updatedAt: Date
  }[]
  id: string
  title: string
  description: string | null
  slug: string
  createdAt: Date
  updatedAt: Date
  isFavorite: boolean
  isPublic: boolean
  collectionId: string | null
  userId: string
}
