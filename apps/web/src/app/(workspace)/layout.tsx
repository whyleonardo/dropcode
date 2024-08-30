import { Breadcrumbs } from "@/components/breadcrumbs"
import { Sidebar } from "@/components/layout/sidebar"
import { DotPattern } from "@/components/ui/bg-dot-pattern"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/toaster"

import { QueryProvider } from "@/providers/query-provider"

import { cn } from "@dropcode/tailwind/utils"

const WorkspaceLayout = ({
  children,
  modal,
}: {
  readonly children: React.ReactNode
  readonly modal: React.ReactNode
}) => {
  return (
    <QueryProvider>
      <Toaster />
      <div className="flex size-full gap-4">
        <Sidebar />

        <ScrollArea className="size-full">
          <div className="relative z-10 flex size-full flex-col gap-4 px-4 py-6 pt-7">
            <header className="flex h-fit items-center justify-between">
              <Breadcrumbs />
            </header>

            <main className="size-full">
              {children}

              {modal}
            </main>
          </div>

          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
            )}
          />
        </ScrollArea>
      </div>
    </QueryProvider>
  )
}

export default WorkspaceLayout
