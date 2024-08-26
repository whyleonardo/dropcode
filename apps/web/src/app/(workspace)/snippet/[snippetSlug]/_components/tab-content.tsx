import { cache } from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TabsContent } from "@/components/ui/tabs"

import { langs } from "@/config/langs"
import { highlighterConfig } from "@/config/shiki"

import type { File } from "@dropcode/db/types"
import { getSingletonHighlighterCore } from "@shikijs/core"

import { ClipboardCopyButton } from "./clipboard-copy-button"

interface TabContentProps {
  file: File
}

const getHighlighter = cache(
  async () => await getSingletonHighlighterCore(highlighterConfig)
)

export const TabContent = async ({ file }: TabContentProps) => {
  const highlighter = await getHighlighter()

  const html = highlighter.codeToHtml(file.content, {
    lang: langs[file.language].id,
    theme: "min-dark",
  })

  return (
    <>
      <ScrollArea className="w-full">
        <TabsContent
          className="w-full flex-1 overflow-x-scroll px-4"
          key={file.id}
          value={file.id}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />

          {/* THIS WILL TURN INTO A CONTEXT MENU THEN */}
        </TabsContent>

        <ScrollBar className="h-2.5" orientation="horizontal" />
      </ScrollArea>
      <ClipboardCopyButton code={file.content} />
    </>
  )
}
