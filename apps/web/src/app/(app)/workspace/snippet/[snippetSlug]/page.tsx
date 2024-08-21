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
  const userSession = await auth()

  const userId = userSession?.user?.id

  const snippet = await db.snippet.findUnique({
    where: {
      userId,
      slug: snippetSlug,
    },
    include: {
      files: {
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  })

  const code2 = `const highlighter = await createHighlighter({
    langs: ["html", "css", "ts"],
    themes: ["github-dark", "github-light"],
  })`

  return (
    <Tabs defaultValue="account" className="h-full overflow-hidden">
      <TabsList className="flex w-full justify-start gap-2 border p-2">
        {snippet?.files.map((file) => {
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

      {snippet?.files.map(async (file) => {
        const highlighter = await createHighlighter(highlighterConfig)

        const code = highlighter.codeToHtml(file.content, {
          lang: langs[file.language].id,
          theme: "min-dark",
        })

        return (
          <TabsContent
            className="h-auto"
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
