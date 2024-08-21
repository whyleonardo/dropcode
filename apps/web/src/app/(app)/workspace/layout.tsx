import { Sidebar } from "@/components/layout/sidebar"

import { QueryProvider } from "@/providers/query-provider"

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <div>
          <Sidebar />
        </div>

        <div className="bg-gray-1 h-full max-w-full flex-1 overflow-hidden px-8 py-4">
          {children}
        </div>
      </div>
    </QueryProvider>
  )
}

export default WorkspaceLayout
