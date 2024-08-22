import { BackPageButton } from "@/components/back-page-button"
import { Sidebar } from "@/components/layout/sidebar"

import { QueryProvider } from "@/providers/query-provider"

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <div>
          <Sidebar />
        </div>

        <div className="bg-gray-1 h-full w-full overflow-hidden px-8 py-4">
          <header className="flex h-14 items-center justify-between">
            <BackPageButton />
          </header>

          <div className="h-[calc(100%-3.5rem)]">{children}</div>
        </div>
      </div>
    </QueryProvider>
  )
}

export default WorkspaceLayout
