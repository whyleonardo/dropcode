import { fetchSnippets } from "@/data/fetch-snippets"

import { SnippetCard } from "./snippet-card"

export const SnippetsList = async () => {
  const [snippets] = await fetchSnippets({})

  return (
    <div className="flex flex-wrap justify-center gap-8 overflow-y-auto">
      {snippets?.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  )
}
