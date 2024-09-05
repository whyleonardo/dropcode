import { customCreateServerActionsKeyFactory } from "./server-actions-key-factory"

export const QueryKeyFactory = customCreateServerActionsKeyFactory({
  fetchCollections: () => ["collections"],
  fetchLinesCreatedInPeriod: () => ["lines-created-in-period"],
  fetchMostUsedLanguages: () => ["most-used-languages"],
  fetchFilesBySnippetSlug: ({ snippetSlug }: { snippetSlug: string }) => [
    "files-by-snippet-slug",
    snippetSlug,
  ],
})
