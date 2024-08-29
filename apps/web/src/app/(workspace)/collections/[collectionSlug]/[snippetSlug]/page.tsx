import { notFound } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { fetchFilesBySnippetSlug } from "@/actions/fetch-files-by-snippet-slug"
import { getSnippetBySlug } from "@/actions/get-snippet-by-slug"

import { cn } from "@dropcode/tailwind/utils"

import { PlusIcon } from "lucide-react"

import { CreateNewFileModal } from "./_components/create-new-file-modal"

interface SnippetSlugLayoutProps {
  params: {
    snippetSlug: string
  }
  children: React.ReactNode
}

const SnippetSlugPage = async ({
  params: { snippetSlug },
}: SnippetSlugLayoutProps) => {
  const [[snippet], [files]] = await Promise.all([
    await getSnippetBySlug({ snippetSlug }),
    await fetchFilesBySnippetSlug({ snippetSlug }),
  ])

  if (!snippet) {
    notFound()
  }

  const noFiles = files?.length === 0

  return (
    <div className="flex h-full flex-col items-center justify-center gap-1">
      <span
        className={cn("text-muted-foreground text-lg", noFiles && "hidden")}
      >
        Select a file to view
      </span>

      {noFiles && (
        <Dialog>
          <div className="flex size-full items-center justify-center">
            <div className="space-y-2 text-center">
              <span className="text-muted-foreground block text-base">
                You don't have any files yet
              </span>
              <DialogTrigger
                className={cn(
                  buttonVariants({
                    variant: "neutral",
                    className: "min-h-10 w-fit self-end",
                    size: "sm",
                  }),
                  !noFiles && "hidden"
                )}
              >
                Create now
                <PlusIcon className="ml-2 size-4" />
              </DialogTrigger>
            </div>
          </div>

          <CreateNewFileModal snippetSlug={snippetSlug} />
        </Dialog>
      )}
    </div>
  )
}

export default SnippetSlugPage
