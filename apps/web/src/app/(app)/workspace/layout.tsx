import { Sidebar } from "@/components/layout/sidebar"

import { QueryProvider } from "@/providers/query-provider"

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <div className="flex h-screen w-full gap-4 overflow-hidden p-4">
        <div>
          <Sidebar />
        </div>

        <div className="h-full flex-1">{children}</div>
      </div>
    </QueryProvider>
  )
}

export default WorkspaceLayout
