import { cache } from "react"

import { langs } from "@/config/langs"
import { highlighterConfig } from "@/config/shiki"

import { getSingletonHighlighterCore } from "@shikijs/core"

interface CodeProps {
  code: string
  lang: string
}
const getHighlighter = cache(
  async () => await getSingletonHighlighterCore(highlighterConfig)
)

export const Code = async ({ code, lang }: CodeProps) => {
  if (!code) return null

  const highlighter = await getHighlighter()

  const html = highlighter.codeToHtml(code, {
    lang: langs[lang].id,
    themes: {
      light: "min-light",
      dark: "min-dark",
    },
  })
  return (
    <div
      className="pointer-events-none relative mb-2 size-full"
      aria-hidden="true"
      tabIndex={-1}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
