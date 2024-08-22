import { BackPageButton } from "@/components/back-page-button"

const CollectionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="h-full">{children}</div>
    </div>
  )
}

export default CollectionsLayout
