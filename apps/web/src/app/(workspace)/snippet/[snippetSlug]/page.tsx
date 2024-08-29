import { redirect } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { fetchFilesBySnippetSlug } from "@/actions/fetch-files-by-snippet-slug"

import { PlusIcon } from "lucide-react"

import { CreateNewFileModal } from "./_components/create-new-file-modal"

interface SnippetSlugPageProps {
  params: {
    snippetSlug: string
  }
}

const SnippetSlugPage = async ({
  params: { snippetSlug },
}: SnippetSlugPageProps) => {
  const [files] = await fetchFilesBySnippetSlug({ snippetSlug })

  // TODO: CLIENT COMPONENT HERE TO HANDLE THIS
  if (files && files.length > 0) {
    redirect(`/snippet/${snippetSlug}/${files[0].id}`)
  }

  return (
    <Dialog>
      <div className="flex h-2/4 w-full items-end justify-center">
        <div className="space-y-2 text-center">
          <span className="text-muted-foreground block text-base">
            You don't have any files yet
          </span>
          <DialogTrigger
            className={buttonVariants({
              variant: "neutral",
              className: "min-h-8 w-fit self-end",
              size: "sm",
            })}
          >
            Create now
            <PlusIcon className="ml-2 size-4" />
          </DialogTrigger>

          <CreateNewFileModal snippetSlug={snippetSlug} />
        </div>
      </div>
    </Dialog>
  )
}

export default SnippetSlugPage
