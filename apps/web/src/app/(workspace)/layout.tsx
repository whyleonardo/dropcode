import { Breadcrumbs } from "@/components/breadcrumbs"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileMenuLinksSheet } from "@/components/sheets/mobile-menu-links-sheet"
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
      <div className="flex size-full h-screen gap-4">
        <Sidebar />

        <div className="scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-border scrollbar-track-transparent relative z-10 flex size-full flex-col gap-4 overflow-y-scroll px-4 py-6 pt-7">
          <header className="relative z-50 flex h-fit items-center justify-between">
            <Breadcrumbs />
          </header>

          <MobileMenuLinksSheet />

          <main className="relative z-50 flex-1">
            {children}

            {modal}
          </main>

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
