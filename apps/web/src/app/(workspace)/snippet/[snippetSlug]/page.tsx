import { Dialog } from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { db } from "@dropcode/db"

import { LockKeyhole } from "lucide-react"

import { CreateNewFileModal } from "./_components/create-new-file-modal"
import { TabContent } from "./_components/tab-content"
import { TabsRoot } from "./_components/tabs-root"

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
          isPublic: true,
        },
      },
    },
  })

  const isPublic = files.at(0)?.snippet.isPublic

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">{snippetSlug}</h2>
        <TooltipProvider delayDuration={30}>
          <Tooltip>
            <TooltipTrigger className="cursor-default">
              {!isPublic && <LockKeyhole className="size-4" />}
            </TooltipTrigger>

            <TooltipContent side="right">Private</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Dialog>
        <TabsRoot files={files}>
          {files.map((file) => (
            <TabContent key={file.id} file={file} />
          ))}
        </TabsRoot>

        <CreateNewFileModal />
      </Dialog>
    </div>
  )
}

export default SnippetSlugPage
