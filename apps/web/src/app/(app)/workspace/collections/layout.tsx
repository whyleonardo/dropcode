import { BackPageButton } from "./_components/back-page-button"

const CollectionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex h-14 items-center justify-between">
        <BackPageButton />
      </header>

      <div className="h-full">{children}</div>
    </div>
  )
}

export default CollectionsLayout
