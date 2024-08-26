import { Breadcrumbs } from "@/components/breadcrumbs"
import { Sidebar } from "@/components/layout/sidebar"
import { Toaster } from "@/components/ui/toaster"

import { QueryProvider } from "@/providers/query-provider"

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
        <div>
          <Sidebar />
        </div>

        <div className="bg-gray-1 h-full w-full overflow-hidden px-8 py-4">
          <header className="flex h-14 items-center justify-between">
            <Breadcrumbs />
          </header>

          <div className="h-[calc(100%-3.5rem)]">
            {children}

            {modal}
          </div>
        </div>
      </div>
    </QueryProvider>
  )
}

export default WorkspaceLayout
