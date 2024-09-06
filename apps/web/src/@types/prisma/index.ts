import type { $Enums } from "@dropcode/db/types"

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
  createdAt: Date
  updatedAt: Date
}

export type SnippetWithFiles = {
  files: {
    id: string
    name: string
    language: $Enums.Language
    content: string
    snippetId: string
    userId: string
    updatedAt: Date
    createdAt: Date
  }[]
  id: string
  publicId: string
  title: string
  description: string | null
  slug: string
  createdAt: Date
  updatedAt: Date
  isFavorite: boolean
  isPublic: boolean
  userId: string
}
