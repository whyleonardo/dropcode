import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { langs } from "@/config/langs"
import { highlighterConfig } from "@/config/shiki"

import { auth } from "@soli/auth"
import { db } from "@soli/db"

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
  })

  const highlighter = await createHighlighter(highlighterConfig)

  const firstFile = files[0].name + files[0].id

  return (
    <Tabs
      defaultValue={firstFile}
      className="h-full max-w-full rounded-lg border"
    >
      <TabsList className="flex w-full justify-start gap-2 rounded-none border-b p-2 px-4">
        {files.map((file) => {
          const Icon = langs[file.language].icon

          return (
            <TabsTrigger
              key={file.id}
              value={file.name + file.id}
              className="space-x-2 font-mono"
            >
              <Icon className="size-3" />
              <span>
                {file.name}.{langs[file.language].extension}
              </span>
            </TabsTrigger>
          )
        })}
      </TabsList>

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
  )
}

export default SnippetSlugPage
