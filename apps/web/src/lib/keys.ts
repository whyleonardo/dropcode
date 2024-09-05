import { customCreateServerActionsKeyFactory } from "./server-actions-key-factory"

export const QueryKeyFactory = customCreateServerActionsKeyFactory({
  fetchCollections: () => ["collections"],
  fetchCollectionBySlug: ({ collectionSlug }: { collectionSlug: string }) => [
    "collection-by-slug",
    collectionSlug,
  ],
  getSnippetBySlug: ({ snippetSlug }: { snippetSlug: string }) => [
    "snippet-by-slug",
    snippetSlug,
  ],
  getFileBySlug: ({
    snippetSlug,
    fileSlug,
  }: {
    snippetSlug: string
    fileSlug: string
  }) => ["file-by-slug", snippetSlug, fileSlug],
  fetchLinesCreatedInPeriod: () => ["lines-created-in-period"],
  fetchMostUsedLanguages: () => ["most-used-languages"],
  fetchFilesBySnippetSlug: ({ snippetSlug }: { snippetSlug: string }) => [
    "files-by-snippet-slug",
    snippetSlug,
  ],
})
