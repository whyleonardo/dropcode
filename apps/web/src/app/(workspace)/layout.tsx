import { Breadcrumbs } from "@/components/breadcrumbs"
import { Sidebar } from "@/components/layout/sidebar"
import { DotPattern } from "@/components/ui/bg-dot-pattern"
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
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />

        <div className="bg-gray-1 h-full w-full overflow-hidden px-8 py-4">
          <header className="flex h-14 items-center justify-between">
            <Breadcrumbs />
          </header>

          <div className="relative z-10 h-[calc(100%-3.5rem)]">
            {children}

            {modal}
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
        </div>
      </div>
    </QueryProvider>
  )
}

export default WorkspaceLayout
