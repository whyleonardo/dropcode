const CollectionsLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="h-full">{children}</div>
    </div>
  )
}

export default CollectionsLayout
