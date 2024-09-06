import { redirect } from "next/navigation"

import { Code } from "@/components/code"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { getFileByPublicId } from "@/data/get-file-by-public-id"

import { ClipboardCopyButton } from "./_components/clipboard-copy-button"

interface FilePublicIdPageProps {
  params: {
    snippetSlug: string
    filePublicId: string
  }
}

const FilePublicIdPage = async ({
  params: { filePublicId, snippetSlug },
}: FilePublicIdPageProps) => {
  const [file] = await getFileByPublicId({ snippetSlug, filePublicId })

  if (!file) {
    redirect(`/snippets/${snippetSlug}`)
  }

  return (
    <div className="size-full">
      <ScrollArea className="size-full px-2 pt-4 md:px-4">
        <Code code={file?.content as string} lang={file?.language} />

        <ScrollBar className="h-2.5" orientation="horizontal" />
      </ScrollArea>
      <ClipboardCopyButton code={file?.content} />
    </div>
  )
}

export default FilePublicIdPage
