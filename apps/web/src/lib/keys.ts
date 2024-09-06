import { customCreateServerActionsKeyFactory } from "./server-actions-key-factory"

export const QueryKeyFactory = customCreateServerActionsKeyFactory({
  fetchSnippets: () => ["snippets"],
  fetchLinesCreatedInPeriod: () => ["lines-created-in-period"],
  fetchMostUsedLanguages: () => ["most-used-languages"],
  getSnippetBySlug: ({ snippetSlug }: { snippetSlug: string }) => [
    "snippet-by-slug",
    snippetSlug,
  ],
  fetchFilesBySnippetSlug: ({ snippetSlug }: { snippetSlug: string }) => [
    "files-by-snippet-slug",
    snippetSlug,
  ],
  getFileByPublicId: ({
    filePublicId,
    snippetSlug,
  }: {
    filePublicId: string
    snippetSlug: string
  }) => ["file-by-public-id", filePublicId, snippetSlug],
})
