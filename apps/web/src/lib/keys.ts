import { customCreateServerActionsKeyFactory } from "./server-actions-key-factory"

export const QueryKeyFactory = customCreateServerActionsKeyFactory({
  fetchCollections: () => ["collections"],
  fetchCollectionBySlug: ({ collectionSlug }: { collectionSlug: string }) => [
    "collection-by-slug",
    collectionSlug,
  ],
  fetchLinesCreatedInPeriod: () => ["lines-created-in-period"],
  fetchMostUsedLanguages: () => ["most-used-languages"],
  fetchFilesBySnippetSlug: ({ snippetSlug }: { snippetSlug: string }) => [
    "files-by-snippet-slug",
    snippetSlug,
  ],
})
