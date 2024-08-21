import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { langs } from "@/config/langs"
import { highlighterConfig } from "@/config/shiki"

import { db } from "@soli/db"

import { CodeXml } from "lucide-react"
import { createHighlighter } from "shiki/bundle/web"

interface SnippetSlugPageProps {
  params: {
    snippetSlug: string
  }
}

const SnippetSlugPage = async ({
  params: { snippetSlug },
}: SnippetSlugPageProps) => {
  const files = await db.file.findMany({
    where: {
      snippet: {
        slug: snippetSlug,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      snippet: {
        select: {
          title: true,
        },
      },
    },
  })

  const highlighter = await createHighlighter(highlighterConfig)

  const snippetTitle = files[0].snippet.title

  const firstFile = files[0].name + files[0].id

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex h-14 items-center justify-between">
        <button type="button" className="flex items-center gap-2">
          <CodeXml className="text-gray-10 size-5" />
          <span className="font-mono text-lg font-medium">{snippetTitle}</span>
        </button>
      </header>

      <Tabs
        defaultValue={firstFile}
        className="bg-gray-1 h-full max-w-full rounded-lg border"
      >
        <ScrollArea className="w-full">
          <TabsList className="bg-gray-2 flex h-fit w-full justify-start gap-2 rounded-none border-b p-2 px-4">
            {files.map((file) => {
              const Icon = langs[file.language].icon

              return (
                <TabsTrigger
                  key={file.id}
                  value={file.name + file.id}
                  className="space-x-2 font-mono"
                >
                  <Icon className="size-3.5" />
                  <span>
                    {file.name}.{langs[file.language].extension}
                  </span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <ScrollBar orientation="horizontal" className="h-1.5" />
        </ScrollArea>

        {files.map(async (file) => {
          const code = highlighter.codeToHtml(file.content, {
            lang: langs[file.language].id,
            theme: "min-dark",
          })

          return (
            <TabsContent
              className="h-auto px-4"
              key={file.id}
              value={file.name + file.id}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: code,
                }}
              />
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export default SnippetSlugPage
