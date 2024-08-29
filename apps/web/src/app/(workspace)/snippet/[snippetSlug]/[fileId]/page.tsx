import { Code } from "@/components/code"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { getFileById } from "@/actions/get-file-by-id"

import { ClipboardCopyButton } from "./_components/clipboard-copy-button"

interface FileIdPageProps {
  params: {
    snippetSlug: string
    fileId: string
  }
}

const FileIdPage = async ({
  params: { fileId, snippetSlug },
}: FileIdPageProps) => {
  const [file] = await getFileById({ snippetSlug, fileId })

  return (
    <div className="group relative size-full">
      <ScrollArea className="size-full">
        <div className="w-full flex-1 overflow-x-scroll px-4 pb-12 pt-4">
          <Code
            code={file?.content as string}
            lang={file?.language as string}
          />
        </div>

        <ScrollBar className="h-2.5" orientation="horizontal" />
      </ScrollArea>

      <ClipboardCopyButton code={file?.content as string} />
    </div>
  )
}

export default FileIdPage
