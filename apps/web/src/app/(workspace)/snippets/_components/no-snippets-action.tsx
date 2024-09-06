"use client"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchSnippets } from "@/data/fetch-snippets"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { CreateNewSnippetDrawer } from "./create-new-snippet-drawer"
import { CreateNewSnippetModal } from "./create-new-snippet-modal"

export const NoSnippetsAction = () => {
  const { data: snippets } = useServerActionQuery(fetchSnippets, {
    input: {},
    queryKey: QueryKeyFactory.fetchSnippets(),
  })

  const noSnippets = snippets?.length === 0

  if (!noSnippets) return null

  return (
    <div className="fixed inset-x-2/4 top-2/4 size-fit -translate-x-1/2 space-y-2 text-center">
      <span className="text-muted-foreground block min-w-max text-base">
        You don't have any snippets yet
      </span>

      <CreateNewSnippetModal triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex" />

      <CreateNewSnippetDrawer
        triggerClassName="md:hidden"
        triggerLabel="Create now"
      />
    </div>
  )
}
